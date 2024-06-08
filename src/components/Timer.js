import React, { useState, useEffect } from 'react';

/**
 * Timer 컴포넌트
 * @param {number} initialTime - 타이머의 초기 시간 (초 단위)
 * @param {function} onComplete - 타이머 종료 시 호출할 함수
 * @param {boolean} isRunning - 타이머 실행 여부
 * @returns {JSX.Element} 타이머 컴포넌트
 */
export const Timer = ({ initialTime, onComplete, isRunning }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, isRunning, onComplete]);

  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(initialTime);
    }
  }, [isRunning, initialTime]);

  const formatTime = time => {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="timer-container">
      <div className="timer">{formatTime(timeLeft)}</div>
    </div>
  );
};
