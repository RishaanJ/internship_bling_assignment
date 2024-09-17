import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Person = ({ name, isOnline, lastSeen, onClick }) => {
    const formattedName = name.split(' ').join('+'); 
    const avatarUrl = `https://ui-avatars.com/api/?name=${formattedName}&background=313338&color=dcdee1&rounded=false&bold=true&uppercase=true`;
  return (
    <div className='person' onClick={onClick}>
      <div className='icon'>
        <img src={avatarUrl}/>
      </div>
      <div className='text-person-info'>
        <h1>{name}</h1>
        <div className='online-status'>
          <div className={`dot ${isOnline ? '' : 'red'}`}></div>
          <h4>{isOnline ? 'online' : `Left ${lastSeen}`}</h4>
        </div>
      </div>
    </div>
  );
};

export default Person;