import React from 'react';

export const StatusModal = ({ record, onClose }) => {
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 10,
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: 20,
      }}
    >
      <h2>출석 상태 변경</h2>
      <button onClick={() => onClose('출석')}>출석</button>
      <button onClick={() => onClose('지각')}>지각</button>
      <button onClick={() => onClose('결석')}>결석</button>
      <button onClick={onClose}>닫기</button>
    </div>
  );
};
