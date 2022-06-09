import React from 'react';
import { useHistory } from 'react-router-dom';

export const AdminNavBar = () => {
  const history = useHistory();
  const goToPage = (pageName) => {
    history.push(`/admin/${pageName}`);
  };
  return (
    <div className='d-flex' style={{ background: 'rgba(0,0,0,.75)' }}>
      <div className='item p-3' style={{ cursor: 'pointer', color: 'white' }} onClick={() => goToPage('dashboard')}>
        Dashboard
      </div>
      <div className='item p-3' style={{ cursor: 'pointer', color: 'white' }} onClick={() => goToPage('courses')}>
        Courses
      </div>
      <div className='item p-3' style={{ cursor: 'pointer', color: 'white' }} onClick={() => goToPage('user')}>
        Users
      </div>
    </div>
  );
};
