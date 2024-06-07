import './Button.css';

/**
 * 기본 버튼 컴포넌트
 * @param {string} label - 버튼에 표시할 내용
 * @param {string} className - 추가로 적용할 CSS 클래스
 * @param {function} onClick - 버튼 클릭 시 호출할 함수
 * @param {string} color - 버튼의 배경색
 * @param {string} hoverColor - 버튼 hover 시의 배경색
 * @returns {JSX.Element} 기본 버튼 컴포넌트
 */
export const Button = ({ label, className, onClick, color }) => {
  const hoverColor = darkenColor(color, 20);

  return (
    <button
      className={`basic-button ${className}`}
      onClick={onClick}
      style={{
        '--button-color': color,
        '--button-hover-color': hoverColor,
      }}
    >
      <div>{label}</div>
    </button>
  );
};

/**
 * 주어진 색상에서 어두운 색상을 계산하는 함수
 * @param {string} hex - 16진수 색상 코드
 * @param {number} amount - 어둡게 할 정도 (0 ~ 255)
 * @returns {string} 어두워진 색상 코드
 */
const darkenColor = (hex, amount) => {
  let usePound = false;

  if (hex[0] === '#') {
    hex = hex.slice(1);
    usePound = true;
  }

  const num = parseInt(hex, 16);

  let r = (num >> 16) - amount;
  if (r < 0) r = 0;
  else if (r > 255) r = 255;

  let g = ((num >> 8) & 0x00ff) - amount;
  if (g < 0) g = 0;
  else if (g > 255) g = 255;

  let b = (num & 0x0000ff) - amount;
  if (b < 0) b = 0;
  else if (b > 255) b = 255;

  return (
    (usePound ? '#' : '') +
    r.toString(16).padStart(2, '0') +
    g.toString(16).padStart(2, '0') +
    b.toString(16).padStart(2, '0')
  );
};
