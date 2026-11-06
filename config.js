/**
 * ระบบจัดครูสอนแทน กลุ่มสาระการเรียนรู้ภาษาไทย โรงเรียนพูลเจริญวิทยาคม
 * Configuration for HostAtom (Frontend) and Cloudflare / Apps Script (Backend)
 */
window.SUB_APP_CONFIG = {
  // 1. Cloudflare Workers API URL (เมื่อติดตั้ง Worker บน Cloudflare แล้ว ให้นำ URL มาใส่ที่นี่ เช่น https://substitute-api.yourname.workers.dev)
  CLOUDFLARE_API_URL: "https://thai-substitute-api.raminhyong.workers.dev",

  // 2. Google Apps Script Web App URL สำรอง (ใช้งานได้ทันทีระหว่างเตรียมย้ายไป Cloudflare)
  APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbyiMzQ02TEhikt1opXCBQs-bL6y5DVKm0VlFBahUFZKR7uxf6K7Mg-OOYRcSMTl617hOA/exec",

  // 3. โหมดการเชื่อมต่อ: 'auto' | 'cloudflare' | 'appsscript' | 'offline'
  // - 'auto': พยายามเชื่อมต่อ Cloudflare ก่อน ถ้าไม่มีหรือไม่สำเร็จจะสลับไป Apps Script ถ้าออฟไลน์จะใช้ LocalStorage
  MODE: "auto",

  // 4. ข้อมูลระบบ
  SYSTEM_INFO: {
    school: "โรงเรียนพูลเจริญวิทยาคม",
    department: "กลุ่มสาระการเรียนรู้ภาษาไทย",
    headTeacher: "นายรามิล ปัญญพัทธ์",
    academicYear: "2/2569",
    version: "2.0.0-CloudflareReady"
  }
};
