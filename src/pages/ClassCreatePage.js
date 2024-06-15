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
  const title = '새로운 수업 생성';
  const links = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: '대시보드' },
  ];

  const [className, setClassName] = useState('');
  const [lateTime, setLateTime] = useState('');
  const [deskRows, setDeskRows] = useState('');
  const [deskCols, setDeskCols] = useState('');
  const [selectedStudentsList, setSelectedStudentsList] = useState([]);
  const [students, setStudents] = useState([]);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

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
          }
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
        setStudents([]);
      }
    };

    fetchStudents();
  }, []);

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleToggleStudent = (studentId) => {
    const student = students.find((s) => s.userId === studentId);
    if (student) {
      if (selectedStudentsList.some((s) => s.userId === student.userId)) {
        setSelectedStudentsList(
          selectedStudentsList.filter((s) => s.userId !== student.userId)
        );
      } else {
        setSelectedStudentsList([...selectedStudentsList, student]);
      }
    }
  };

  const handleRemoveStudent = (studentId) => {
    setSelectedStudentsList(
      selectedStudentsList.filter((s) => s.userId !== studentId)
    );
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
          studentIds: selectedStudentsList.map((student) => student.userId),
          classColor: generateRandomColor(),
        }),
      });

      const data = await response.json();
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
        <div className="main-content">
          <div className="form-container">
            <div className="form-section" style={{ backgroundColor: 'pink' }}>
              <div>
                새로 생성할 수업 이름
                <Input
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                />
              </div>
              <div>
                출석 인정 시간
                <Select
                  value={lateTime}
                  onChange={(e) => setLateTime(e.target.value)}
                  className="custom-select"
                >
                  <Option value="" label="몇 분 동안 출석을 진행할까요?" />
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
                  <Option value="" label="행 (세로줄)" />
                  {Array.from({ length: 40 }, (_, i) => (
                    <Option key={i + 1} value={i + 1} label={`${i + 1}행`} />
                  ))}
                </Select>
                <Select
                  value={deskCols}
                  onChange={(e) => setDeskCols(e.target.value)}
                  className="custom-select"
                >
                  <Option value="" label="열 (가로줄)" />
                  {Array.from({ length: 40 }, (_, i) => (
                    <Option key={i + 1} value={i + 1} label={`${i + 1}열`} />
                  ))}
                </Select>
              </div>
              <div>
                학생 선택
                {students.map((student) => (
                  <div key={student.userId}>
                    <input
                      type="checkbox"
                      checked={selectedStudentsList.some(
                        (s) => s.userId === student.userId
                      )}
                      onChange={() => handleToggleStudent(student.userId)}
                    />
                    {student.name}
                  </div>
                ))}
              </div>
            </div>
            <div
              className="form-section"
              style={{ backgroundColor: 'lightblue' }}
            >
              <label>선택한 학생 리스트</label>
              <ul>
                {selectedStudentsList.map((student) => (
                  <li key={student.userId}>
                    {student.name}
                    <button onClick={() => handleRemoveStudent(student.userId)}>
                      x
                    </button>
                  </li>
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
