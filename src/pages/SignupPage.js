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
  const handleOnSubmit = async (email, password, role, name) => {
    // 임시 코드
    console.log('회원가입 성공', email, password);
    navigate('/signin');

    // const apiUrl = 'https://your-domain.com/join';
    // const requestData = {
    //   username: email,
    //   password: password,
    //   role: role,
    //   name: name,
    // };

    // const options = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(requestData),
    // };

    // try {
    //   const response = await fetch(apiUrl, options);
    //   const data = await response.json();

    //   if (!response.ok) {
    //     console.error('Signup failed:', data.message);
    //     throw new Error(data.message);
    //   }

    //   console.log(data.message);
    //   navigate('/signin');
    // } catch (error) {
    //   console.error('Error processing request:', error);
    // }
  };

  /**
   * 서버에 이메일 중복 검사를 요청하는 함수
   *
   * @param {string} email - 중복 검사를 요청할 이메일 주소
   * @returns {Promise<boolean>} 중복된 이메일인 경우 true, 그렇지 않은 경우 false를 반환
   */
  const handleOnCheck = async email => {
    // 임시 코드
    // return false;
    return Promise.resolve(false);

    // const apiUrl = 'https://your-domain.com/api/join/check-duplication'; // 실제 API 엔드포인트 URL로 변경 예정
    // const options = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ username: email }),
    // };

    // try {
    //   const response = await fetch(apiUrl, options);
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   const data = await response.json();
    //   return data.isDuplicated;
    // } catch (error) {
    //   console.error('Error checking email duplication:', error);
    //   throw error;
    // }
  };

  const validateName = name => {
    if (name.length > 2) {
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
      name: 'name',
      label: 'Name',
      type: 'text',
      validate: validateName,
    },
    {
      name: 'role',
      label: 'Role',
      type: 'text',
      validate: validateRole,
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
