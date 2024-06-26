import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Sidebar } from 'components/Sidebar';
import { HeaderNav } from 'components/HeaderNav';
import { Button } from 'components/Button';
import { Timer } from 'components/Timer';
import { Desk } from 'components/Desk';
import { Modal } from 'components/Modal';
import 'css/styles.css';
import 'css/Timer.css';

/**
 * @returns {JSX.Element} 출석 체크 페이지
 * @constructor
 */

export const CheckPage = () => {
  const title = '출석 체크 페이지';
  const { class_id } = useParams();
  const [classData, setClassData] = useState(null); // 수업 정보를 받아올 상태
  const [userData, setUserData] = useState(null); // 사용자 정보를 받아올 상태
  const [isAttendanceStarted, setIsAttendanceStarted] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [showAlreadyCheckedModal, setShowAlreadyCheckedModal] = useState(false);
  const [showConfirmStopModal, setShowConfirmStopModal] = useState(false); // 출석 종료 확인 모달
  const apiUrl = process.env.REACT_APP_API_URL;

  // 수업방 상세 조회
  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          throw new Error('Access token not found');
        }

        const response = await fetch(`${apiUrl}/api/classes/${class_id}`, {
          method: 'GET',
          headers: {
            access: accessToken,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch class data');
        }

        const data = await response.json();
        setClassData({
          classId: data.classId,
          className: data.className,
          teacherName: data.teacherName,
          lateTimeLimit: data.lateTimeLimit,
          deskRows: data.deskRows,
          deskColumns: data.deskColumns,
        });
      } catch (error) {
        console.error('Failed to load class data', error);
      }
    };

    fetchClassData();
  }, [class_id, apiUrl]);

  // 유저 정보 로드 -> 프로필에 사용
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          throw new Error('Access token not found');
        }

        const response = await fetch(`${apiUrl}/api/user`, {
          method: 'GET',
          headers: {
            access: accessToken,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Failed to load user data', error);
      }
    };

    fetchUserData();
  }, [apiUrl]);

  // 자리 배치 정보 로드
  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          throw new Error('Access token not found');
        }

        const response = await fetch(
          `${apiUrl}/api/classes/${class_id}/attendance/student`,
          {
            method: 'GET',
            headers: {
              access: accessToken,
            },
          },
        );

        if (!response.ok) {
          throw new Error('Failed to fetch desk data');
        }

        const data = await response.json();
        setAttendanceRecords(data.attendanceRecords);
        setIsAttendanceStarted(data.isAttendanceStarted);
      } catch (error) {
        console.error('Failed to load desk data', error);
      }
    };

    // 1초마다 서버에서 자리 배치도를 받아옴
    fetchAttendanceRecords();
    const intervalId = setInterval(fetchAttendanceRecords, 1000);

    return () => clearInterval(intervalId);
  }, [class_id, apiUrl]);

  // 출석 시작 버튼 눌렀을 때
  const handleStartClick = async () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token not found');
    }

    try {
      // 가장 최근의 출석 날짜 확인
      const response = await fetch(
        `${apiUrl}/api/classes/${class_id}/attendance`,
        {
          method: 'GET',
          headers: {
            access: accessToken,
          },
        },
      );

      if (!response.ok) {
        // 처음 출석을 시작할 때 404 에러 무시
        if (response.status === 404) {
          const startResponse = await fetch(
            `${apiUrl}/api/classes/${class_id}/attendance/start`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                access: accessToken,
              },
              body: JSON.stringify({ lateTimeLimit: classData.lateTimeLimit }),
            },
          );

          if (!startResponse.ok) {
            const errorData = await startResponse.json();
            throw new Error(errorData.message);
          }
          const startData = await startResponse.json();
          console.log(startData.message);
          setIsAttendanceStarted(true);
          return;
        }
      }

      const data = await response.json();

      if (data.attendanceRecords.length > 0) {
        const recentDate = data.attendanceRecords
          .flatMap(record => record.attendanceRecords)
          .map(attendance => new Date(attendance.attendanceDate))
          .sort((a, b) => b - a)[0];

        // 한국 시간으로 변환
        const recentDateKST = new Date(
          recentDate.getTime() + 9 * 60 * 60 * 1000,
        );
        const recentDateKSTFormatted = recentDateKST
          .toISOString()
          .split('T')[0];

        const koreaTime = new Date(new Date().getTime() + 9 * 60 * 60 * 1000);
        const today = koreaTime.toISOString().split('T')[0];
        // 오늘 출석을 했으면 출석 체크 불가
        if (recentDateKSTFormatted && recentDateKSTFormatted === today) {
          setShowAlreadyCheckedModal(true);
          return;
        }
      }

      // 첫 번째 출석 시작이거나 하루가 지난 경우
      const startResponse = await fetch(
        `${apiUrl}/api/classes/${class_id}/attendance/start`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            access: accessToken,
          },
          body: JSON.stringify({ lateTimeLimit: classData.lateTimeLimit }),
        },
      );

      if (!startResponse.ok) {
        const errorData = await startResponse.json();
        throw new Error(errorData.message);
      }
      const startData = await startResponse.json();
      console.log(startData.message);
      setIsAttendanceStarted(true);
    } catch (error) {}
  };

  const handleStop = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await fetch(
        `${apiUrl}/api/classes/${class_id}/attendance/stop`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            access: accessToken,
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      console.log(data.message);
      setIsAttendanceStarted(false);
    } catch (error) {
      console.error('Failed to stop attendance check', error);
    }
  };

  const handleStopClick = () => {
    setShowConfirmStopModal(true);
  };

  const handleConfirmStop = () => {
    handleStop();
    setShowConfirmStopModal(false);
  };

  const handleTimerComplete = () => {
    setIsAttendanceStarted(false);
    handleStop();
  };

  const links = [
    { path: '/dashboard', label: '대시보드' },
    { path: '/check', label: '출석 체크 페이지' },
    { path: '/sheet', label: '출결 현황' },
  ];

  if (!classData || !userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-layout">
      <Sidebar links={links} userData={userData} classId={class_id} />
      <div className="main-content-container">
        <HeaderNav title={title} nameClass={`- ${classData.className}`} />
        <div className="main-content">
          {userData.role === '선생' ? (
            <div>
              <div className="timer-wrapper">
                <div className="timer-container">
                  <Timer
                    initialTime={classData.lateTimeLimit * 60}
                    onComplete={handleTimerComplete}
                    isAttendanceStarted={isAttendanceStarted}
                    classId={class_id}
                  />
                </div>
              </div>
              <Desk
                row={classData.deskRows}
                column={classData.deskColumns}
                isAttendanceStarted={isAttendanceStarted}
                classId={class_id}
                attendanceRecords={attendanceRecords}
                currentUser={userData}
              ></Desk>
              <div className="attendance-buttons">
                {isAttendanceStarted ? (
                  <Button
                    label="출석 종료"
                    color="#ff6347"
                    onClick={handleStopClick}
                  />
                ) : (
                  <Button
                    label="출석 시작"
                    color="#87ceeb"
                    onClick={handleStartClick}
                  />
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="timer-wrapper">
                <div className="timer-container">
                  <Timer
                    initialTime={classData.lateTimeLimit * 60}
                    onComplete={handleTimerComplete}
                    isAttendanceStarted={isAttendanceStarted}
                    classId={class_id}
                  />
                </div>
              </div>
              <Desk
                row={classData.deskRows}
                column={classData.deskColumns}
                isAttendanceStarted={isAttendanceStarted}
                classId={class_id}
                attendanceRecords={attendanceRecords}
                currentUser={userData}
              ></Desk>
            </div>
          )}
        </div>
        {/* 출석 완료 모달 */}
        <Modal
          isOpen={showAlreadyCheckedModal}
          onClose={() => setShowAlreadyCheckedModal(false)}
        >
          <p>오늘의 출석 체크는 완료되었습니다.</p>
          <div className="modal-buttons">
            <Button
              className="status-modal-button"
              label="확인"
              onClick={() => setShowAlreadyCheckedModal(false)}
              color="#007bff"
            />
          </div>
        </Modal>
        {/* 출석 종료 확인 모달 */}
        <Modal
          isOpen={showConfirmStopModal}
          onClose={() => setShowConfirmStopModal(false)}
        >
          <p>출석을 종료하시겠습니까? (출석은 하루에 한번만 가능합니다.)</p>
          <div className="modal-buttons">
            <Button
              className="status-modal-button"
              label="확인"
              onClick={handleConfirmStop}
              color="#007bff"
            />
            <Button
              className="status-modal-button"
              label="취소"
              onClick={() => setShowConfirmStopModal(false)}
              color="#ff6347"
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};
