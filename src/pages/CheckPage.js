import React, { useState } from 'react';
import { Sidebar } from 'components/Sidebar';
import { HeaderNav } from 'components/HeaderNav';
import { Button } from 'components/Button';
import { Timer } from 'components/Timer';
import { Desk } from 'components/Desk';
import 'css/styles.css';
import 'css/Timer.css';
import { set } from 'ramda';

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
  const [isAttendanceStarted, setIsAttendanceStarted] = useState(false);

  const handleStartClick = () => {
    setIsTimerRunning(true);
    setIsAttendanceStarted(true); // 출석 시작 상태 변경
  };

  const handleStopClick = () => {
    setIsTimerRunning(false);
    setInitialTime(5 * 60); // 타이머 초기화
    setIsAttendanceStarted(false); // 출석 종료 상태 변경
  };

  const handleTimerComplete = () => {
    setIsTimerRunning(false);
    setIsAttendanceStarted(false); // 출석 종료 상태 변경
  };

  // 책상 배치 row, column 설정
  const row = 4;
  const column = 6;

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
              <Desk
                row={row}
                column={column}
                isAttendanceActive={isAttendanceStarted}
              ></Desk>
              <div className="attendance-buttons">
                <Button
                  label="출석 시작"
                  color={isAttendanceStarted ? '#d3d3d3' : '#87ceeb'}
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
              <div className="timer-wrapper">
                <div className="timer-container">
                  <Timer
                    initialTime={initialTime}
                    onComplete={handleTimerComplete}
                    isRunning={isTimerRunning}
                  />
                </div>
              </div>
              <Desk row={row} column={column}></Desk>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
