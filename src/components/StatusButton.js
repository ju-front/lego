import React from 'react';

export const StatusButton = ({ status, onClick }) => {
  const getStatusColor = status => {
    switch (status) {
      case '출석':
        return 'green';
      case '지각':
        return 'orange';
      case '결석':
        return 'red';
      default:
        return 'grey';
    }
  };

  return (
    <button
      style={{
        backgroundColor: getStatusColor(status),
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {status}
    </button>
  );
};
