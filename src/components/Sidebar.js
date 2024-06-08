import React from 'react';
import { Link } from 'react-router-dom';
import 'css/SideBarComponent.css';

/**
 * 사이드바 공통 컴포넌트
 * @returns {JSX.Element} 사이드바 영역
 * @constructor
 *
 * 사용자(User)의 역할(Role)에 따라 사이드바 메뉴가 다르게 보여진다.
 * DB의 경우 User 테이블의 역할(role) 컬럼에 따라 사용자의 역할을 구분한다.
 *
 * Home은 개발자 모드에서만 보여진다.
 * 로그아웃은 공통으로 들어간다.
 *
 * 예시) 교수(Professor)의 경우
 * - 새로운 수업 생성
 * - 출석 체크 페이지
 * - 출석 대시보드
 *
 * 예시) 학생(Student)의 경우
 * - 출석 체크 페이지
 * - 출석 대시보드
 */
const Sidebar = ({ role }) => {
  const professorLinks = (
    <nav>
      <ul>
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <Link to={'/dashboard'}>대시보드</Link>
        </li>
        <li>
          <Link to={'/check'}>교수용 출석 체크 페이지</Link>
        </li>
        <li>
          <Link to={'/sheet'}>교수용 출석 대시보드</Link>
        </li>
      </ul>
    </nav>
  );

  const studentLinks = (
    <nav>
      <ul>
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <Link to={'/dashboard'}>대시보드</Link>
        </li>
        <li>
          <Link to={'/check'}>학생용 출석 체크 페이지</Link>
        </li>
        <li>
          <Link to={'/sheet'}>학생용 출석 대시보드</Link>
        </li>
      </ul>
    </nav>
  );

  return (
    <div id="sidebar">
      {role === 'Teacher' ? professorLinks : studentLinks}
      <div id="logout">
        <button onClick={() => alert('로그아웃 버튼 클릭됨')}>로그아웃</button>
      </div>
    </div>
  );
};

export default Sidebar;
