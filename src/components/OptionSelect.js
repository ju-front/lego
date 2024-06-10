import React from 'react';
import 'css/OptionSelect.css';

/**
 * Option 컴포넌트
 * @param {string} value - 옵션 값
 * @param {string} label - 옵션 라벨
 * @returns {JSX.Element} 옵션 컴포넌트
 */
export const Option = ({ value, label }) => {
  return <option value={value}>{label}</option>;
};

/**
 * Select 컴포넌트
 * @param {string} value - 셀렉트 박스의 값
 * @param {function} onChange - 값이 변경될 때 호출되는 함수
 * @param {JSX.Element[]} children - 옵션 요소들
 * @param {string} className - 추가로 적용할 CSS 클래스
 * @returns {JSX.Element} 셀렉트 컴포넌트
 */
export const Select = ({ value, onChange, children, className }) => {
  return (
    <div className={`select-group ${className}`}>
      <select value={value} onChange={onChange} className="select-field">
        {children}
      </select>
    </div>
  );
};
