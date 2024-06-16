import React from 'react';
import 'css/HeaderNavComponent.css';

/**
 * 상단바 공통 컴포넌트
 * @returns {JSX.Element} 상단바 영역
 * @constructor
 *
 * 사용자(User)의 역할(Role)이 달라도 동일한 상단바가 나온다.
 * 상단바에는 현제 페이지의 제목이 나온다.
 * title은 페이지의 제목이다.
 */
export const HeaderNav = ({ title, nameClass }) => {
  return (
    <div id="headerNav">
      <h3>
        {title} {nameClass}
      </h3>
    </div>
  );
};
