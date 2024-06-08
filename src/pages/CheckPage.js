import React, { useState } from 'react';
import { Sidebar } from 'components/Sidebar';
import { HeaderNav } from 'components/HeaderNav';
import { Button } from 'components/Button';
import { Timer } from 'components/Timer';
import 'css/styles.css';
import 'css/Timer.css';

/**
 * @returns {JSX.Element} 출석 체크 페이지
 * @constructor
 */

export const CheckPage = ({ role }) => {
  /* 예시로 Teacher로 설정(설정은 router), 실제로는 사용자 정보를 기반으로 설정
   * user.role에 따라 Sidebar의 메뉴가 다르게 보여진다.
   * role은 Teacher, Student 두 가지로 구분한다.
   *
   * 출석 체크 방 생성페이지는 role에 따라 UI가 다르게 보여진다.
   */
  const title =
    role === 'Teacher' ? '교수용 출석 체크 페이지' : '학생용 출석 체크 페이지';

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [initialTime, setInitialTime] = useState(5 * 60); // 5분을 초 단위로 변환. 나중에 서버와 통신 필요

  const handleStartClick = () => {
    setIsTimerRunning(true);
  };

  const handleStopClick = () => {
    setIsTimerRunning(false);
    setInitialTime(5 * 60); // 타이머 초기화
  };

  const handleTimerComplete = () => {
    setIsTimerRunning(false);
  };

  return (
    <div className="main-layout">
      <Sidebar role={role} />
      <div className="main-content-container">
        <HeaderNav title={title} />
        <div className="main-content" style={{ backgroundColor: 'green' }}>
          {role === 'Teacher' ? (
            <div>
              <h1>교수용 출석 체크 페이지</h1>
              <div className="timer-wrapper">
                <div className="timer-container">
                  <Timer
                    initialTime={initialTime}
                    onComplete={handleTimerComplete}
                    isRunning={isTimerRunning}
                  />
                </div>
              </div>

              <div className="attendance-buttons">
                <Button
                  label="출석 시작"
                  color="#87ceeb"
                  onClick={handleStartClick}
                />
                <Button
                  label="출석 종료"
                  color="#ff6347"
                  onClick={handleStopClick}
                />
              </div>
            </div>
          ) : (
            <div>
              <h1>학생용 출석 체크 페이지</h1>
              {/* 학생용 출석 체크 관련 콘텐츠 */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
