import React from 'react';
import 'css/Desk.css';
import { Button } from './Button';

/**
 * 책상 컴포넌트
 * @param {number} row - 책상의 행
 * @param {number} column - 책상의 열
 * @returns {JSX.Element} 책상 컴포넌트
 */
export const Desk = ({ row, column }) => {
  const deskGrid = Array(row)
    .fill()
    .map(() => Array(column).fill());

  function handleCellClick(rowIndex, columnIndex) {
    console.log(`row ${rowIndex + 1}, column ${columnIndex + 1} clicked.`);
  }
  return (
    <div className="desk-grid">
      <div>
        행{row} * 열{column} 배치
      </div>
      {deskGrid.map((deskRow, rowIndex) => (
        <div key={rowIndex} className="desk-row">
          {deskRow.map((_, columnIndex) => (
            <div key={columnIndex}>
              <Button
                className="desk-cell"
                label={`${rowIndex + 1},${columnIndex + 1}`}
                color="#b1cde9"
                onClick={() => handleCellClick(rowIndex, columnIndex)}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
