import { Link } from 'react-router-dom';

import { Hello } from 'ezy-ui';
import { helloWorld } from 'ezy-fn';

export const Home = () => {
  return (
    <div>
      <h1>ezy-라이브러리 테스트</h1>
      <Hello name="lego" />
      <h1>{helloWorld()}</h1>
      <br />
      <Link className="App-link" to={'Class-Create'}>
        임시경로 - 출석체크 방 생성 페이지
      </Link>
      <br />
      <Link className="App-link" to={'Signin'}>
        임시경로 - 로그인 페이지
      </Link>
    </div>
  );
};

export default Home;
