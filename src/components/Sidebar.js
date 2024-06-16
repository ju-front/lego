import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'css/SideBarComponent.css';

/**
 * 사이드바 공통 컴포넌트
 * @param {array} links - 사이드바에 표시할 링크 목록
 * @param {object} userData - 사용자 정보
 * @returns {JSX.Element} 사이드바 영역
 * @constructor
 *
 * DB의 경우 User 테이블의 역할(role) 컬럼에 따라 사용자의 역할을 구분한다.
 *
 * 링크 목록은 페이지에 따라 다르게 보여진다.
 * 로그아웃은 공통으로 들어간다.
 *
 * - 프로필
 * - 대시보드
 * - 출석 체크 페이지
 * - 출결 현황
 */
export const Sidebar = ({ links, userData, classId }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/');
  };

  const displayRole = userData.role === '선생' ? '선생님' : userData.role;

  return (
    <div id="sidebar">
      {userData && userData.name && (
        <div className="profile">
          <div className="profile-circle">{userData.name.charAt(0)}</div>
          <div className="profile-username">{userData.name}</div>
          <div className="profile-role">{displayRole}</div>
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
