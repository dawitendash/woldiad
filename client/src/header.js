import { React, useEffect, useState } from 'react';
import { BsFillBellFill, BsJustify, BsPerson, BsRepeat, BsSearch } from 'react-icons/bs';
import { FaAngleDown, FaBell, FaEnvelope } from 'react-icons/fa';
import Modal from 'react-modal';
import './App.css';
import woldia from './image/woldia-logo.jpg';
import style from './linkafter.module.css';
const username = localStorage.getItem('username')
const fname = localStorage.getItem('fname');
const lname = localStorage.getItem('lname');
const email = localStorage.getItem('email');
const Notification = ({ isOpen, onRequestClose, user }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/inner_pages/Announcement');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching announcements:', error);
        setData('No Notification!!')
      }
    };
    fetchData();
  }, []);
  return (
    <div className={style.modal}>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel='profile detail'
        style={{
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.2)',
          },
          content: {
            top: '15%',
            left: '90%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-60%,-40%)',
            width: '15rem',
            height: '6rem',
            padding: '20px',
            overflowY: 'none',
          },
        }}
      >
        <div className={style.notify}>
          <div>
            <BsRepeat
              className={style.refresh}
              onClick={() => { }} />
          </div>
          <div className={style.header}>
            {data.map((d, i) => (
              <div to='/ViewMessage' className='dynamic_notification' key={i}><FaEnvelope className='message-icon' />{d.title}
              </div>
            ))}
            <FaBell className={style.icon} />
            See All Notification
          </div>
        </div>
      </Modal>
    </div>
  )
}
const UserDropDownInformation = ({ isOpen, onRequestClose, user }) => {

  return (
    <div className={style.modal}>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel='profile detail'
        style={{
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.2)',
          },
          content: {
            top: '40%',
            left: '90%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-60%,-40%)',
            width: '15rem',
            height: '30rem',
            padding: '20px'
          },
        }}
      >
        <div className={style.userprofile}>
          <div className={style.username}>
            <div className={style.name}>
              {username.charAt(0).toLocaleUpperCase()}
            </div>
          </div>
          <div className={style.center}>
            <div className={style.email}>
              {email}
            </div>
            <div className={style.email}>
              {fname}
            </div>
            <div className={style.email}>
              {lname}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
function Header({ opensidebar }) {
  const [notisopen, setnotisopen] = useState(false);
  const [userprofile, setuserprofile] = useState(false);
  const seeuserprofile = () => {
    setuserprofile(true)
  }
  const closeuserprofile = () => {
    setuserprofile(false)
  }
  const opennotify = () => {
    setnotisopen(true)
  }
  const closenotify = () => {
    setnotisopen(false)
  }
  const user = localStorage.getItem('username');
  const Role = localStorage.getItem('Role')
  return (
    <header className='header' >

      <div className='menu-icon'>
        <BsJustify className='icon' onClick={opensidebar} />
      </div>
      <div className='header-logo'>
        <img src={woldia} alt='woldia-logo'></img>
      </div>
      <div className='header-left'>
        <input type='text' placeholder='search'></input>
        <BsSearch className='icon' />
      </div>
      <div className='header-right'>
        <span className='notification'>
          <BsFillBellFill className='icon' /> <FaAngleDown onClick={opennotify} className='icon' /> <span className='count_notification'>1</span>
        </span>

        <span className='profile btn btn-primary'>
          <span className='role'><BsPerson />{Role.toLocaleUpperCase()}</span>
          <FaAngleDown onClick={seeuserprofile} className='icon' />
        </span>
        <UserDropDownInformation
          isOpen={userprofile}
          onRequestClose={closeuserprofile}
          user={user}
        />
        <Notification
          isOpen={notisopen}
          onRequestClose={closenotify}
          user={user}
        />

      </div>
    </header>
  )
}

export default Header 