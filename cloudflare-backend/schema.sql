-- D1 Database Schema สำหรับ ระบบจัดครูสอนแทน (กลุ่มสาระการเรียนรู้ภาษาไทย โรงเรียนพูลเจริญวิทยาคม)
CREATE TABLE IF NOT EXISTS substitution_logs (
  autoId INTEGER PRIMARY KEY AUTOINCREMENT,
  id TEXT NOT NULL,
  date TEXT NOT NULL,
  day TEXT NOT NULL,
  absentTeacherId TEXT NOT NULL,
  absentTeacherName TEXT NOT NULL,
  period INTEGER NOT NULL,
  subject TEXT NOT NULL,
  subjectCode TEXT,
  class TEXT NOT NULL,
  room TEXT NOT NULL,
  subTeacherId TEXT NOT NULL,
  subTeacherName TEXT NOT NULL,
  reason TEXT,
  workType TEXT DEFAULT 'ภาษาไทย',
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_sub_date ON substitution_logs(date);
CREATE INDEX IF NOT EXISTS idx_sub_id ON substitution_logs(id);
CREATE INDEX IF NOT EXISTS idx_sub_teacher ON substitution_logs(subTeacherId);
