import React from 'react';
import Sidebar from 'components/Sidebar';
import HeaderNav from 'components/HeaderNav';

/**
 * @returns {JSX.Element} 출석 페이지 대시보드
 * @constructor
 * 출석 체크를 하는 수업들의 목록을 보여주는 페이지
 */

const AttendanceListPage = ({ role }) => {
  /*
   * 출석 페이지 대시보드는 어떤 role이든 공통 컴포넌트 UI가 통일된다.
   */
  const title = '출석 페이지 대시보드';

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar role={role} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <HeaderNav title={title} />
        <div style={{ flex: 1, backgroundColor: 'brown' }}>
          <h1>출석 페이지 대시보드</h1>
          {/* 출석 페이지 대시보드 관련 콘텐츠 */}
        </div>
      </div>
    </div>
  );
};

export default AttendanceListPage;
