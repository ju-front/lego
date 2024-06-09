import React from 'react';
import '../css/Table.css';

/**
 * 범용 테이블 컴포넌트로, 다양한 데이터와 구성 가능한 열로 테이블을 렌더링합니다.
 *
 * @param {string} className - 테이블의 CSS 클래스명
 * @param {Array<Object>} colDefs - 열 정의를 나타내는 객체 배열. 각 객체는 열 헤더, 데이터 키, 선택적 렌더 함수를 포함:
 *   - {string} id - 각 열의 고유 식별자
 *   - {string} headerName - 테이블 헤더에 표시될 문자열
 *   - {string} field - 데이터 객체에서 해당 열의 값을 참조할 때 사용되는 키
 *   - {function} [render] - 선택적으로 제공할 수 있는 함수로, 열 데이터를 사용자 정의 방식으로 렌더링할 때 사용. (value, row) => JSX 형태의 함수.
 * @param {Array<Object>} data - 테이블에 표시될 객체 데이터 배열, 각 객체는 colDefs에 정의된 키를 포함.
 *
 * @returns {JSX.Element} 구성된 열과 데이터를 기반으로 한 테이블 요소.
 */
export const Table = ({ className, colDefs, data }) => {
  const tableClassName = `table-default ${className}`;

  return (
    <table className={tableClassName}>
      <thead>
        <tr>
          {colDefs.map(col => (
            <th key={col.id}>{col.headerName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {colDefs.map(col => (
              <td key={`${col.id}-${rowIndex}`}>
                {col.render ? col.render(row[col.field], row) : row[col.field]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
