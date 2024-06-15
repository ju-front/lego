import React, { useState, useEffect } from 'react';

/**
 * Timer 컴포넌트
 * @param {number} initialTime - 타이머의 초기 시간 (초 단위)
 * @param {function} onComplete - 타이머 종료 시 호출할 함수
 * @param {number} classId - 클래스 ID
 * @param {boolean} isAttendanceStarted - 출석 시작 여부
 * @returns {JSX.Element} 타이머 컴포넌트
 */
export const Timer = ({
  initialTime,
  onComplete,
  classId,
  isAttendanceStarted,
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  // 타이머 실행 시 호출할 함수
  useEffect(() => {
    let timerId;

    const fetchTimeLeft = async () => {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        console.log('Access token not found');
        return;
      }

      const response = await fetch(
        `http://localhost:8080/api/classes/${classId}/attendance/timer`,
        {
          method: 'GET',
          headers: {
            access: accessToken,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setTimeLeft(data.secondsRemaining);
      } else {
        console.log('Failed to fetch time left');
      }
    };

    // 1초마다 서버에서 남은 시간을 받아옴
    if (isAttendanceStarted) {
      fetchTimeLeft();
      timerId = setInterval(fetchTimeLeft, 1000);
    }

    return () => clearInterval(timerId);
  }, [classId, isAttendanceStarted]);

  // 타이머 종료 시 호출할 함수
  useEffect(() => {
    if (timeLeft <= 0 && isAttendanceStarted) {
      onComplete();
    }
  }, [timeLeft, onComplete, isAttendanceStarted]);

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
