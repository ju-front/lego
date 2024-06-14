import React from 'react';
import { SigninEmail1 } from 'ezy-ui';
import 'ezy-ui/dist/sign/SignEmail1.css';
import '../css/SignPage.css';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const SigninPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleOnSubmit = (email, password) => {
    console.log(email, password);
    navigate('/dashboard');
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
