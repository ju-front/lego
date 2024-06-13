import { SigninEmail1 } from 'ezy-ui';
import 'ezy-ui/dist/sign/SignEmail1.css';
import '../css/SignPage.css';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const SigninPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleOnSubmit = async (username, password) => {
    try {
      // 이전에 설정된 토큰 삭제
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      // access 토큰 가져오기
      const accessToken = response.headers.get('access');
      console.log('accessToken', accessToken);

      // 토큰 저장
      localStorage.setItem('access_token', accessToken);

      console.log('document cookie:', document.cookie);

      // refresh 토큰 가져오기
      const cookies = document.cookie.split(';');
      const refreshTokenCookie = cookies.find(cookie =>
        cookie.trim().startsWith('refresh='),
      );
      if (!refreshTokenCookie) {
        console.error('Failed to retrieve refresh token');
        throw new Error('Failed to retrieve refresh token');
      }
      const refreshToken = refreshTokenCookie.split('=')[1];
      console.log('refreshToken', refreshToken);

      // refresh 토큰 저장
      localStorage.setItem('refresh_token', refreshToken);
      document.cookie = `refresh=${refreshToken}; path=/;`;

      // 로그인 성공 시 대시보드 페이지로 이동
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
    }
  };

  return (
    <div className="page-container">
      <div className="custom-signin">
        <SigninEmail1 onConfirm={handleOnSubmit} />
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};
