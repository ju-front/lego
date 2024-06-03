import { Hello } from 'ezy-ui';
import { helloWorld } from 'ezy-fn';

export const Home = () => {
  return (
    <div>
      <h1>ezy-라이브러리 테스트</h1>
      <Hello name="lego" />
      <h1>{helloWorld()}</h1>
    </div>
  );
};

export default Home;
