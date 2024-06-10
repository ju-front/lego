import React, { useState } from 'react';
import { Table } from './Table';
import { StatusButton } from './StatusButton';
import { StatusModal } from './StatusModal';

/**
 * 출석 데이터를 테이블 형태로 표시하고, 각 학생의 출석 상태를 수정할 수 있는 모달을 제공하는 컴포넌트입니다.
 * 각 날짜에 해당하는 출석 상태 버튼을 클릭하여 출석 상태를 변경할 수 있습니다.
 *
 * @param {Object[]} attendance - 출석 데이터의 배열:
 *   - {number} student_id - 학생의 고유 ID.
 *   - {string} attendance_date - 출석 날짜.
 *   - {string} attendance_status - 학생의 출석 상태 ('출석', '지각', '결석' 중 하나).
 *
 * @returns {JSX.Element} - 출석 상태 변경 기능을 포함한 테이블과 상태 변경 모달을 반환.
 */
export const AttendanceTable = ({ attendance }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');

  // StatusButton 클릭 이벤트 핸들러
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

  // 날짜 데이터에서 시간 제거
  const extractDateOnly = date => {
    return new Date(date).toLocaleDateString();
  };

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

  // 학생 ID별로 데이터 그룹화
  const studentsData = attendance.reduce((acc, item) => {
    const dateOnly = extractDateOnly(item.attendance_date);
    acc[item.student_id] = acc[item.student_id] || {
      student_id: item.student_id,
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
