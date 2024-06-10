import React from 'react';
import { Button } from '../components/Button';

/**
 * 출석 상태를 나타내는 버튼 컴포넌트
 * @param {string} status - 출석 상태 ('출석', '지각', '결석', 그 외)
 * @param {function} onClick - 버튼 클릭 시 호출할 함수
 * @returns {JSX.Element} 상태에 따른 스타일이 적용된 버튼
 */
export const StatusButton = ({ status, onClick }) => {
  const getStatusColor = status => {
    switch (status) {
      case '출석':
        return '#28a745';
      case '지각':
        return '#ffc107';
      case '결석':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  // 색상 코드를 Button 컴포넌트에 전달
  const color = getStatusColor(status);

  return <Button label={status} onClick={onClick} color={color} />;
};
