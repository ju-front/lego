import { SignupEmail1 } from 'ezy-ui';
import 'ezy-ui/dist/sign/SignEmail1.css';
import '../css/SignPage.css';

import { useNavigate } from 'react-router-dom';

export const SignupPage = () => {
  const navigate = useNavigate();

  /**
   * 회원가입 요청을 서버에 보내고 응답을 처리하는 함수
   *
   * @param {string} email - 사용자가 입력한 이메일 주소
   * @param {string} password - 사용자가 입력한 비밀번호
   * @param {string} role - 사용자의 역할 ("선생" 또는 "학생")
   * @param {string} name - 사용자의 실제 이름
   */
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleOnSubmit = async (email, password, additionalData) => {
    try {
      const response = await fetch(`${apiUrl}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
          role: additionalData.role,
          name: additionalData.name,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        navigate('/');
        return;
      }

      switch (response.status) {
        case 409:
          console.error('Signup failed:', data.message);
          throw new Error('Username already exists');
        case 422:
          console.error('Signup failed:', data.message);
          throw new Error('Invalid user data provided');
        default:
          console.error('Unexpected error:', data.message);
          throw new Error('Unexpected error occurred during signup');
      }
    } catch (error) {
      console.error('Signup failed:', error.message);
      throw error;
    }
  };

  /**
   * 서버에 이메일 중복 검사를 요청하는 함수
   *
   * @param {string} email - 중복 검사를 요청할 이메일 주소
   * @returns {Promise<boolean>} 중복된 이메일인 경우 true, 그렇지 않은 경우 false를 반환
   */
  const handleOnCheck = async email => {
    try {
      const response = await fetch(`${apiUrl}/join/check-username`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        return data.isDuplicated;
      } else {
        switch (response.status) {
          case 400:
            console.error('Error: ', data.message);
            throw new Error('Username is required');
          case 409:
            console.error('Error: Username is already taken.');
            return true;
          default:
            console.error('Unexpected error:', data.message);
            throw new Error('Unexpected error occurred');
        }
      }
    } catch (error) {
      console.error('Error checking email duplication:', error.message);
      throw error;
    }
  };

  const validateName = name => {
    if (name.length >= 2) {
      return { isValid: true };
    } else {
      return { isValid: false, msg: '2자 이상 입력해주세요.' };
    }
  };

  const validateRole = role => {
    const validRoles = ['선생', '학생'];
    if (validRoles.includes(role.toLowerCase())) {
      return { isValid: true };
    } else {
      return {
        isValid: false,
        msg: '"선생" 또는 "학생"을 입력해주세요.',
      };
    }
  };

  const additionalFields = [
    {
      name: 'role',
      label: 'Role',
      type: 'text',
      validate: validateRole,
    },
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      validate: validateName,
    },
  ];

  return (
    <div className="page-container">
      <div className="custom-signin">
        <SignupEmail1
          onConfirm={handleOnSubmit}
          onCheckDuplicate={handleOnCheck}
          additionalFields={additionalFields}
        />
      </div>
    </div>
  );
};
