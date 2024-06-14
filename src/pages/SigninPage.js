import React from 'react';
import { SigninEmail1 } from 'ezy-ui';
import 'ezy-ui/dist/sign/SignEmail1.css';
import '../css/SignPage.css';

import { useNavigate } from 'react-router-dom';

export const SigninPage = () => {
  const navigate = useNavigate();

  const handleOnSubmit = async (email, password) => {
    // // 서버 연동 이전 임시 코드
    // navigate('/dashboard');

    // 서버 연동 완료 시 해당 주석 해제
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password: password }),
      });
      const data = await response.json();
      if (response.ok) {
        const accessToken = response.headers.get('access');
        localStorage.setItem('access_token', accessToken);
        navigate('/dashboard');
        console.log(data.message);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className="page-container">
      <div className="custom-signin">
        <SigninEmail1 onConfirm={handleOnSubmit} />
      </div>
    </div>
  );
};