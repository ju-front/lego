import React, { useEffect, useState } from 'react';
import { Sidebar } from 'components/Sidebar';
import { HeaderNav } from 'components/HeaderNav';
import { Card } from 'components/Card';
import { PathButton } from 'components/PathButton';
import 'css/styles.css';

/**
 * @returns {JSX.Element} 대시보드
 * @constructor
 * 출석 체크를 하는 수업들의 목록을 보여주는 페이지
 */

export const DashboardPage = () => {
  /*
   * 대시보드는 어떤 role이든 공통 컴포넌트 UI가 통일된다.
   */
  const title = '대시보드';
  const [classes, setClasses] = useState([]); // 수업 목록을 받아올 상태
  const [userData, setUserData] = useState({}); // 사용자 정보를 받아올 상태
  const apiUrl = process.env.REACT_APP_API_URL;
  const links = [{ path: '/dashboard', label: '대시보드' }];

  // 서버와 연동
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

  // 수업 목록 가져오기
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          throw new Error('No access token found');
        }

        const response = await fetch(`${apiUrl}/api/classes`, {
          method: 'GET',
          headers: {
            access: accessToken,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch classes');
        }

        const data = await response.json();
        setClasses(data.classes);
      } catch (error) {
        console.error('Failed to load classes from API', error);
      }
    };

    fetchClasses();
  }, [userData.user_id, apiUrl]);

  return (
    <div className="main-layout">
      <Sidebar links={links} userData={userData} />
      <div className="main-content-container">
        <HeaderNav title={title} />
        <div className="main-content">
          {/* 대시보드 관련 콘텐츠 */}
          <div className="card-container">
            {classes.map(classItem => (
              <Card
                key={classItem.classId}
                title={classItem.className}
                color={classItem.classColor}
                path={`/check/${classItem.classId}`}
              />
            ))}
          </div>
          {userData.role === '선생' && (
            <PathButton
              label="+"
              path="/class-create"
              color="#6DAEDD"
              className="add-button"
            />
          )}
        </div>
      </div>
    </div>
  );
};
