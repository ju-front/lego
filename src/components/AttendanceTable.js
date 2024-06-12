import React, { useState, useEffect } from 'react';
import { Table } from './Table';
import { StatusButton } from './StatusButton';
import { StatusModal } from './StatusModal';
import { attendance_data } from '../db/data'; // 임시 데이터

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

  useEffect(() => {
    // 임시 데이터
    setAttendance(attendance_data.attendance_records);

    // 실제 데이터 로딩 로직
    // const fetchAttendance = async () => {
    //   const response = await fetch(`/api/classes/${classId}/attendance`, {
    //     method: 'GET',
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    //     },
    //   });

    //   const data = await response.json();

    //   if (!response.ok) {
    //     console.error('Failed to fetch attendance data', data.message);
    //     return;
    //   }

    //   setAttendance(data.attendance_records);
    //   console.log(data.message);
    // };
    // fetchAttendance();
  }, [classId]);

  /**
   * 출석 상태 버튼 클릭 이벤트를 처리하는 함수.
   * 선택된 출석 기록을 상태로 설정하고 모달을 열어 상태 변경을 허용합니다.
   *
   * @param {Object} record - 선택된 출석 정보. 출석 ID, 학생 ID, 학생 이름, 날짜, 출석 상태를 포함.
   */
  const handleStatusClick = record => {
    console.log('clicked record', record);
    setSelectedRecord(record);
    setModalOpen(true);
  };

  /**
   * 선택된 출석 상태를 새로운 상태로 업데이트하는 함수.
   * API를 통해 서버에 변경 사항을 전송하고, 성공적으로 변경되면 모달을 닫고 출석 데이터를 새로고침함.
   *
   * @param {string} newStatus - 새로운 출석 상태.
   */
  const saveStatus = async newStatus => {
    // 임시 코드
    console.log(
      `${selectedRecord.attendance_id} attendance status updated to ${newStatus} successfully`,
    );
    setModalOpen(false);

    // 실제 적용할 코드
    // const response = await fetch(
    //   `/api/classes/${classId}/attendance/${selectedRecord.attendance_id}`,
    //   {
    //     method: 'PUT',
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ attendance_status: newStatus }),
    //   },
    // );

    // const data = await response.json();

    // if (response.ok) {
    //   console.log(data.message);
    //   setModalOpen(false);

    //   fetchAttendance();
    // } else {
    //   console.error(data.message);
    // }
  };

  const extractDateOnly = date => new Date(date).toLocaleDateString();
  const dates = [
    ...new Set(attendance.map(item => extractDateOnly(item.attendance_date))),
  ].sort();

  const columns = [
    { id: 'student_id', headerName: '학생 ID', field: 'student_id' },
    ...dates.map(date => ({
      id: date,
      headerName: date,
      field: date,
      render: (item, row) => (
        <StatusButton
          status={item.attendance_status}
          onClick={() => handleStatusClick(item)}
        />
      ),
    })),
  ];

  const studentsData = attendance.reduce((acc, item) => {
    const dateOnly = extractDateOnly(item.attendance_date);
    acc[item.student_id] = acc[item.student_id] || { ...item };
    acc[item.student_id][dateOnly] = item;
    return acc;
  }, {});

  return (
    <>
      <Table colDefs={columns} data={Object.values(studentsData)} />
      <StatusModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={newStatus => saveStatus(newStatus)}
        initialStatus={selectedRecord.attendance_status}
        studentId={selectedRecord.student_id}
        date={selectedRecord.attendance_date}
      />
    </>
  );
};
