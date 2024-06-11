import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Sidebar } from 'components/Sidebar';
import { HeaderNav } from 'components/HeaderNav';
import { Button } from 'components/Button';
import { Timer } from 'components/Timer';
import { Desk } from 'components/Desk';
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

  const { class_id } = useParams();
  const [classData, setClassData] = useState(null); // 수업 정보를 받아올 상태
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [initialTime, setInitialTime] = useState(5 * 60); // 5분을 초 단위로 변환. 나중에 서버와 통신 필요
  const [isAttendanceStarted, setIsAttendanceStarted] = useState(false);

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await fetch('/dummyData.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const classInfo = data.classes.find(
          classItem => classItem.class_id === parseInt(class_id),
        );
        setClassData(classInfo);
        setInitialTime(classInfo.late_time_limit * 60); // 출석 시간을 초 단위로 변환
      } catch (error) {
        console.error('Failed to load class data from dummy data', error);
      }
    };

    fetchClassData();
  }, [class_id]);

  const handleStartClick = () => {
    setIsTimerRunning(true);
    setIsAttendanceStarted(true); // 출석 시작 상태 변경
  };

  const handleStopClick = () => {
    setIsTimerRunning(false);
    setInitialTime(classData.late_time_limit * 60); // 타이머 초기화
    setIsAttendanceStarted(false); // 출석 종료 상태 변경
  };

  const handleTimerComplete = () => {
    setIsTimerRunning(false);
    setIsAttendanceStarted(false); // 출석 종료 상태 변경
  };

  const links = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: '대시보드' },
    { path: '/check', label: '출석 체크 페이지' },
    { path: '/sheet', label: '출결 현황' },
  ];

  if (!classData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-layout">
      <Sidebar role={role} links={links} />
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
                row={classData.desk_rows}
                column={classData.desk_columns}
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
              <Desk
                row={classData.desk_rows}
                column={classData.desk_columns}
              ></Desk>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
