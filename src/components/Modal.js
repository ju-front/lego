import React from 'react';
import '../css/Modal.css';

/**
 * 범용 모달 컴포넌트
 *
 * @param {boolean} isOpen - 모달이 열려 있는지 여부
 * @param {JSX.Element} children - 모달 내부에 렌더링될 컨텐츠
 * @returns {JSX.Element|null} 모달 엘리먼트
 */
export const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">{children}</div>
    </div>
  );
};
