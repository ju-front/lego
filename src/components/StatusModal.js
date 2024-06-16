import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Button } from '../components/Button';
import '../css/StatusModal.css';

/**
 * 출석 상태 변경을 위한 모달
 *
 * @param {Object} props - 컴포넌트 props
 * @param {boolean} props.isOpen - 모달이 열려 있는지 여부
 * @param {Function} props.onClose - 모달을 닫을 때 호출되는 함수
 * @param {Function} props.onSave - 저장 버튼 클릭 시 호출되는 함수
 * @param {string} props.initialStatus - 초기 출석 상태
 * @param {number} props.studentId - 학생 ID
 * @param {string} props.date - 날짜
 * @returns {JSX.Element} 상태 변경 모달
 */
export const StatusModal = ({ isOpen, onClose, onSave, initialStatus }) => {
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    setStatus(initialStatus);
  }, [initialStatus]);

  const handleSave = () => {
    onSave(status);
    onClose();
  };

  return (
    <Modal isOpen={isOpen}>
      <div className="status-modal-content">
        <h3 className="status-modal-header">출석 상태 변경</h3>
        <select
          className="status-modal-select"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="출석">출석</option>
          <option value="지각">지각</option>
          <option value="결석">결석</option>
        </select>
        <Button
          className="status-modal-button"
          label="저장"
          onClick={handleSave}
          color="#007bff"
        />
        <Button
          className="status-modal-button"
          label="취소"
          onClick={onClose}
          color="#0072ff"
        />
      </div>
    </Modal>
  );
};
