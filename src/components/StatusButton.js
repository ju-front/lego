import React, { useState } from 'react';
import { StatusModal } from './StatusModal';

export const StatusButton = ({ record }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  return (
    <div>
      <button
        onClick={toggleModal}
        style={{ backgroundColor: getStatusColor(record.attendance_status) }}
      >
        {record.attendance_status}
      </button>
      {modalOpen && <StatusModal record={record} onClose={toggleModal} />}
    </div>
  );
};

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
