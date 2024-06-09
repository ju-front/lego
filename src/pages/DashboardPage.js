import React from 'react';
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
          {role === 'Teacher' ? (
            <div>
              <h1>교수용 대시보드</h1>
              <div className="card-container">
                <Card title="SPA개발방법론" color="skyblue" path="/check" />
                <Card title="통계학 및 실습" color="lightgreen" path="/check" />
                <Card title="머신러닝" color="lightcoral" path="/check" />
              </div>
              <PathButton
                label="+"
                path="/class-create"
                color="#6DAEDD"
                className="add-button"
              />
              {/* 교수용 대시보드 관련 콘텐츠 */}
            </div>
          ) : (
            <div>
              <h1>학생용 대시보드</h1>
              <div className="card-container">
                <Card title="SPA개발방법론" color="skyblue" path="/check" />
                <Card title="통계학 및 실습" color="lightgreen" path="/check" />
                <Card title="머신러닝" color="lightcoral" path="/check" />
              </div>
            </div>
          )}
          {/* 출석 페이지 대시보드 관련 콘텐츠 */}
        </div>
      </div>
    </div>
  );
};
