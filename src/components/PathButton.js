import { useNavigate } from 'react-router-dom';
import { Button } from './Button';

/**
 * PathButton 컴포넌트
 * @param {string} label - 버튼에 표시할 내용
 * @param {string} path - 버튼 클릭 시 이동할 경로
 * @param {string} color - 버튼의 배경색
 * @param {string} className - Button에 적용할 CSS 클래스
 * @returns {JSX.Element} 경로 버튼 컴포넌트
 */
export const PathButton = ({ label, path, color, className }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <Button
      label={label}
      onClick={handleClick}
      color={color}
      className={className}
    />
  );
};
