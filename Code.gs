/**
 * ระบบจัดครูสอนแทน - Google Apps Script Backend
 * โรงเรียนพูลเจริญวิทยาคม | กลุ่มสาระการเรียนรู้ภาษาไทย
 * 
 * ไฟล์นี้ทำหน้าที่เป็นระบบหลังบ้าน (Backend) ทำงานบน Google Sheets
 * รองรับทั้งการรันเป็น Web App ในตัว และการเรียกผ่าน API (CORS-friendly POST/GET)
 */

// 1. รับการร้องขอแบบ GET (สำหรับแสดงหน้าเว็บหลัก หรือเรียกดูข้อมูลประวัติ)
function doGet(e) {
  // หากมีพารามิเตอร์ ?action=getHistory ให้ส่งข้อมูล JSON กลับไป
  if (e && e.parameter && e.parameter.action === 'getHistory') {
    return ContentService.createTextOutput(JSON.stringify(getHistoryData()))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  // ดึงลิงก์ของ Google Sheets
  if (e && e.parameter && e.parameter.action === 'getSpreadsheetUrl') {
    return ContentService.createTextOutput(JSON.stringify({ url: getSpreadsheetUrl() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  // ตรวจสอบการเชื่อมต่อฐานข้อมูลชีท (Debug)
  if (e && e.parameter && e.parameter.action === 'debug') {
    return ContentService.createTextOutput(JSON.stringify(getDebugInfo()))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  // โหลดหน้าเว็บโดยรองรับทั้งชื่อไฟล์ 'Index' (พิมพ์ใหญ่) และ 'index' (พิมพ์เล็ก) ป้องกันการสับสน
  var template;
  try {
    template = HtmlService.createTemplateFromFile('Index');
  } catch (err) {
    try {
      template = HtmlService.createTemplateFromFile('index');
    } catch (err2) {
      // ส่งคำแนะนำกลับไปหากหาไฟล์ไม่พบจริงๆ
      return HtmlService.createHtmlOutput(
        '<h3>❌ ไม่พบไฟล์ HTML ชื่อ "Index" หรือ "index" ในโครงการของคุณ</h3>' +
        '<p><b>วิธีการแก้ไข:</b></p>' +
        '<ol>' +
        '  <li>ในแถบเครื่องมือด้านซ้ายของ Google Apps Script ให้กดที่ปุ่ม <b>+ (บวก)</b> ข้างคำว่า "ไฟล์" (Files)</li>' +
        '  <li>เลือกประเภทไฟล์เป็น <b>HTML</b></li>' +
        '  <li>พิมพ์ชื่อไฟล์ว่า <b>Index</b> (พิมพ์ใหญ่ตัวแรก) หรือ <b>index</b> (ตัวพิมพ์เล็กทั้งหมด)</li>' +
        '  <li>นำโค้ดในไฟล์ <b>Index.html</b> บนคอมพิวเตอร์ของคุณไปคัดลอกและวางทับลงไป</li>' +
        '  <li>กด <b>บันทึก (Save)</b> แล้วกด Deploy ใหม่</li>' +
        '</ol>'
      );
    }
  }
  
  return template.evaluate()
    .setTitle('ระบบจัดครูสอนแทน กลุ่มสาระฯ ภาษาไทย | โรงเรียนพูลเจริญวิทยาคม')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
}

// 2. รับการร้องขอแบบ POST (สำหรับบันทึก แก้ไข หรือลบข้อมูล ผ่าน HTTP fetch)
function doPost(e) {
  var result;
  try {
    var payload = JSON.parse(e.postData.contents);
    if (payload.action === 'save') {
      result = saveSubstitution(payload.data);
    } else if (payload.action === 'updateSubstitute') {
      result = updateSubstituteTeacher(
        payload.id,
        payload.period,
        payload.subTeacherId,
        payload.subTeacherName
      );
    } else if (payload.action === 'delete') {
      result = deleteSubstitution(payload.id);
    } else if (payload.action === 'getSpreadsheetUrl') {
      result = { status: "success", url: getSpreadsheetUrl() };
    } else {
      result = { status: "error", message: "ไม่พบคำสั่ง (Unknown action)" };
    }
  } catch (err) {
    result = { status: "error", message: err.toString() };
  }
  
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// 3. ฟังก์ชันดึงแผ่นงาน Google Sheets และตรวจสอบสิทธิ์/สร้างหัวตารางอัตโนมัติ
function getDbSheet() {
  var ss;
  var targetSpreadsheetId = "1aadTrBDNx2lEjeNY0DeFLMhUqCH-RJ7NH4I_J00gP-s";
  
  // 1. พยายามดึงข้อมูลจากชีทปัจจุบันก่อน (สำหรับกรณีที่คัดลอกไฟล์ชีทมา)
  try {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  } catch (errActive) {
    // กรณีไม่ได้ผูกสคริปต์ไว้กับชีทโดยตรง หรือเรียกใช้งานแบบอื่น
  }
  
  // 2. หากเปิดชีทปัจจุบันไม่ได้ ให้ดึงข้อมูลจาก Spreadsheet ID หลัก (ตรวจสอบสิทธิ์การเขียนด้วย getEditors)
  if (!ss) {
    try {
      var tempSs = SpreadsheetApp.openById(targetSpreadsheetId);
      tempSs.getEditors(); // จะโยนข้อผิดพลาดทันทีหากไม่มีสิทธิ์เขียน/แก้ไขชีท (เช่น สิทธิ์เป็น View Only)
      ss = tempSs;
    } catch (err) {
      // ไม่มีสิทธิ์เข้าถึงหรือแก้ไข ID หลัก
    }
  }
  
  // 3. ตัวเลือกสุดท้าย หากยังไม่มี Spreadsheet เลย ให้สร้างขึ้นใหม่ใน Google Drive
  if (!ss) {
    var properties = PropertiesService.getScriptProperties();
    var ssId = properties.getProperty('SPREADSHEET_ID');
    if (ssId) {
      try {
        ss = SpreadsheetApp.openById(ssId);
      } catch(e) {
        // เปิดไม่ได้ให้สร้างใหม่
      }
    }
    if (!ss) {
      ss = SpreadsheetApp.create('ระบบจัดครูสอนแทน_Database');
      properties.setProperty('SPREADSHEET_ID', ss.getId());
    }
  }
  
  var sheet = ss.getSheetByName('SubstitutionLogs');
  var expectedHeaders = [
    'timestamp',
    'id',
    'date',
    'day',
    'absentTeacherId',
    'absentTeacherName',
    'reason',
    'period',
    'subject',
    'class',
    'room',
    'subTeacherId',
    'subTeacherName',
    'workType',
    'subjectCode'
  ];
  if (!sheet) {
    sheet = ss.insertSheet('SubstitutionLogs');
    // กำหนดหัวข้อคอลัมน์ (Headers)
    sheet.appendRow(expectedHeaders);
    // ปรับรูปแบบหัวตาราง
    sheet.getRange(1, 1, 1, expectedHeaders.length)
      .setFontWeight('bold')
      .setBackground('#d1e7dd')
      .setHorizontalAlignment('center');
  } else {
    // รองรับฐานข้อมูลเดิม: เพิ่มคอลัมน์ใหม่โดยไม่กระทบประวัติที่มีอยู่
    var currentHeaders = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 1)).getValues()[0];
    for (var h = 0; h < expectedHeaders.length; h++) {
      if (currentHeaders.indexOf(expectedHeaders[h]) === -1) {
        var newCol = sheet.getLastColumn() + 1;
        sheet.getRange(1, newCol).setValue(expectedHeaders[h]);
        currentHeaders.push(expectedHeaders[h]);
      }
    }
  }
  return sheet;
}

// 4. ดึงข้อมูลประวัติการสอนแทนทั้งหมดจาก Sheets
function getHistoryData() {
  try {
    var sheet = getDbSheet();
    var lastRow = sheet.getLastRow();
    if (lastRow <= 1) {
      return []; // ส่งค่ากลับเป็นอาร์เรย์ว่างหากยังไม่มีข้อมูล
    }
    
    var lastColumn = sheet.getLastColumn();
    var headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
    var values = sheet.getRange(2, 1, lastRow - 1, lastColumn).getValues();
    
    var data = [];
    for (var i = 0; i < values.length; i++) {
      var row = values[i];
      var record = {};
      for (var j = 0; j < headers.length; j++) {
        var header = headers[j];
        var val = row[j];
        
        // แปลงฟอร์แมตวันที่ให้อยู่ในรูป YYYY-MM-DD เพื่อป้องกันเรื่องไทม์โซนคลาดเคลื่อน
        if (header === 'date' && val && typeof val.getMonth === 'function') {
          var tz = sheet.getParent().getSpreadsheetTimeZone();
          record[header] = Utilities.formatDate(val, tz, "yyyy-MM-dd");
        } else if (val && typeof val.getMonth === 'function') {
          // แปลง Date อื่นๆ เช่น timestamp ให้เป็น ISO String ป้องกันปัญหา google.script.run เซลไลซ์ไม่ผ่าน
          try {
            record[header] = val.toISOString();
          } catch(e) {
            record[header] = Utilities.formatDate(val, "GMT", "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
          }
        } else {
          record[header] = val;
        }
      }
      data.push(record);
    }
    return data;
  } catch (err) {
    Logger.log("Error in getHistoryData: " + err.toString());
    return [];
  }
}

// 5. บันทึกข้อมูลการจัดสอนแทนลง Sheets
function saveSubstitution(record) {
  try {
    var sheet = getDbSheet();
    var substitutes = record.substitutes || [];
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    for (var i = 0; i < substitutes.length; i++) {
      var sub = substitutes[i];
      var rowData = {
        timestamp: new Date(),
        id: record.id,
        date: record.date,
        day: record.day,
        absentTeacherId: record.absentTeacherId,
        absentTeacherName: record.absentTeacherName,
        reason: record.reason,
        period: sub.period,
        subject: sub.subject,
        class: sub.class,
        room: sub.room,
        subTeacherId: sub.subTeacherId,
        subTeacherName: sub.subTeacherName,
        workType: record.workType || 'ภาษาไทย',
        subjectCode: sub.subjectCode || ''
      };
      sheet.appendRow(headers.map(function(header) {
        return Object.prototype.hasOwnProperty.call(rowData, header) ? rowData[header] : '';
      }));
    }
    return { status: "success" };
  } catch (err) {
    return { status: "error", message: err.toString() };
  }
}

// 6. ลบข้อมูลการสอนแทนทั้งหมดที่ตรงกับ ID ที่ระบุ
function deleteSubstitution(recordId) {
  try {
    var sheet = getDbSheet();
    var lastRow = sheet.getLastRow();
    if (lastRow <= 1) return { status: "success" };
    
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var idColIndex = headers.indexOf('id') + 1; // 1-indexed column number
    if (idColIndex === 0) {
      idColIndex = 2; // assume column B if not found
    }
    
    var ids = sheet.getRange(2, idColIndex, lastRow - 1, 1).getValues();
    
    // วนลูปย้อนกลับจากบรรทัดสุดท้ายขึ้นมา เพื่อป้องกันดัชนีเลื่อนเวลาลบบรรทัด
    for (var i = ids.length - 1; i >= 0; i--) {
      if (ids[i][0] == recordId) {
        sheet.deleteRow(i + 2); 
      }
    }
    return { status: "success" };
  } catch (err) {
    return { status: "error", message: err.toString() };
  }
}

// 7. เปลี่ยนครูผู้สอนแทนของรายการเดิม โดยอ้างอิง ID และคาบ
function updateSubstituteTeacher(recordId, period, subTeacherId, subTeacherName) {
  try {
    if (!recordId || !period || !subTeacherId || !subTeacherName) {
      return { status: "error", message: "ข้อมูลสำหรับเปลี่ยนครูผู้สอนแทนไม่ครบถ้วน" };
    }

    var sheet = getDbSheet();
    var lastRow = sheet.getLastRow();
    if (lastRow <= 1) {
      return { status: "error", message: "ไม่พบประวัติที่ต้องการแก้ไข" };
    }

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var idIndex = headers.indexOf('id');
    var periodIndex = headers.indexOf('period');
    var subTeacherIdIndex = headers.indexOf('subTeacherId');
    var subTeacherNameIndex = headers.indexOf('subTeacherName');

    if (idIndex < 0 || periodIndex < 0 || subTeacherIdIndex < 0 || subTeacherNameIndex < 0) {
      return { status: "error", message: "โครงสร้างตารางไม่รองรับการแก้ไขครูผู้สอนแทน" };
    }

    var values = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();
    var updatedRows = 0;
    for (var i = 0; i < values.length; i++) {
      if (String(values[i][idIndex]) === String(recordId) &&
          Number(values[i][periodIndex]) === Number(period)) {
        sheet.getRange(i + 2, subTeacherIdIndex + 1).setValue(subTeacherId);
        sheet.getRange(i + 2, subTeacherNameIndex + 1).setValue(subTeacherName);
        updatedRows++;
      }
    }

    if (updatedRows === 0) {
      return { status: "error", message: "ไม่พบรายการคาบที่ต้องการแก้ไข" };
    }
    return { status: "success", updatedRows: updatedRows };
  } catch (err) {
    return { status: "error", message: err.toString() };
  }
}

// ฟังก์ชันเสริมช่วยให้ดึงไฟล์ HTML อื่นๆ มารวมในไฟล์หลักได้ง่าย (ถ้าต้องการแยกไฟล์ในอนาคต)
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// ฟังก์ชันจำลองสำหรับดีบักการเข้าถึงแผ่นงาน
function getDebugInfo() {
  var ss;
  var targetSpreadsheetId = "1aadTrBDNx2lEjeNY0DeFLMhUqCH-RJ7NH4I_J00gP-s";
  var debug = {
    targetSpreadsheetId: targetSpreadsheetId,
    openByIdSuccess: false,
    openByIdError: "",
    activeSpreadsheetId: "",
    activeSpreadsheetName: "",
    activeSpreadsheetError: "",
    scriptPropertySpreadsheetId: "",
    scriptPropertyOpenError: "",
    finalSpreadsheetId: "",
    finalSpreadsheetName: "",
    sheetExists: false
  };
  
  try {
    var activeSs = SpreadsheetApp.getActiveSpreadsheet();
    if (activeSs) {
      debug.activeSpreadsheetId = activeSs.getId();
      debug.activeSpreadsheetName = activeSs.getName();
      ss = activeSs;
      debug.finalSpreadsheetId = ss.getId();
      debug.finalSpreadsheetName = ss.getName();
    }
  } catch (errActive) {
    debug.activeSpreadsheetError = errActive.toString();
  }
  
  if (!ss) {
    try {
      var tempSs = SpreadsheetApp.openById(targetSpreadsheetId);
      tempSs.getEditors(); // จะโยนข้อผิดพลาดทันทีหากไม่มีสิทธิ์แก้ไข
      debug.openByIdSuccess = true;
      ss = tempSs;
      debug.finalSpreadsheetId = ss.getId();
      debug.finalSpreadsheetName = ss.getName();
    } catch (err) {
      debug.openByIdError = err.toString();
    }
  }
  
  if (!ss) {
    var properties = PropertiesService.getScriptProperties();
    var ssId = properties.getProperty('SPREADSHEET_ID');
    debug.scriptPropertySpreadsheetId = ssId || "none";
    if (ssId) {
      try {
        ss = SpreadsheetApp.openById(ssId);
        debug.finalSpreadsheetId = ss.getId();
        debug.finalSpreadsheetName = ss.getName();
      } catch(e) {
        debug.scriptPropertyOpenError = e.toString();
      }
    }
  }
  
  if (ss) {
    var sheet = ss.getSheetByName('SubstitutionLogs');
    debug.sheetExists = !!sheet;
  }
  
  return debug;
}

// 7. ฟังก์ชันดึง URL ของไฟล์ Google Sheets
function getSpreadsheetUrl() {
  try {
    var sheet = getDbSheet();
    return sheet.getParent().getUrl();
  } catch (e) {
    return null;
  }
}
