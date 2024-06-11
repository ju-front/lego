import React, { useState, useEffect } from 'react';
import { Table } from './Table';
import { StatusButton } from './StatusButton';
import { StatusModal } from './StatusModal';
import { attendance_data } from '../db/data';

export const AttendanceTable = ({ classId }) => {
  const [attendance, setAttendance] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    // const fetchAttendance = async () => {
    //   const response = await fetch(`/api/classes/${classId}/attendance`, {
    //     method: 'GET',
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    //     },
    //   });
    //   if (!response.ok) {
    //     console.error('Failed to fetch attendance data');
    //     return;
    //   }
    //   const data = await response.json();
    //   setAttendance(data.attendance_records);
    // };

    // fetchAttendance();

    // 임시 코드
    const data = attendance_data;
    setAttendance(data.attendance_records);
  }, [classId]);

  const handleStatusClick = (student_id, attendance_date, status) => {
    setSelectedStudentId(student_id);
    setSelectedDate(attendance_date);
    setSelectedStatus(status);
    setModalOpen(true);
  };

  const saveStatus = (studentId, attendance_date, newStatus) => {
    console.log(
      `Saving new status ${newStatus} for student ${studentId} on ${attendance_date}`,
    );
    // API 호출 예정
  };

  const extractDateOnly = date => new Date(date).toLocaleDateString();

  const dates = [
    ...new Set(attendance.map(item => extractDateOnly(item.attendance_date))),
  ].sort();

  const columns = [
    { id: 'student_id', headerName: '학생 ID', field: 'student_id' },
    ...dates.map(attendance_date => ({
      id: attendance_date,
      headerName: attendance_date,
      field: attendance_date,
      render: (status, row) => (
        <StatusButton
          status={status}
          onClick={() =>
            handleStatusClick(row.student_id, attendance_date, status)
          }
        />
      ),
    })),
  ];

  const studentsData = attendance.reduce((acc, item) => {
    const dateOnly = extractDateOnly(item.attendance_date);
    acc[item.student_id] = acc[item.student_id] || {
      student_id: item.student_id,
      student_name: item.student_name,
    };
    acc[item.student_id][dateOnly] = item.attendance_status;
    return acc;
  }, {});

  return (
    <>
      <Table colDefs={columns} data={Object.values(studentsData)} />
      <StatusModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={saveStatus}
        initialStatus={selectedStatus}
        studentId={selectedStudentId}
        date={selectedDate}
      />
    </>
  );
};
