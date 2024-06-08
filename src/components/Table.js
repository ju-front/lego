import React from 'react';
import { StatusButton } from './StatusButton';

export const Table = ({ users, classes, attendance }) => {
  // 모든 고유 날짜 추출
  const dates = [...new Set(attendance.map(record => record.date))].sort();

  return (
    <table>
      <thead>
        <tr>
          <th>학생 이름</th>
          {dates.map(date => (
            <th key={date}>{date}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {users
          .filter(user => user.role === 'Student')
          .map(student => (
            <tr key={student.user_id}>
              <td>{student.name}</td>
              {dates.map(date => (
                <td key={date}>
                  <StatusButton
                    record={attendance.find(
                      record =>
                        record.class_id === classes[0].class_id &&
                        record.student_id === student.user_id &&
                        record.date === date,
                    )}
                  />
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};
