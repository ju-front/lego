import React from 'react';
import 'css/Modal.css';

/**
 * 모달 컴포넌트
 * @param {boolean} show - 모달 표시 여부
 * @param {function} onClose - 모달 닫기 함수
 * @param {JSX.Element} children - 모달 내부의 내용
 * @returns {JSX.Element} 모달 컴포넌트
 */
export const Modal = ({ show, children }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">{children}</div>
    </div>
  );
};
