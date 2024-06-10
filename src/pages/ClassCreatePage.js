import React, { useState } from 'react';
import { Sidebar } from 'components/Sidebar';
import { HeaderNav } from 'components/HeaderNav';
import { Button } from 'components/Button';
import { PathButton } from 'components/PathButton';
import { Input } from 'components/Input';
import { Option, Select } from 'components/OptionSelect';
import 'css/styles.css';

export const ClassCreatePage = () => {
  const user = {
    role: 'Teacher',
  };

  const title = '새로운 수업 생성';

  const [className, setClassName] = useState('');
  const [lateTime, setLateTime] = useState('');
  const [deskRows, setDeskRows] = useState('');
  const [deskCols, setDeskCols] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedStudentsList, setSelectedStudentsList] = useState([]);

  const handleAddStudent = () => {
    if (selectedStudent && !selectedStudentsList.includes(selectedStudent)) {
      setSelectedStudentsList([...selectedStudentsList, selectedStudent]);
      console.log(selectedStudentsList);
    }
  };

  return (
    <div className="main-layout">
      <Sidebar role={user.role} />
      <div className="main-content-container">
        <HeaderNav title={title} />
        <h1 style={{ backgroundColor: 'pink' }}>출석체크 방 생성 페이지</h1>
        <div className="main-content">
          <div className="form-container">
            <div className="form-section" style={{ backgroundColor: 'pink' }}>
              <div>
                수업 이름
                <Input
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                />
              </div>
              <div>
                지각 처리 시간
                <Select
                  value={lateTime}
                  onChange={(e) => setLateTime(e.target.value)}
                  className="custom-select"
                >
                  <Option value="0" label="n분" />
                  <Option value="5" label="5분" />
                  <Option value="10" label="10분" />
                  <Option value="15" label="15분" />
                  <Option value="20" label="20분" />
                </Select>
              </div>
              <div>
                행, 열 토글
                <Select
                  value={deskRows}
                  onChange={(e) => setDeskRows(e.target.value)}
                  className="custom-select"
                >
                  <Option value="" label="행" />
                  <Option value="1" label="1행" />
                  <Option value="2" label="2행" />
                  <Option value="3" label="3행" />
                  <Option value="4" label="4행" />
                </Select>
                <Select
                  value={deskCols}
                  onChange={(e) => setDeskCols(e.target.value)}
                  className="custom-select"
                >
                  <Option value="" label="열" />
                  <Option value="1" label="1열" />
                  <Option value="2" label="2열" />
                  <Option value="3" label="3열" />
                  <Option value="4" label="4열" />
                </Select>
              </div>
              <div>
                학생 선택 토글
                <Select
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  className="custom-select"
                >
                  <Option value="" label="학생선택" />
                  <Option value="김민수 깃 아이디" label="김민수" />
                  <Option value="김동욱 깃 아이디" label="김동욱" />
                  <Option value="박지선 깃 아이디" label="박지선" />
                  <Option value="장욱 깃 아이디" label="장욱" />
                </Select>
                <button onClick={handleAddStudent}>추가</button>
              </div>
            </div>
            <div
              className="form-section"
              style={{ backgroundColor: 'lightblue' }}
            >
              <label>선택한 학생 리스트</label>
              <ul>
                {selectedStudentsList.map((student, index) => (
                  <li key={index}>{student}</li>
                ))}
              </ul>
              <PathButton
                label="수업 생성"
                path="/check"
                color="#1E85F1"
                className=""
                onClick
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
