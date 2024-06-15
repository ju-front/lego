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
 * @returns {JSX.Element} 책상 컴포넌트
 */
export const Desk = ({
  row,
  column,
  isAttendanceStarted,
  attendanceRecords,
  classId,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false); // 출석 확인 모달
  const [showAlertModal, setShowAlertModal] = useState(false); // 출석 시간 외 클릭 시 모달
  const [selectedDesk, setSelectedDesk] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState(
    Array(row)
      .fill()
      .map(() => Array(column).fill(false)),
  );

  // attendanceRecords를 기반으로 attendanceStatus 설정
  useEffect(() => {
    const updatedStatus = Array(row)
      .fill()
      .map(() => Array(column).fill(false));

    attendanceRecords.forEach(record => {
      updatedStatus[record.deskRow][record.deskColumn] =
        record.attendanceStatus;
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

  function handleConfirmAttendance() {
    const updatedStatus = [...attendanceStatus];
    updatedStatus[selectedDesk.rowIndex][selectedDesk.columnIndex] = true;
    setAttendanceStatus(updatedStatus);
    setShowConfirmModal(false);
    setSelectedDesk(null);

    // 서버로 출석 정보 보내기
    const sendAttendance = async () => {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        console.log('Access token not found');
        return;
      }

      // 한국 시간으로 변환
      const now = new Date();
      const koreaTime = new Date(now.getTime() + 9 * 60 * 60 * 1000); // 9시간 더하기

      const response = await fetch(
        `http://localhost:8080/api/classes/${classId}/attendance/student`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            access: accessToken,
          },
          body: JSON.stringify({
            attendanceDate: koreaTime.toISOString(),
            deskRow: selectedDesk.rowIndex,
            deskColumn: selectedDesk.columnIndex,
            attendanceStatus: '출석',
          }),
        },
      );

      if (!response.ok) {
        console.log('Failed to send attendance');
      } else {
        console.log('Attendance sent successfully');
      }
    };

    sendAttendance();
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
                  label={`${rowIndex + 1},${columnIndex + 1}`}
                  color={
                    attendanceStatus[rowIndex][columnIndex]
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
          <button onClick={handleConfirmAttendance}>예</button>
          <button onClick={handleCloseModal}>아니오</button>
        </div>
      </Modal>
      <Modal isOpen={showAlertModal} onClose={handleCloseAlertModal}>
        <p>현재 출석시간이 아닙니다.</p>
        <div className="modal-buttons">
          <button onClick={handleCloseAlertModal}>확인</button>
        </div>
      </Modal>
    </div>
  );
};
