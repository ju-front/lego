import React from 'react';
import Sidebar from 'components/Sidebar';
import HeaderNav from 'components/HeaderNav';

/**
 * @returns {JSX.Element} 출석 체크 페이지
 * @constructor
 */

const AttendanceCheckPage = ({ role }) => {
  /* 예시로 Teacher로 설정(설정은 router), 실제로는 사용자 정보를 기반으로 설정
   * user.role에 따라 Sidebar의 메뉴가 다르게 보여진다.
   * role은 Teacher, Student 두 가지로 구분한다.
   *
   * 출석 체크 방 생성페이지는 role에 따라 UI가 다르게 보여진다.
   */
  const title =
    role === 'Teacher' ? '교수용 출석 체크 페이지' : '학생용 출석 체크 페이지';

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar role={role} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <HeaderNav title={title} />
        <div style={{ flex: 1, backgroundColor: 'green' }}>
          {role === 'Teacher' ? (
            <div>
              <h1>교수용 출석 체크 페이지</h1>
              {/* 교수용 출석 체크 관련 콘텐츠 */}
            </div>
          ) : (
            <div>
              <h1>학생용 출석 체크 페이지</h1>
              {/* 학생용 출석 체크 관련 콘텐츠 */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceCheckPage;
