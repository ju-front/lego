import React from 'react';
import 'css/Input.css';

/**
 * Input 컴포넌트
 * @param {string} label - 인풋 필드의 라벨
 * @param {string} value - 인풋 필드의 값
 * @param {function} onChange - 값이 변경될 때 호출되는 함수
 * @param {string} type - 인풋 필드의 타입 (기본값: 'text')
 * @param {string} className - 추가로 적용할 CSS 클래스
 * @returns {JSX.Element} 인풋 컴포넌트
 */
export const Input = ({ label, value, onChange, type = 'text', className }) => {
  return (
    <div className={`input-group ${className}`}>
      {label && <label className="input-label">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="input-field"
      />
    </div>
  );
};
