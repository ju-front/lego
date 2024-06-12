import React from 'react';
import { Sidebar } from 'components/Sidebar';
import { HeaderNav } from 'components/HeaderNav';
import { AttendanceTable } from 'components/AttendanceTable';
import 'css/styles.css';

/**
 * @returns {JSX.Element} 출석 대시보드 페이지
 * @constructor
 */

export const SheetPage = ({ role }) => {
  /* 예시로 Teacher로 설정(설정은 router), 실제로는 사용자 정보를 기반으로 설정
   * user.role에 따라 Sidebar의 메뉴가 다르게 보여진다.
   * role은 Teacher, Student 두 가지로 구분한다.
   *
   * 출석 대시보드 페이지는 role에 따라 UI가 다르게 보여진다.
   */

  const links = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: '대시보드' },
    { path: '/check', label: '출석 체크 페이지' },
    { path: '/sheet', label: '출결 현황' },
  ];

  const title =
    role === 'Teacher' ? '교수용 출석 대시보드' : '학생용 출석 대시보드';

  return (
    <div className="main-layout">
      <Sidebar role={role} links={links} />
      <div className="main-content-container">
        <HeaderNav title={title} />
        <div className="main-content" style={{ backgroundColor: 'pink' }}>
          {role === 'Teacher' ? (
            <div>
              <h1>교수용 출석 대시보드</h1>
              {/* 교수용 대시보드 관련 콘텐츠 */}
              <AttendanceTable classId={1} />
            </div>
          ) : (
            <div>
              <h1>학생용 출석 대시보드</h1>
              {/* 학생용 대시보드 관련 콘텐츠 */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
