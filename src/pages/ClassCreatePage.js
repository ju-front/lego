import React, { useState, useEffect } from 'react';
import { Sidebar } from 'components/Sidebar';
import { HeaderNav } from 'components/HeaderNav';
//import { Button } from 'components/Button';
// import { PathButton } from 'components/PathButton';
import { Input } from 'components/Input';
import { Option, Select } from 'components/OptionSelect';
import 'css/styles.css';
import { useNavigate } from 'react-router-dom';

export const ClassCreatePage = () => {
  /* role은 선생, 학생 두 가지로 구분한다.
   *
   * 출석 체크 방 생성페이지는 교수(선생)만 접근 가능하다.
   * -> role이 선생 경우에만 접근 가능하도록 설정
   */

  const title = '새로운 수업 생성';
  const links = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: '대시보드' },
  ];

  const [className, setClassName] = useState('');
  const [lateTime, setLateTime] = useState('');
  const [deskRows, setDeskRows] = useState('');
  const [deskCols, setDeskCols] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedStudentsList, setSelectedStudentsList] = useState([]);
  const [students, setStudents] = useState([]);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  // 유저 정보 로드 -> 프로필에 사용
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          throw new Error('Access token not found');
        }

        const response = await fetch('http://localhost:8080/api/user', {
          method: 'GET',
          headers: {
            access: accessToken,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Failed to load user data', error);
      }
    };

    fetchUserData();
  }, []);

  // 학생 목록 로드
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          throw new Error('Access token not found');
        }

        const response = await fetch(
          'http://localhost:8080/api/user/students',
          {
            method: 'GET',
            headers: {
              access: accessToken,
            },
          },
        );

        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }

        const data = await response.json();

        if (Array.isArray(data.students)) {
          setStudents(data.students);
        } else {
          setStudents([]);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
        setStudents([]); // 에러 발생 시 빈 배열로 설정
      }
    };

    fetchStudents();
  }, []);

  // 랜덤 색상 생성
  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleAddStudent = () => {
    const student = students.find(s => s.userId === parseInt(selectedStudent));
    if (
      student &&
      !selectedStudentsList.some(s => s.userId === student.userId)
    ) {
      setSelectedStudentsList([...selectedStudentsList, student]);
      setSelectedStudent(''); // 학생 선택 초기화
    }
  };

  const handleCreateClass = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await fetch('http://localhost:8080/api/classes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          access: accessToken,
        },
        body: JSON.stringify({
          className,
          lateTimeLimit: parseInt(lateTime),
          deskRows: parseInt(deskRows),
          deskColumns: parseInt(deskCols),
          studentIds: selectedStudentsList.map(student => student.userId),
          classColor: generateRandomColor(),
        }),
      });

      const data = await response.json();
      console.log(data);
      if (response.status === 201) {
        navigate(`/check/${data.classId}`);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error creating class:', error);
    }
  };

  return (
    <div className="main-layout">
      <Sidebar links={links} userData={userData} />
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
                  onChange={e => setClassName(e.target.value)}
                />
              </div>
              <div>
                지각 처리 시간
                <Select
                  value={lateTime}
                  onChange={e => setLateTime(e.target.value)}
                  className="custom-select"
                >
                  <Option value="" label="시간 선택" />
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
                  onChange={e => setDeskRows(e.target.value)}
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
                  onChange={e => setDeskCols(e.target.value)}
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
                  onChange={e => setSelectedStudent(e.target.value)}
                  className="custom-select"
                >
                  <Option value="" label="학생 선택" />
                  {students.map(student => (
                    <Option
                      key={student.userId}
                      value={student.userId}
                      label={student.name}
                    />
                  ))}
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
                  <li key={index}>{student.name}</li>
                ))}
              </ul>
              <button onClick={handleCreateClass}>수업 생성</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
