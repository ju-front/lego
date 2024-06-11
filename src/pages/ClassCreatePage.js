import React from 'react';
import { Sidebar } from 'components/Sidebar';
import { HeaderNav } from 'components/HeaderNav';
import 'css/styles.css';

/**
 * @returns {JSX.Element} 출석체크 방 생성 페이지 페이지
 * @constructor
 */

export const ClassCreatePage = () => {
  /* 예시로 Teacher로 설정, 실제로는 사용자 정보를 기반으로 설정
   * user.role에 따라 Sidebar의 메뉴가 다르게 보여진다.
   * role은 Teacher, Student 두 가지로 구분한다.
   *
   * 출석 체크 방 생성페이지는 교수(Teacher)만 접근 가능하다.
   * -> role이 Teacher인 경우에만 접근 가능하도록 설정
   * 따라서 Props를 받지 않고, 고정된 role로 설정한다.
   */
  const user = {
    role: 'Teacher',
  };

  const title = '새로운 수업 생성';

  return (
    <div className="main-layout">
      <Sidebar role={user.role} links={[]} />
      <div className="main-content-container">
        <HeaderNav title={title} />
        <div className="main-content" style={{ backgroundColor: 'yellow' }}>
          {/* 페이지 콘텐츠 */}
          <h1>출석체크 방 생성 페이지</h1>
        </div>
      </div>
    </div>
  );
};
