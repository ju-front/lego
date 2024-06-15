import React, { useState, useEffect } from 'react';
import { Table } from './Table';
import { StatusButton } from './StatusButton';
import { StatusModal } from './StatusModal';

/**
 * 출석 데이터를 테이블 형태로 표시하고, 개별 출석 상태를 변경할 수 있는 모달을 제공하는 컴포넌트입니다.
 * 날짜별로 각 학생의 출석 상태를 보여주며, 각 출석 상태는 상태 변경 가능한 버튼으로 표시됩니다.
 *
 * @param {number} classId - 표시할 클래스의 ID.
 * @param {string} role - 사용자의 역할. '선생' 또는 '학생' 중 하나.
 * @param {number} userId - 사용자의 ID.
 */
export const AttendanceTable = ({ classId, role, userId }) => {
  const [attendance, setAttendance] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState({});

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          throw new Error('Access token not found');
        }

        const response = await fetch(
          `http://localhost:8080/api/classes/${classId}/attendance`,
          {
            method: 'GET',
            headers: {
              access: accessToken,
            },
          },
        );

        if (!response.ok) {
          throw new Error('Failed to fetch attendance data');
        }

        const data = await response.json();
        setAttendance(data.attendanceRecords);
      } catch (error) {
        console.error('Failed to load attendance data', error);
      }
    };

    fetchAttendance();
  }, [classId]);

  // const filterRecords =
  //   role === '선생'
  //     ? attendance
  //     : attendance.filter(record => record.studentId === userId);

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
  };

  // 실제 데이터 fetch 코드
  // const saveStatus = async newStatus => {
  //   const apiUrl = `/api/classes/${classId}/attendance`;
  //   const options = {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       access: `${localStorage.getItem('access_token')}`,
  //     },
  //     body: JSON.stringify({
  //       attendanceId: selectedRecord.attendanceId,
  //       attendanceStatus: newStatus,
  //     }),
  //   };

  //   try {
  //     const response = await fetch(apiUrl, options);
  //     const data = await response.json();

  //     if (response.ok) {
  //       console.log(data.message);
  //       setModalOpen(false);
  //       await fetchAttendance();
  //     } else {
  //       throw new Error(data.message);
  //     }
  //   } catch (error) {
  //     console.error('Failed to update attendance status:', error.message);
  //   }
  // };

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
