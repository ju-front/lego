import React, { useState, useEffect } from 'react';
import 'css/Desk.css';
import { Button } from './Button';
import { Modal } from './Modal';

/**
 * 책상 컴포넌트
 * @param {number} row - 책상의 행
 * @param {number} column - 책상의 열
 * @param {boolean} isAttendanceStarted - 출석 시작 여부
 * @param {array} attendanceRecords - 출석 기록
 * @param {number} classId - 클래스 ID
 * @param {object} currentUser - 현재 사용자 정보 객체
 * @returns {JSX.Element} 책상 컴포넌트
 */
export const Desk = ({
  row,
  column,
  isAttendanceStarted,
  attendanceRecords,
  classId,
  currentUser,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false); // 출석 확인 모달
  const [showAlertModal, setShowAlertModal] = useState(false); // 출석 시간 외 클릭 시 모달
  const [selectedDesk, setSelectedDesk] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState(
    Array(row)
      .fill()
      .map(() => Array(column).fill(null)),
  );

  // attendanceRecords를 기반으로 attendanceStatus 설정
  useEffect(() => {
    const updatedStatus = Array(row)
      .fill()
      .map(() => Array(column).fill(null));

    attendanceRecords.forEach(record => {
      updatedStatus[record.deskRow][record.deskColumn] = {
        studentName: record.studentName,
        attendanceId: record.attendanceId,
        studentId: record.studentId,
      };
    });

    setAttendanceStatus(updatedStatus);
  }, [attendanceRecords, row, column]);

  const deskGrid = Array(row)
    .fill()
    .map(() => Array(column).fill());

  function handleCellClick(rowIndex, columnIndex) {
    if (!isAttendanceStarted) {
      setShowAlertModal(true);
      return;
    }
    setSelectedDesk({ rowIndex, columnIndex });
    setShowConfirmModal(true);
  }

  function handleCloseModal() {
    setShowConfirmModal(false);
    setSelectedDesk(null);
  }

  function handleCloseAlertModal() {
    setShowAlertModal(false);
  }

  async function handleConfirmAttendance() {
    const existingRecord = attendanceRecords.find(
      record => record.studentId === currentUser.userId,
    );

    if (existingRecord) {
      // 이미 출석한 학생이 다른 자리에 출석하려고 하는 경우
      const response = await fetch(
        `http://localhost:8080/api/classes/${classId}/attendance/student`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            access: localStorage.getItem('access_token'),
          },
          body: JSON.stringify({
            attendanceId: existingRecord.attendanceId,
            deskRow: selectedDesk.rowIndex,
            deskColumn: selectedDesk.columnIndex,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData.message);
        return;
      }
    } else {
      // 새로운 출석 정보 생성
      const response = await fetch(
        `http://localhost:8080/api/classes/${classId}/attendance/student`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            access: localStorage.getItem('access_token'),
          },
          body: JSON.stringify({
            attendanceDate: new Date(
              new Date().getTime() + 9 * 60 * 60 * 1000,
            ).toISOString(),
            deskRow: selectedDesk.rowIndex,
            deskColumn: selectedDesk.columnIndex,
            attendanceStatus: '출석',
          }),
        },
      );

      if (!response.ok) {
        console.log('Failed to send attendance');
        return;
      }
    }

    const updatedStatus = [...attendanceStatus];
    updatedStatus[selectedDesk.rowIndex][selectedDesk.columnIndex] = {
      studentName: currentUser.name,
      attendanceId: existingRecord ? existingRecord.attendanceId : null,
      studentId: currentUser.userId,
    };

    setAttendanceStatus(updatedStatus);
    setShowConfirmModal(false);
    setSelectedDesk(null);
  }

  return (
    <div className="desk-layout">
      <div className="screen">스크린</div>
      <div className="desk-grid">
        {deskGrid.map((deskRow, rowIndex) => (
          <div key={rowIndex} className="desk-row">
            {deskRow.map((_, columnIndex) => (
              <div key={columnIndex}>
                <Button
                  className="desk-cell"
                  label={
                    attendanceStatus[rowIndex][columnIndex]?.studentName
                      ? `${attendanceStatus[rowIndex][columnIndex].studentName}`
                      : `${rowIndex + 1},${columnIndex + 1}`
                  }
                  color={
                    attendanceStatus[rowIndex][columnIndex]?.studentName
                      ? '#4caf50'
                      : '#b1cde9'
                  }
                  onClick={() => handleCellClick(rowIndex, columnIndex)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* 모달 컴포넌트 */}
      <Modal isOpen={showConfirmModal} onClose={handleCloseModal}>
        <p>해당 자리에 출석하시겠습니까?</p>
        <div className="modal-buttons">
          <Button
            className="status-modal-button"
            label="예"
            onClick={handleConfirmAttendance}
            color="#007bff"
          />
          <Button
            className="status-modal-button"
            label="아니오"
            onClick={handleCloseModal}
            color="#ff6347"
          />
        </div>
      </Modal>
      <Modal isOpen={showAlertModal} onClose={handleCloseAlertModal}>
        <p>현재 출석시간이 아닙니다.</p>
        <div className="modal-buttons">
          <Button
            className="status-modal-button"
            label="확인"
            onClick={handleCloseAlertModal}
            color="#007bff"
          />
        </div>
      </Modal>
    </div>
  );
};
