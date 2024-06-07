import { SigninEmail1 } from 'ezy-ui';
import 'ezy-ui/dist/sign/SignEmail1.css';
import '../css/SignPage.css';

import { useNavigate } from 'react-router-dom';

export const SigninPage = () => {
  const navigate = useNavigate();

  const handleOnSubmit = (email, password) => {
    console.log(email, password);
    navigate('/Class-Create');
  };

  return (
    <div className="page-container">
      <div className="custom-signin">
        <SigninEmail1 onConfirm={handleOnSubmit} />
      </div>
    </div>
  );
};
