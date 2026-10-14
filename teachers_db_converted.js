// ⚠️ ตารางสอนชุดนี้เป็นของ "ภาคเรียนที่ 1/2569"
//    โรงเรียนยังไม่ได้ส่งตารางภาคเรียนที่ 2/2569 มาจึงใช้ชุดนี้ไปพลางก่อน
//    ไฟล์นี้ต้องตรงกับ TEACHERS_DB ที่ฝังอยู่ใน Index.html เสมอ (อัปเดตพร้อมกันทั้ง 2 ที่)
// Unified 14 Teachers Official Database 1/2569 with audited names & correct schedule lists
const TEACHERS_DB = [
  {
    id: "T01",
    name: "รามิล ปัญญพัทธ์",
    advisor: "ม.4/2",
    room: "155",
    isSpecialHead: false,
    image: "👨‍🏫",
    schedule: {
      "จันทร์": [
        { period: 3, subject: "ท33101", class: "ม.6/2", room: "131" },
        { period: 4, subject: "ท33101", class: "ม.6/7", room: "141" },
        { period: 6, subject: "ท33101", class: "ม.6/1", room: "324" },
        { period: 7, subject: "ท33101", class: "ม.6/8", room: "142" },
        { period: 8, subject: "ท33101", class: "ม.4/2", room: "155" }
      ],
      "อังคาร": [
        { period: 1, subject: "ท33101", class: "ม.6/5", room: "134" },
        { period: 6, subject: "ท31101", class: "ม.6/6", room: "135" },
        { period: 8, subject: "ชุมนุม", class: "-", room: "-" },
        { period: 9, subject: "15.10 - 17.10", class: "PLC", room: "หอประชุม" },
        { period: 10, subject: "15.10 - 17.10", class: "PLC", room: "หอประชุม" }
      ],
      "พุธ": [
        { period: 1, subject: "ท33101", class: "ม.6/8", room: "142" },
        { period: 2, subject: "ท33101", class: "ม.6/2", room: "131" },
        { period: 6, subject: "ท33101", class: "ม.6/9", room: "143" },
        { period: 7, subject: "ท33101", class: "ม.6/6", room: "135" },
        { period: 8, subject: "ลูกเสือ", class: "ม.1", room: "โดม" }
      ],
      "พฤหัสบดี": [
        { period: 1, subject: "ท33101", class: "ม.6/1", room: "324" },
        { period: 2, subject: "ท33101", class: "ม.6/5", room: "134" },
        { period: 3, subject: "ท33101", class: "ม.6/7", room: "141" },
        { period: 7, subject: "ประชุมวิชาการ", class: "-", room: "-" },
        { period: 8, subject: "ประชุมวิชาการ", class: "-", room: "-" }
      ],
      "ศุกร์": [
        { period: 3, subject: "ท30217", class: "ม.6/5", room: "134" },
        { period: 6, subject: "ท33101", class: "ม.6/9", room: "143" },
        { period: 7, subject: "คุณธรรม", class: "ม.4/2", room: "155" },
        { period: 8, subject: "ก31904", class: "ม.4/2", room: "โดม" }
      ]
    }
  },
  {
    id: "T02",
    name: "วรางคณา ศรีม่วง",
    advisor: "ม.2/2",
    room: "246",
    isSpecialHead: true,
    image: "👩‍🏫",
    schedule: {
      "จันทร์": [
        { period: 1, subject: "ท33101", class: "ม.6/4", room: "133" },
        { period: 2, subject: "ท23101", class: "ม.3/1", room: "315" },
        { period: 3, subject: "ท23101", class: "ม.3/10", room: "445" },
        { period: 7, subject: "ท23101", class: "ม.3/8", room: "434" },
        { period: 8, subject: "คุณธรรม", class: "ม.2/2", room: "246" }
      ],
      "อังคาร": [
        { period: 1, subject: "ท33101", class: "ม.6/3", room: "132" },
        { period: 3, subject: "ท23101", class: "ม.3/13", room: "448" },
        { period: 4, subject: "ท23101", class: "ม.3/10", room: "446" },
        { period: 9, subject: "15.10 - 17.10", class: "PLC", room: "หอประชุม" },
        { period: 10, subject: "15.10 - 17.10", class: "PLC", room: "หอประชุม" }
      ],
      "พุธ": [
        { period: 1, subject: "ท23101", class: "ม.3/13", room: "446" },
        { period: 2, subject: "ท23101", class: "ม.3/1", room: "315" },
        { period: 4, subject: "ท23101", class: "ม.3/4", room: "434" },
        { period: 7, subject: "ลูกเสือ", class: "ม.2", room: "โดม1" },
        { period: 8, subject: "I22201", class: "ม.2/2", room: "246" },
        { period: 9, subject: "I22201", class: "ม.2/2", room: "246" }
      ],
      "พฤหัสบดี": [
        { period: 2, subject: "ท33101", class: "ม.6/4", room: "133" },
        { period: 3, subject: "ท33101", class: "ม.6/3", room: "132" },
        { period: 6, subject: "ท23101", class: "ม.3/4", room: "437" },
        { period: 7, subject: "ท23101", class: "ม.3/13", room: "446" }
      ],
      "ศุกร์": [
        { period: 3, subject: "ท23101", class: "ม.3/1", room: "315" },
        { period: 7, subject: "ท23101", class: "ม.3/10", room: "445" },
        { period: 8, subject: "ก22904", class: "ม.2/2", room: "โดม" }
      ]
    }
  },
  {
    id: "T03",
    name: "อภิชา  พุ่มพวง",
    advisor: "ม.2/4",
    room: "248",
    isSpecialHead: true,
    image: "👩‍🏫",
    schedule: {
      "จันทร์": [
        { period: 1, subject: "ท23101", class: "ม.3/3", room: "436" },
        { period: 2, subject: "ท23101", class: "ม.3/6", room: "441" },
        { period: 3, subject: "ท23101", class: "ม.3/9", room: "444" },
        { period: 7, subject: "ท23101", class: "ม.3/15", room: "การงาน 3" },
        { period: 8, subject: "คุณธรรม", class: "ม.2/4", room: "248" },
        { period: 9, subject: "I22201", class: "ม.2/4", room: "248" }
      ],
      "อังคาร": [
        { period: 1, subject: "ท23101", class: "ม.3/12", room: "447" },
        { period: 2, subject: "ท23101", class: "ม.3/3", room: "436" },
        { period: 3, subject: "I22201", class: "ม.2/4", room: "248" },
        { period: 7, subject: "ท23101", class: "ม.3/9", room: "444" },
        { period: 9, subject: "PLC", class: "ชุมนุม", room: "หอประชุม" },
        { period: 10, subject: "PLC", class: "ชุมนุม", room: "หอประชุม" }
      ],
      "พุธ": [
        { period: 1, subject: "ท23101", class: "ม.3/9", room: "444" },
        { period: 2, subject: "ท23101", class: "ม.3/15", room: "การงาน 2" },
        { period: 7, subject: "ลูกเสือ", class: "ม.2", room: "โดม" },
        { period: 8, subject: "ท23101", class: "ม.3/6", room: "441" }
      ],
      "พฤหัสบดี": [
        { period: 1, subject: "ท23101", class: "ม.3/3", room: "436" },
        { period: 2, subject: "ท23101", class: "ม.3/6", room: "441" },
        { period: 3, subject: "ท23101", class: "ม.3/15", room: "การงาน 2" },
        { period: 8, subject: "ท23101", class: "ม.3/12", room: "447" }
      ],
      "ศุกร์": [
        { period: 1, subject: "ท23101", class: "ม.3/12", room: "447" },
        { period: 8, subject: "ก22904", class: "ม.2/4", room: "โดม" }
      ]
    }
  },
  {
    id: "T04",
    name: "กมลวรรณ  สังข์ทอง",
    advisor: "ม.6/9",
    room: "143",
    isSpecialHead: false,
    image: "👩‍🏫",
    schedule: {
      "จันทร์": [
        { period: 2, subject: "ท32101", class: "ม.5/9", room: "154" },
        { period: 3, subject: "ท32101", class: "ม.5/4", room: "151" },
        { period: 6, subject: "ท32101", class: "ม.5/1", room: "323" },
        { period: 8, subject: "ส33201", class: "ม.6/9", room: "143" }
      ],
      "อังคาร": [
        { period: 3, subject: "ท32101", class: "ม.5/8", room: "153" },
        { period: 4, subject: "ท32101", class: "ม.5/1", room: "323" },
        { period: 6, subject: "ท32101", class: "ม.5/9", room: "154" },
        { period: 7, subject: "ท32101", class: "ม.5/7", room: "316" },
        { period: 9, subject: "PLC", class: "ชุมนุม", room: "หอประชุม" },
        { period: 10, subject: "PLC", class: "ชุมนุม", room: "หอประชุม" }
      ],
      "พุธ": [
        { period: 1, subject: "ท32101", class: "ม.5/5", room: "152" },
        { period: 2, subject: "ท32101", class: "ม.5/3", room: "145" },
        { period: 3, subject: "ท32101", class: "ม.5/2", room: "144" },
        { period: 6, subject: "ลูกเสือ", class: "ม.3", room: "โดม" },
        { period: 7, subject: "ท32101", class: "ม.5/6", room: "325" },
        { period: 8, subject: "ท32101", class: "ม.5/4", room: "151" }
      ],
      "พฤหัสบดี": [
        { period: 2, subject: "ท32101", class: "ม.5/5", room: "152" },
        { period: 3, subject: "เสริมทักษะวิชาการ", class: "ม.6/9", room: "141" },
        { period: 4, subject: "เสริมทักษะวิชาการ", class: "ม.6/9", room: "141" },
        { period: 6, subject: "ท32101", class: "ม.5/2", room: "144" },
        { period: 7, subject: "ท32101", class: "ม.5/7", room: "316" }
      ],
      "ศุกร์": [
        { period: 2, subject: "ท32101", class: "ม.5/8", room: "153" },
        { period: 3, subject: "ท32101", class: "ม.5/3", room: "145" },
        { period: 6, subject: "ท32101", class: "ม.5/6", room: "325" },
        { period: 7, subject: "คุณธรรม", class: "ม.6/9", room: "143" },
        { period: 8, subject: "ก33904", class: "ม.6/9", room: "โดม" }
      ]
    }
  },
  {
    id: "T05",
    name: "สุริยา  ก่อบุญ",
    advisor: "ม.3/6",
    room: "441",
    isSpecialHead: false,
    image: "👨‍🏫",
    schedule: {
      "จันทร์": [
        { period: 3, subject: "ท31101", class: "ม.4/3", room: "161" },
        { period: 4, subject: "ท31101", class: "ม.4/9", room: "165" },
        { period: 6, subject: "ท31101", class: "ม.4/7", room: "311" },
        { period: 7, subject: "ท31101", class: "ม.4/8", room: "164" },
        { period: 8, subject: "คุณธรรม", class: "ม.3/6", room: "441" }
      ],
      "อังคาร": [
        { period: 3, subject: "ท31101", class: "ม.4/4", room: "162" },
        { period: 4, subject: "ท31101", class: "ม.4/6", room: "321" },
        { period: 6, subject: "ท31101", class: "ม.4/9", room: "165" },
        { period: 7, subject: "ท31101", class: "ม.4/3", room: "161" },
        { period: 9, subject: "15.10 - 17.10", class: "PLC", room: "หอประชุม" },
        { period: 10, subject: "15.10 - 17.10", class: "PLC", room: "หอประชุม" }
      ],
      "พุธ": [
        { period: 2, subject: "ท31101", class: "ม.4/4", room: "162" },
        { period: 3, subject: "ท31101", class: "ม.4/2", room: "155" },
        { period: 6, subject: "ลูกเสือ", class: "ม.3", room: "โดม" },
        { period: 7, subject: "เสริมทักษะวิชาการ", class: "ม.3/6", room: "441" },
        { period: 8, subject: "ท31101", class: "ม.4/6", room: "321" }
      ],
      "พฤหัสบดี": [
        { period: 0, subject: "ท31101", class: "ม.4/1", room: "322" },
        { period: 4, subject: "ท31101", class: "ม.4/5", room: "163" },
        { period: 6, subject: "ท31101", class: "ม.4/2", room: "155" },
        { period: 7, subject: "ท31101", class: "ม.4/8", room: "164" }
      ],
      "ศุกร์": [
        { period: 2, subject: "ท31101", class: "ม.4/5", room: "163" },
        { period: 4, subject: "ท31101", class: "ม.4/7", room: "311" },
        { period: 6, subject: "ท31101", class: "ม.4/1", room: "322" },
        { period: 8, subject: "ก23904", class: "ม.3/6", room: "โดม" }
      ]
    }
  },
  {
    id: "T06",
    name: "ชินกร  ศิริโยธา",
    advisor: "ม.2/13",
    room: "432",
    isSpecialHead: false,
    image: "👨‍🏫",
    schedule: {
      "จันทร์": [
        { period: 1, subject: "ท21101", class: "ม.1/12", room: "242" },
        { period: 3, subject: "ท21101", class: "ม.1/9", room: "237" },
        { period: 5, subject: "ท20208", class: "ม.1", room: "233" },
        { period: 6, subject: "ท20208", class: "ม.1", room: "233" },
        { period: 7, subject: "I22201", class: "ม.2/13", room: "432" },
        { period: 8, subject: "คุณธรรม", class: "ม.2/13", room: "432" }
      ],
      "อังคาร": [
        { period: 2, subject: "I22201", class: "ม.2/13", room: "432" },
        { period: 5, subject: "ท21101", class: "ม.1/15", room: "245" },
        { period: 7, subject: "ท21101", class: "ม.1/2", room: "221" },
        { period: 9, subject: "15.10 - 17.10", class: "PLC", room: "หอประชุม" },
        { period: 10, subject: "15.10 - 17.10", class: "PLC", room: "หอประชุม" }
      ],
      "พุธ": [
        { period: 1, subject: "ท21101", class: "ม.1/5", room: "233" },
        { period: 5, subject: "ท21101", class: "ม.1/12", room: "242" },
        { period: 6, subject: "ท21101", class: "ม.1/2", room: "221" },
        { period: 7, subject: "ลูกเสือ", class: "ม.2", room: "โดม" }
      ],
      "พฤหัสบดี": [
        { period: 1, subject: "ท21101", class: "ม.1/5", room: "233" },
        { period: 2, subject: "ท21101", class: "ม.1/15", room: "245" },
        { period: 6, subject: "ส22201", class: "ม.2/13", room: "432" },
        { period: 7, subject: "ท21101", class: "ม.1/9", room: "237" },
        { period: 8, subject: "ท21101", class: "ม.1/12", room: "242" }
      ],
      "ศุกร์": [
        { period: 1, subject: "ท21101", class: "ม.1/2", room: "221" },
        { period: 5, subject: "ท21101", class: "ม.1/9", room: "237" },
        { period: 6, subject: "ท21101", class: "ม.1/5", room: "233" },
        { period: 7, subject: "ท21101", class: "ม.1/15", room: "245" },
        { period: 8, subject: "ก22904", class: "ม.2/13", room: "โดม" }
      ]
    }
  },
  {
    id: "T07",
    name: "ชื่นฤดี  หรับหลี",
    advisor: "ม.3/5",
    room: "438",
    isSpecialHead: false,
    image: "👩‍🏫",
    schedule: {
      "จันทร์": [
        { period: 2, subject: "ท22101", class: "ม.2/13", room: "31" },
        { period: 6, subject: "ท22101", class: "ม.2/10", room: "426" },
        { period: 7, subject: "ท22101", class: "ม.2/7", room: "423" },
        { period: 8, subject: "คุณธรรม", class: "ม.3/5", room: "438" }
      ],
      "อังคาร": [
        { period: 2, subject: "ส23201", class: "ม.3/5", room: "438" },
        { period: 3, subject: "ท22101", class: "ม.2/10", room: "426" },
        { period: 5, subject: "ท22101", class: "ม.2/1", room: "314" },
        { period: 7, subject: "ท22101", class: "ม.2/4", room: "248" },
        { period: 9, subject: "15.10 - 17.10", class: "PLC", room: "หอประชุม" },
        { period: 10, subject: "15.10 - 17.10", class: "PLC", room: "หอประชุม" }
      ],
      "พุธ": [
        { period: 2, subject: "ท22101", class: "ม.2/13", room: "432" },
        { period: 5, subject: "ท22101", class: "ม.2/7", room: "423" },
        { period: 6, subject: "ลูกเสือ", class: "ม.3", room: "โดม" },
        { period: 7, subject: "เสริมทักษะวิชาการ", class: "ม.3/5", room: "438" },
        { period: 8, subject: "ท22101", class: "ม.2/1", room: "314" }
      ],
      "พฤหัสบดี": [
        { period: 1, subject: "ท22101", class: "ม.2/10", room: "426" },
        { period: 5, subject: "ท22101", class: "ม.2/4", room: "248" },
        { period: 7, subject: "ท22101", class: "ม.2/1", room: "314" },
        { period: 8, subject: "ท22101", class: "ม.2/13", room: "432" }
      ],
      "ศุกร์": [
        { period: 3, subject: "ท20212", class: "ม.3", room: "435" },
        { period: 4, subject: "ท20212", class: "ม.3", room: "435" },
        { period: 6, subject: "ท22101", class: "ม.2/4", room: "248" },
        { period: 7, subject: "ท22101", class: "ม.2/7", room: "423" },
        { period: 8, subject: "ก23904", class: "ม.3/5", room: "โดม" }
      ]
    }
  },
  {
    id: "T08",
    name: "วนิชญา  เชียงน้อย",
    advisor: "ม.3/13",
    room: "448",
    isSpecialHead: false,
    image: "👩‍🏫",
    schedule: {
      "จันทร์": [
        { period: 1, subject: "ท22101", class: "ม.2/2", room: "246" },
        { period: 2, subject: "ท22101", class: "ม.2/14", room: "433" },
        { period: 3, subject: "ท22101", class: "ม.2/11", room: "427" },
        { period: 8, subject: "คุณธรรม", class: "ม.3/13", room: "448" }
      ],
      "อังคาร": [
        { period: 1, subject: "ส23201", class: "ม.3/13", room: "446" },
        { period: 7, subject: "ท22101", class: "ม.2/8", room: "424" },
        { period: 9, subject: "15.10 - 17.10", class: "PLC", room: "หอประชุม" },
        { period: 10, subject: "15.10 - 17.10", class: "PLC", room: "หอประชุม" }
      ],
      "พุธ": [
        { period: 1, subject: "ท22101", class: "ม.2/8", room: "424" },
        { period: 2, subject: "ท22101", class: "ม.2/5", room: "421" },
        { period: 5, subject: "ท22101", class: "ม.2/2", room: "246" },
        { period: 6, subject: "ลูกเสือ", class: "ม.3", room: "โดม" },
        { period: 7, subject: "เสริมทักษะวิชาการ", class: "ม.3/13", room: "446" },
        { period: 8, subject: "ท22101", class: "ม.2/14", room: "433" }
      ],
      "พฤหัสบดี": [
        { period: 2, subject: "ท22101", class: "ม.2/8", room: "424" },
        { period: 3, subject: "ท22101", class: "ม.2/5", room: "421" },
        { period: 6, subject: "ท22101", class: "ม.2/2", room: "246" },
        { period: 7, subject: "ท22101", class: "ม.2/11", room: "427" },
        { period: 8, subject: "ท22101", class: "ม.2/14", room: "433" }
      ],
      "ศุกร์": [
        { period: 6, subject: "ท22101", class: "ม.2/5", room: "421" },
        { period: 7, subject: "ท22101", class: "ม.2/11", room: "427" },
        { period: 8, subject: "ก23904", class: "ม.3/13", room: "โดม" }
      ]
    }
  },
  {
    id: "T09",
    name: "อิงอร  สิทธิจินดา",
    advisor: "ม.3/14",
    room: "การงาน 1",
    isSpecialHead: false,
    image: "👩‍🏫",
    schedule: {
      "จันทร์": [
        { period: 1, subject: "ท22101", class: "ม.2/6", room: "422" },
        { period: 3, subject: "ท22101", class: "ม.2/3", room: "247" },
        { period: 4, subject: "ส23201", class: "ม.3/14", room: "การงาน 1" },
        { period: 7, subject: "ท22101", class: "ม.2/9", room: "425" },
        { period: 8, subject: "คุณธรรม", class: "ม.3/14", room: "การงาน 1" }
      ],
      "อังคาร": [
        { period: 1, subject: "ท22101", class: "ม.2/3", room: "247" },
        { period: 3, subject: "ท22101", class: "ม.2/15", room: "434" },
        { period: 7, subject: "เสริมทักษะวิชาการ", class: "ม.3/14", room: "การงาน 1" },
        { period: 8, subject: "ชุมนุม", class: "-", room: "-" },
        { period: 9, subject: "15.10 - 17.10 (PLC)", class: "PLC", room: "หอประชุม" },
        { period: 10, subject: "15.10 - 17.10 (PLC)", class: "PLC", room: "หอประชุม" }
      ],
      "พุธ": [
        { period: 5, subject: "ท22101", class: "ม.2/12", room: "431" },
        { period: 6, subject: "ลูกเสือ", class: "ม.3", room: "โดม" },
        { period: 8, subject: "ท22101", class: "ม.2/15", room: "434" }
      ],
      "พฤหัสบดี": [
        { period: 1, subject: "ท22101", class: "ม.2/6", room: "422" },
        { period: 2, subject: "ท22101", class: "ม.2/12", room: "431" },
        { period: 5, subject: "ท20213", class: "ม.1", room: "233" },
        { period: 6, subject: "ท20213", class: "ม.1", room: "233" },
        { period: 7, subject: "ท22101", class: "ม.2/9", room: "425" }
      ],
      "ศุกร์": [
        { period: 2, subject: "ท22101", class: "ม.2/9", room: "425" },
        { period: 3, subject: "ท22101", class: "ม.2/15", room: "434" },
        { period: 5, subject: "ท22101", class: "ม.2/3", room: "247" },
        { period: 6, subject: "ท22101", class: "ม.2/6", room: "422" },
        { period: 7, subject: "ท22101", class: "ม.2/12", room: "431" },
        { period: 8, subject: "ก22904", class: "ม.3/14", room: "โดม" }
      ]
    }
  },
  {
    id: "T10",
    name: "เฉลิมชาติ  ภูผันผิน",
    advisor: "ม.2/15",
    room: "434",
    isSpecialHead: false,
    image: "👨‍🏫",
    schedule: {
      "จันทร์": [
        { period: 1, subject: "ท23101", class: "ม.3/14", room: "การงาน 1" },
        { period: 2, subject: "I22201", class: "ม.2/15", room: "434" },
        { period: 4, subject: "ท23101", class: "ม.3/5", room: "438" },
        { period: 7, subject: "ท23101", class: "ม.3/8", room: "443" },
        { period: 8, subject: "คุณธรรม", class: "ม.2/15", room: "434" }
      ],
      "อังคาร": [
        { period: 2, subject: "ท23101", class: "ม.3/7", room: "442" },
        { period: 4, subject: "ท23101", class: "ม.3/8", room: "443" },
        { period: 7, subject: "ท23101", class: "ม.3/2", room: "435" },
        { period: 8, subject: "ชุมนุม", class: "-", room: "-" },
        { period: 9, subject: "15.10 - 17.10 (PLC)", class: "PLC", room: "หอประชุม" },
        { period: 10, subject: "15.10 - 17.10 (PLC)", class: "PLC", room: "หอประชุม" }
      ],
      "พุธ": [
        { period: 1, subject: "ท23101", class: "ม.3/11", room: "446" },
        { period: 2, subject: "ท23101", class: "ม.3/14", room: "การงาน 1" },
        { period: 5, subject: "เสริมทักษะวิชาการ", class: "ม.2/15", room: "435" },
        { period: 7, subject: "ลูกเสือ", class: "ม.2", room: "โดม" },
        { period: 8, subject: "ท23101", class: "ม.3/2", room: "435" }
      ],
      "พฤหัสบดี": [
        { period: 1, subject: "ท23101", class: "ม.3/5", room: "438" },
        { period: 2, subject: "I22201", class: "ม.2/15", room: "434" },
        { period: 3, subject: "ท23101", class: "ม.3/2", room: "435" },
        { period: 4, subject: "ท23101", class: "ม.3/7", room: "447" },
        { period: 7, subject: "ท23101", class: "ม.3/11", room: "446" },
        { period: 8, subject: "ท23101", class: "ม.3/14", room: "การงาน 1" }
      ],
      "ศุกร์": [
        { period: 1, subject: "ท23101", class: "ม.3/7", room: "442" },
        { period: 2, subject: "ท23101", class: "ม.3/5", room: "438" },
        { period: 6, subject: "ท23101", class: "ม.3/8", room: "443" },
        { period: 7, subject: "ท23101", class: "ม.3/11", room: "446" },
        { period: 8, subject: "ก22904", class: "ม.2/15", room: "โดม" }
      ]
    }
  },
  {
    id: "T11",
    name: "จิรวัฒน์  ศรีวโร",
    advisor: "ม.2/10",
    room: "426",
    isSpecialHead: false,
    image: "👨‍🏫",
    schedule: {
      "จันทร์": [
        { period: 1, subject: "ท21101", class: "ม.1/8", room: "236" },
        { period: 2, subject: "ท21101", class: "ม.1/11", room: "241" },
        { period: 3, subject: "ท21101", class: "ม.1/14", room: "244" },
        { period: 5, subject: "ท21101", class: "ม.1/3", room: "231" },
        { period: 8, subject: "คุณธรรม", class: "ม.2/10", room: "426" }
      ],
      "อังคาร": [
        { period: 2, subject: "I22201", class: "ม.2/10", room: "426" },
        { period: 5, subject: "ท21101", class: "ม.1/14", room: "244" },
        { period: 6, subject: "ท21101", class: "ม.1/3", room: "231" },
        { period: 8, subject: "ชุมนุม", class: "ชุมนุม", room: "-" },
        { period: 9, subject: "PLC", class: "PLC", room: "หอประชุม" },
        { period: 10, subject: "PLC", class: "PLC", room: "หอประชุม" }
      ],
      "พุธ": [
        { period: 1, subject: "ท21101", class: "ม.1/4", room: "448" },
        { period: 2, subject: "ท21101", class: "ม.1/8", room: "236" },
        { period: 3, subject: "ท30215", class: "ม.5/5", room: "152" },
        { period: 6, subject: "ท21101", class: "ม.1/11", room: "241" },
        { period: 7, subject: "ลูกเสือ", class: "ม.2", room: "โดม" },
        { period: 8, subject: "I22201", class: "ม.2/10", room: "426" }
      ],
      "พฤหัสบดี": [
        { period: 2, subject: "ส22201", class: "ม.2/10", room: "426" },
        { period: 3, subject: "ท21101", class: "ม.1/14", room: "244" },
        { period: 8, subject: "ท21101", class: "ม.1/4", room: "232" }
      ],
      "ศุกร์": [
        { period: 2, subject: "ท21101", class: "ม.1/8", room: "236" },
        { period: 5, subject: "ท21101", class: "ม.1/3", room: "231" },
        { period: 6, subject: "ท21101", class: "ม.1/11", room: "241" },
        { period: 7, subject: "ท21101", class: "ม.1/4", room: "232" },
        { period: 8, subject: "ก21904", class: "ม.2/10", room: "โดม" }
      ]
    }
  },
  {
    id: "T12",
    name: "ศุภนุช  บุตรดี",
    advisor: "ม.3/3",
    room: "436",
    isSpecialHead: false,
    image: "👩‍🏫",
    schedule: {
      "จันทร์": [
        { period: 1, subject: "ท21101", class: "ม.1/1", room: "313" },
        { period: 3, subject: "ท21101", class: "ม.1/10", room: "238" },
        { period: 7, subject: "ท21101", class: "ม.1/13", room: "243" },
        { period: 8, subject: "คุณธรรม", class: "ม.3/3", room: "436" }
      ],
      "อังคาร": [
        { period: 1, subject: "ท21101", class: "ม.1/6", room: "238" },
        { period: 2, subject: "ท21101", class: "ม.1/7", room: "235" },
        { period: 5, subject: "ท21101", class: "ม.1/13", room: "243" },
        { period: 8, subject: "ชุมนุม", class: "ชุมนุม", room: "-" },
        { period: 9, subject: "PLC", class: "PLC", room: "หอประชุม" },
        { period: 10, subject: "PLC", class: "PLC", room: "หอประชุม" }
      ],
      "พุธ": [
        { period: 1, subject: "ท21101", class: "ม.1/10", room: "238" },
        { period: 2, subject: "ท21101", class: "ม.1/1", room: "313" },
        { period: 5, subject: "ท21101", class: "ม.1/13", room: "243" },
        { period: 6, subject: "ลูกเสือ", class: "ม.3", room: "โดม" },
        { period: 7, subject: "ท21101", class: "ม.1/6", room: "234" },
        { period: 8, subject: "เสริมทักษะวิชาการ", class: "ม.3/3", room: "436" }
      ],
      "พฤหัสบดี": [
        { period: 2, subject: "ส23201", class: "ม.3/3", room: "436" },
        { period: 3, subject: "ท21101", class: "ม.1/7", room: "235" },
        { period: 7, subject: "ท21101", class: "ม.1/6", room: "234" },
        { period: 8, subject: "ท30213", class: "ม.4/5", room: "163" }
      ],
      "ศุกร์": [
        { period: 2, subject: "ท21101", class: "ม.1/1", room: "313" },
        { period: 3, subject: "ท21101", class: "ม.1/10", room: "238" },
        { period: 5, subject: "ท21101", class: "ม.1/7", room: "235" },
        { period: 8, subject: "ก23904", class: "ม.3/3", room: "โดม" }
      ]
    }
  },
  {
    id: "T13",
    name: "นันทกาญจน์ เรืองกระจาย",
    advisor: "ม.2/14",
    room: "433",
    isSpecialHead: false,
    image: "👩‍🏫",
    schedule: {
      "จันทร์": [
        { period: 1, subject: "ท20214", class: "ม.1/13", room: "243" },
        { period: 3, subject: "ท20214", class: "ม.1/6", room: "234" },
        { period: 6, subject: "ส22201", class: "ม.2/14", room: "433" },
        { period: 7, subject: "ท20214", class: "ม.1/10", room: "238" },
        { period: 8, subject: "คุณธรรม", class: "ม.2/14", room: "244" }
      ],
      "อังคาร": [
        { period: 6, subject: "ท20214", class: "ม.1/12", room: "242" },
        { period: 7, subject: "ท20214", class: "ม.1/8", room: "236" },
        { period: 8, subject: "ชุมนุม", class: "-", room: "-" },
        { period: 9, subject: "PLC", class: "-", room: "หอประชุม" },
        { period: 10, subject: "PLC", class: "-", room: "หอประชุม" }
      ],
      "พุธ": [
        { period: 2, subject: "I22201", class: "ม.2/14", room: "433" },
        { period: 3, subject: "ท20205", class: "ม.3", room: "441" },
        { period: 4, subject: "ท20205", class: "ม.3", room: "441" },
        { period: 6, subject: "ท20214", class: "ม.1/3", room: "231" },
        { period: 7, subject: "ลูกเสือ", class: "ม.2", room: "โดม" }
      ],
      "พฤหัสบดี": [
        { period: 1, subject: "ท20214", class: "ม.1/2", room: "221" },
        { period: 2, subject: "I22201", class: "ม.2/14", room: "433" },
        { period: 5, subject: "ท20214", class: "ม.1/4", room: "232" },
        { period: 6, subject: "ท20214", class: "ม.1/1", room: "313" },
        { period: 7, subject: "ท20214", class: "ม.1/5", room: "233" }
      ],
      "ศุกร์": [
        { period: 1, subject: "ท20214", class: "ม.1/9", room: "237" },
        { period: 3, subject: "ท20214", class: "ม.1/7", room: "235" },
        { period: 5, subject: "ท20214", class: "ม.1/15", room: "245" },
        { period: 6, subject: "ท20214", class: "ม.1/14", room: "244" },
        { period: 7, subject: "ท20214", class: "ม.1/11", room: "241" },
        { period: 8, subject: "ก22904", class: "ม.2/14", room: "โดม" }
      ]
    }
  },
  {
    id: "T14",
    name: "วรวัลภ์ นิตยระวีวาร",
    advisor: "ม.2/15",
    room: "434",
    isSpecialHead: false,
    image: "👩‍🏫",
    schedule: {
      "จันทร์": [
        { period: 1, subject: "ท20216", class: "ม.2/5", room: "421" },
        { period: 2, subject: "I22201", class: "ม.2/14", room: "433" },
        { period: 3, subject: "ท20216", class: "ม.2/13", room: "432" },
        { period: 7, subject: "ท20216", class: "ม.2/10", room: "426" },
        { period: 8, subject: "คุณธรรม", class: "ม.2/15", room: "434" },
        { period: 9, subject: "ท20216", class: "ม.2/1", room: "314" }
      ],
      "อังคาร": [
        { period: 1, subject: "ท20216", class: "ม.2/9", room: "425" },
        { period: 5, subject: "ท20210", class: "ม.2", room: "ห้องสมุด" },
        { period: 6, subject: "ท20210", class: "ม.2", room: "ห้องสมุด" },
        { period: 7, subject: "ท20216", class: "ม.2/15", room: "433" },
        { period: 8, subject: "ชุมนุม", class: "-", room: "-" },
        { period: 9, subject: "PLC", class: "-", room: "หอประชุม" },
        { period: 10, subject: "PLC", class: "-", room: "หอประชุม" }
      ],
      "พุธ": [
        { period: 6, subject: "ท20216", class: "ม.2/4", room: "248" },
        { period: 7, subject: "ลูกเสือ", class: "ม.2", room: "โดม" },
        { period: 8, subject: "ท20216", class: "ม.2/6", room: "442" }
      ],
      "พฤหัสบดี": [
        { period: 1, subject: "ท20216", class: "ม.2/7", room: "423" },
        { period: 2, subject: "I22201", class: "ม.2/15", room: "434" },
        { period: 3, subject: "ท20216", class: "ม.2/11", room: "427" },
        { period: 8, subject: "ท20216", class: "ม.2/2", room: "246" }
      ],
      "ศุกร์": [
        { period: 1, subject: "ท20216", class: "ม.2/8", room: "424" },
        { period: 3, subject: "ท20216", class: "ม.2/14", room: "434" },
        { period: 5, subject: "ท20216", class: "ม.2/12", room: "431" },
        { period: 6, subject: "ส22201", class: "ม.2/15", room: "434" },
        { period: 7, subject: "ท20216", class: "ม.2/3", room: "247" },
        { period: 8, subject: "ก22904", class: "ม.2/15", room: "โดม" }
      ]
    }
  }
];

// วันอังคารคาบ 8-10 เป็นช่วงกิจกรรม/ประชุม ไม่ต้องนำไปจัดสอนแทน
TEACHERS_DB.forEach(teacher => {
  teacher.schedule["อังคาร"] = (teacher.schedule["อังคาร"] || [])
    .filter(slot => ![8, 9, 10].includes(Number(slot.period)));
});
