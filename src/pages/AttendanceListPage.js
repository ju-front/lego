import React from 'react';
import Sidebar from 'components/Sidebar';
import HeaderNav from 'components/HeaderNav';
import { Card } from 'components/Card';
import { PathButton } from 'components/PathButton';

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
          {role === 'Teacher' ? (
            <div>
              <h1>교수용 대시보드</h1>
              <div className="card-container">
                <Card
                  title="SPA개발방법론"
                  color="skyblue"
                  path="/Attendance-Check"
                />
                <Card
                  title="통계학 및 실습"
                  color="lightgreen"
                  path="/Attendance-Check"
                />
                <Card
                  title="머신러닝"
                  color="lightcoral"
                  path="/Attendance-Check"
                />
              </div>
              <PathButton
                label="+"
                path="/Class-Create"
                color="#6DAEDD"
                className="add-button"
              />
              {/* 교수용 대시보드 관련 콘텐츠 */}
            </div>
          ) : (
            <div>
              <h1>학생용 대시보드</h1>
              <div className="card-container">
                <Card
                  title="SPA개발방법론"
                  color="skyblue"
                  path="/Attendance-Check"
                />
                <Card
                  title="통계학 및 실습"
                  color="lightgreen"
                  path="/Attendance-Check"
                />
                <Card
                  title="머신러닝"
                  color="lightcoral"
                  path="/Attendance-Check"
                />
              </div>
            </div>
          )}
          {/* 출석 페이지 대시보드 관련 콘텐츠 */}
        </div>
      </div>
    </div>
  );
};

export default AttendanceListPage;
