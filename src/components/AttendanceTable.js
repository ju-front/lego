import React, { useState, useEffect } from 'react';
import { Table } from './Table';
import { StatusButton } from './StatusButton';
import { StatusModal } from './StatusModal';

/**
 * 출석 데이터를 테이블 형태로 표시하고, 개별 출석 상태를 변경할 수 있는 모달을 제공하는 컴포넌트입니다.
 * 날짜별로 각 학생의 출석 상태를 보여주며, 각 출석 상태는 상태 변경 가능한 버튼으로 표시됩니다.
 *
 * @param {number} classId - 표시할 클래스의 ID.
 */
export const AttendanceTable = ({ classId }) => {
  const [attendance, setAttendance] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState({});

  const fetchAttendance = async () => {
    const response = await fetch('/dummyAttendance.json');

    // const response = await fetch(`/api/classes/${classId}/attendance`, {
    //   method: 'GET',
    //   headers: {
    //     'access': `${localStorage.getItem('access_token')}`,
    //   },
    // });

    const data = await response.json();

    if (!response.ok) {
      console.error('Failed to fetch attendance data', data.message);
      return;
    }

    setAttendance(data.attendanceRecords);
    console.log(data.message);
  };

  useEffect(() => {
    fetchAttendance();
  }, [classId]);

  const handleStatusClick = record => {
    console.log('clicked record', record);
    setSelectedRecord(record);
    setModalOpen(true);
  };

  const saveStatus = async newStatus => {
    console.log(
      `${selectedRecord.attendanceId} attendance status updated to ${newStatus} successfully`,
    );
    setModalOpen(false);

    // const apiUrl = `/api/classes/${classId}/attendance`;
    // const options = {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     access: `${localStorage.getItem('access_token')}`,
    //   },
    //   body: JSON.stringify({
    //     attendanceId: selectedRecord.attendanceId,
    //     attendanceStatus: newStatus,
    //   }),
    // };

    // try {
    //   const response = await fetch(apiUrl, options);
    //   const data = await response.json();

    //   if (response.ok) {
    //     console.log(data.message);
    //     setModalOpen(false);
    //     await fetchAttendance();
    //   } else {
    //     throw new Error(data.message);
    //   }
    // } catch (error) {
    //   console.error('Failed to update attendance status:', error.message);
    // }
  };

  const dates = [
    ...new Set(
      attendance.flatMap(student =>
        student.attendanceRecords.map(record => record.attendanceDate),
      ),
    ),
  ].sort();

  const columns = [
    { id: 'studentId', headerName: '학생 ID', field: 'studentId' },
    ...dates.map(date => ({
      id: date,
      headerName: date,
      field: date,
      render: (item, row) => (
        <StatusButton
          status={item.attendanceStatus}
          onClick={() => handleStatusClick(item)}
        />
      ),
    })),
  ];

  const studentsData = attendance.reduce((acc, student) => {
    student.attendanceRecords.forEach(record => {
      const date = record.attendanceDate;
      acc[student.studentId] = acc[student.studentId] || {
        ...student,
        dates: {},
      };
      acc[student.studentId].dates[date] = record;
    });
    return acc;
  }, {});

  return (
    <>
      <Table
        colDefs={columns}
        data={Object.values(studentsData).map(student => ({
          ...student,
          ...student.dates,
        }))}
      />
      <StatusModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={newStatus => saveStatus(newStatus)}
        initialStatus={selectedRecord.attendanceStatus}
        studentId={selectedRecord.studentId}
        date={selectedRecord.attendanceDate}
      />
    </>
  );
};
