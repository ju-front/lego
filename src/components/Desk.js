import React, { useState } from 'react';
import 'css/Desk.css';
import { Button } from './Button';
import { Modal } from './Modal';

/**
 * 책상 컴포넌트
 * @param {number} row - 책상의 행
 * @param {number} column - 책상의 열
 * @returns {JSX.Element} 책상 컴포넌트
 */
export const Desk = ({ row, column, isAttendanceActive }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false); // 출석 확인 모달
  const [showAlertModal, setShowAlertModal] = useState(false); // 출석 시간 외 클릭 시 모달
  const [selectedDesk, setSelectedDesk] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState(
    Array(row)
      .fill()
      .map(() => Array(column).fill(false)),
  );

  const deskGrid = Array(row)
    .fill()
    .map(() => Array(column).fill());

  function handleCellClick(rowIndex, columnIndex) {
    if (!isAttendanceActive) {
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
