import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Sidebar } from 'components/Sidebar';
import { HeaderNav } from 'components/HeaderNav';
import { AttendanceTable } from 'components/AttendanceTable';
import 'css/styles.css';

/**
 * @returns {JSX.Element} 출석 대시보드 페이지
 * @constructor
 */

export const SheetPage = () => {
  const { class_id } = useParams();
  const [userData, setUserData] = useState({});
  const [classData, setClassData] = useState(null); // 수업 정보를 받아올 상태

  const links = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: '대시보드' },
    { path: '/check', label: '출석 체크 페이지' },
    { path: '/sheet', label: '출결 현황' },
  ];

  // 유저 정보 로드 -> 프로필에 사용
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          throw new Error('Access token not found');
        }

        const response = await fetch('http://localhost:8080/api/user', {
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
  }, []);

  // 수업 정보 로드
  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          throw new Error('Access token not found');
        }

        const response = await fetch(
          `http://localhost:8080/api/classes/${class_id}`,
          {
            method: 'GET',
            headers: {
              access: accessToken,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch class data');
        }

        const data = await response.json();
        setClassData(data);
      } catch (error) {
        console.error('Failed to load class data', error);
      }
    };

    fetchClassData();
  }, [class_id]);

  if (!userData || !classData) {
    return <div>Loading...</div>;
  }

  const title =
    userData.role === '선생' ? '교수용 출석 대시보드' : '학생용 출석 대시보드';

  return (
    <div className="main-layout">
      <Sidebar links={links} userData={userData} classId={class_id} />
      <div className="main-content-container">
        <HeaderNav title={title} nameClass={`- ${classData.className}`} />
        <div className="main-content">
          {userData.role === '선생' ? (
            <div>
              <h1>교수용 출석 대시보드</h1>
              {/* 교수용 대시보드 관련 콘텐츠 */}
              <AttendanceTable classId={class_id} role={userData.role} />
            </div>
          ) : (
            <div>
              <h1>학생용 출석 대시보드</h1>
              {/* 학생용 대시보드 관련 콘텐츠 */}
              <AttendanceTable
                classId={class_id}
                role={userData.role}
                userId={userData.userId}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
