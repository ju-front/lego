import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';

/**
 * Card 컴포넌트
 * @param {string} title - 카드에 표시할 제목
 * @param {string} color - 카드의 배경색
 * @param {string} path - 카드 클릭시 이동할 경로
 * @returns {JSX.Element} 클릭 가능한 카드 컴포넌트
 */
export const Card = ({ title, color, path }) => {
  const navigate = useNavigate();

  // 카드 클릭 시 경로로 이동하는 함수
  const handleClick = () => {
    navigate(path);
  };

  return (
    <div
      className="card"
      style={{ '--card-color': color }}
      onClick={handleClick}
    >
      <div className="card-title">{title}</div>
    </div>
  );
};
