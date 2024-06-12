import React, { useEffect, useState } from 'react';
import { Sidebar } from 'components/Sidebar';
import { HeaderNav } from 'components/HeaderNav';
import { Card } from 'components/Card';
import { PathButton } from 'components/PathButton';
import 'css/styles.css';

/**
 * @returns {JSX.Element} 출석 페이지 대시보드
 * @constructor
 * 출석 체크를 하는 수업들의 목록을 보여주는 페이지
 */

export const DashboardPage = () => {
  /*
   * 출석 페이지 대시보드는 어떤 role이든 공통 컴포넌트 UI가 통일된다.
   */
  const title = '출석 페이지 대시보드';
  const [classes, setClasses] = useState([]); // 수업 목록을 받아올 상태
  const [userData, setUserData] = useState({}); // 사용자 정보를 받아올 상태
  const userId = 1; // 사용자 id

  const links = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: '대시보드' },
  ];

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/dummyData.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const user = data.user.find(user => user.user_id === userId);
        setUserData(user);
      } catch (error) {
        console.error('Failed to load user data from dummy data', error);
      }
    };

    fetchUserData();
  }, [userId]);

  // 수업 목록 가져오기
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch('/dummyData.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const filteredClasses = data.classes.filter(classItem =>
          classItem.user_ids.includes(userId),
        );
        setClasses(filteredClasses);
      } catch (error) {
        console.error('Failed to load classes from dummy data', error);
      }
    };

    fetchClasses();
  }, [userId]);
  // 실제로는 서버에서 사용자의 수업 목록을 받아온다.
  //     const response = await fetch('/api/classes', {
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       console.error('Failed to fetch classes', errorData.message);
  //       return;
  //     }

  //     const data = await response.json();
  //     setClasses(data.classes);
  //   };

  //   fetchClasses();
  // }, [userId]);

  return (
    <div className="main-layout">
      <Sidebar links={links} />
      <div className="main-content-container">
        <HeaderNav title={title} />
        <div className="main-content" style={{ backgroundColor: 'brown' }}>
          {/* 대시보드 관련 콘텐츠 */}
          <h1>
            {userData.role === 'Teacher'
              ? '교수용 대시보드'
              : '학생용 대시보드'}
          </h1>
          <div className="card-container">
            {classes.map(classItem => (
              <Card
                key={classItem.class_id}
                title={classItem.class_name}
                color="skyblue"
                path={`/check/${classItem.class_id}`}
              />
            ))}
          </div>
          {userData.role === 'Teacher' && (
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
