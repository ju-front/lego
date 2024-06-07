import { Card } from 'components/Card';
import { PathButton } from 'components/PathButton';

export const Home = () => {
  return (
    <div className="card-container">
      <Card title="머신러닝" color="#4688F1" path="/machine-learning" />
      <Card title="통계학및실습" color="#6DAEDD" path="/statistics" />
      <Card title="SPA개발방법론" color="#AFDBF5" path="/spa-methods" />
      <Card title="데이터베이스" color="#D6EAF8" path="/database" />
      <PathButton
        label="+"
        path="/new-page"
        color="#6DAEDD"
        className="add-button"
      />
      <PathButton
        label="테스트"
        path="/minus-page"
        color="#ff0000"
        className="add-button"
      />
    </div>
  );
};

export default Home;
