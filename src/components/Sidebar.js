import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'css/SideBarComponent.css';

/**
 * 사이드바 공통 컴포넌트
 * @param {array} links - 사이드바에 표시할 링크 목록
 * @returns {JSX.Element} 사이드바 영역
 * @constructor
 *
 * DB의 경우 User 테이블의 역할(role) 컬럼에 따라 사용자의 역할을 구분한다.
 *
 * Home은 개발자 모드에서만 보여진다.
 * 링크 목록은 페이지에 따라 다르게 보여진다.
 * 로그아웃은 공통으로 들어간다.
 *
 * - 프로필
 * - 대시보드
 * - 출석 체크 페이지
 * - 출결 현황
 */
export const Sidebar = ({ links, classId }) => {
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const userId = 1; // 예시로 1로 설정
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/dummyData.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const user = data.user.find(user => user.user_id === userId);
        setUserData(user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [userId]);

  // 실제로는 서버에서 사용자 정보를 받아온다.
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`/api/user?user_id=${userId}`, {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  //         },
  //       });
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       const user = data.user; // 응답에서 사용자 데이터를 가져옵니다.
  //       setUserData(user);
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };

  //   fetchData();
  // }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/signin');
  };

  return (
    <div id="sidebar">
      {userData && (
        <div className="profile">
          <div className="profile-circle">{userData.name.charAt(0)}</div>
          <div className="profile-username">{userData.name}</div>
          <div className="profile-role">{userData.role}</div>
        </div>
      )}
      {links && (
        <nav>
          <ul>
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  to={
                    link.path.includes('/check') || link.path.includes('/sheet')
                      ? `${link.path}/${classId}`
                      : link.path
                  }
                  className={
                    location.pathname.includes(link.path) && link.path !== '/'
                      ? 'active'
                      : ''
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <div id="logout">
        <button onClick={handleLogout}>로그아웃</button>
      </div>
    </div>
  );
};
