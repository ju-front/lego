import React from 'react';
import Sidebar from 'components/Sidebar';
import HeaderNav from 'components/HeaderNav';
import 'css/styles.css';

/**
 * @returns {JSX.Element} 출석 페이지 대시보드
 * @constructor
 * 출석 체크를 하는 수업들의 목록을 보여주는 페이지
 */

export const DashboardPage = ({ role }) => {
  /*
   * 출석 페이지 대시보드는 어떤 role이든 공통 컴포넌트 UI가 통일된다.
   */
  const title = '출석 페이지 대시보드';

  return (
    <div className="main-layout">
      <Sidebar role={role} />
      <div className="main-content-container">
        <HeaderNav title={title} />
        <div className="main-content" style={{ backgroundColor: 'brown' }}>
          <h1>출석 페이지 대시보드</h1>
          {/* 출석 페이지 대시보드 관련 콘텐츠 */}
        </div>
      </div>
    </div>
  );
};
