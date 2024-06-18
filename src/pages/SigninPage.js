import React, { useState } from 'react';
import { SigninEmail1 } from 'ezy-ui';
import 'ezy-ui/dist/sign/SignEmail1.css';
import '../css/SignPage.css';

import { useNavigate } from 'react-router-dom';

export const SigninPage = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleOnSubmit = async (email, password) => {
    try {
      const response = await fetch(`${apiUrl}/login`, {
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
        setLoginError(data.message || '이메일 또는 비밀번호를 확인해주세요.');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      setLoginError(
        error.message ||
          '일시적인 오류로 로그인을 할 수 없습니다. 잠시 후 다시 이용해 주세요.',
      );
    }
  };

  const handleSignUpClick = () => {
    navigate('/signup'); // 회원가입 페이지 경로로 이동
  };

  return (
    <div className="page-container">
      <div className="custom-signin">
        <SigninEmail1 onConfirm={handleOnSubmit} />
        {loginError && <div className="login-error">{loginError}</div>}
        <div className="signup-link" onClick={handleSignUpClick}>
          Sign Up
        </div>
      </div>
    </div>
  );
};
