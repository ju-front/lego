// Users 데이터 - 학생과 교사
export const users = [
  {
    user_id: 1,
    username: 'teacher1',
    password: 'pass123',
    role: 'Teacher',
    name: 'Mr. Kim',
    github_nickname: 'teachKim',
  },
  {
    user_id: 2,
    username: 'student1',
    password: 'pass123',
    role: 'Student',
    name: '김동욱',
    github_nickname: 'donguk89',
  },
  {
    user_id: 3,
    username: 'student2',
    password: 'pass123',
    role: 'Student',
    name: '장욱',
    github_nickname: 'jake',
  },
  {
    user_id: 4,
    username: 'student3',
    password: 'pass123',
    role: 'Student',
    name: '김민수',
    github_nickname: 'minsu',
  },
  {
    user_id: 5,
    username: 'student3',
    password: 'pass123',
    role: 'Student',
    name: '박지선',
    github_nickname: 'seon5',
  },
];

// Class 데이터 - 수업 정보
export const classes = [
  {
    class_id: 1,
    class_name: 'Math 101',
    teacher_id: 1,
    late_time_limit: 10,
    desk_rows: 5,
    desk_columns: 6,
  },
];

// Attendance 데이터 - 출석 정보
export const attendance = [
  {
    attendance_id: 1,
    class_id: 1,
    student_id: 2,
    attendance_status: '출석',
    date: '2024-06-08',
  },
  {
    attendance_id: 2,
    class_id: 1,
    student_id: 3,
    attendance_status: '지각',
    date: '2024-06-08',
  },
  {
    attendance_id: 3,
    class_id: 1,
    student_id: 4,
    attendance_status: '결석',
    date: '2024-06-08',
  },
  {
    attendance_id: 3,
    class_id: 1,
    student_id: 5,
    attendance_status: '출석',
    date: '2024-06-08',
  },
  {
    attendance_id: 5,
    class_id: 1,
    student_id: 2,
    attendance_status: '출석',
    date: '2024-06-15',
  },
  {
    attendance_id: 6,
    class_id: 1,
    student_id: 3,
    attendance_status: '지각',
    date: '2024-06-15',
  },
  {
    attendance_id: 7,
    class_id: 1,
    student_id: 4,
    attendance_status: '출석',
    date: '2024-06-15',
  },
  {
    attendance_id: 8,
    class_id: 1,
    student_id: 5,
    attendance_status: '결석',
    date: '2024-06-15',
  },
];
