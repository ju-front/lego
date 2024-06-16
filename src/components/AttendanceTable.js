import React, { useState, useEffect, useCallback } from 'react';
// import { Table } from './Table';
import { CommonTable } from 'ezy-ui';
import { StatusButton } from './StatusButton';
import { StatusModal } from './StatusModal';
import '../css/AttendanceTable.css';

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

  const fetchAttendance = useCallback(async () => {
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

      const filterRecords =
        role === '선생'
          ? data.attendanceRecords
          : data.attendanceRecords.filter(
              record => record.studentId === userId,
            );

      setAttendance(filterRecords);
    } catch (error) {
      console.error('Failed to load attendance data', error);
    }
  }, [classId, role, userId]);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  const handleStatusClick = record => {
    if (role === '선생') {
      console.log('clicked record', record);
      setSelectedRecord(record);
      setModalOpen(true);
    } else {
      console.log('Access denied: Students cannot modify attendance records.');
    }
  };

  const saveStatus = async newStatus => {
    console.log('#####', selectedRecord.attendanceId, newStatus);
    const apiUrl = `http://localhost:8080/api/classes/${classId}/attendance`;
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        access: `${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify({
        attendanceId: selectedRecord.attendanceId,
        attendanceStatus: newStatus,
      }),
    };

    try {
      const response = await fetch(apiUrl, options);
      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        setModalOpen(false);
        await fetchAttendance();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Failed to update attendance status:', error.message);
    }
  };

  const extractDate = dateTimeStr => dateTimeStr.split('T')[0];

  const dates = [
    ...new Set(
      attendance.flatMap(student =>
        student.attendanceRecords.map(record =>
          extractDate(record.attendanceDate),
        ),
      ),
    ),
  ].sort();

  const columns = [
    {
      id: 'studentName',
      headerName: '학생 이름',
      field: 'studentName',
      colType: 'TEXT',
    },
    ...dates.map(date => ({
      id: date,
      headerName: date,
      field: date,
      colType: 'CUSTOM',
      render: (data, row) => (
        <StatusButton
          status={data.attendanceStatus}
          onClick={() => handleStatusClick(data)}
          disabled={role !== '선생'}
        />
      ),
    })),
  ];

  const tableData = attendance.map(student => ({
    ...student,
    ...student.attendanceRecords.reduce(
      (acc, record) => ({
        ...acc,
        [extractDate(record.attendanceDate)]: record,
      }),
      {},
    ),
  }));

  return (
    <>
      <CommonTable
        className="attendance-table"
        colDefs={columns}
        data={tableData}
        isIdx={true}
        idxLabel="Index"
      />
      <StatusModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={newStatus => saveStatus(newStatus)}
        initialStatus={selectedRecord.attendanceStatus}
        studentName={selectedRecord.studentName}
        date={selectedRecord.attendanceDate}
      />
    </>
  );
};
