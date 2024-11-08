// import axios from "axios";
import { React, useEffect, useState } from "react";
import { BsEye } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import style from '../Styles/display_student_iformation.module.css';
Modal.setAppElement('#root');
const UpdateModal = ({ isOpen, onRequestClose, ModalData }) => {
  const today = new Date();
  const birthdate = new Date(ModalData.BirthData)
  const age = today.getFullYear() - birthdate.getFullYear()
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
            top: '45%',
            left: '55%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-60%,-40%)',
            transition: 'transform 6s',
            width: '35rem',
            height: '28rem',
            padding: '20px',
          },
        }}
      >
        <div className={style.times_container}>
          <FaTimes className={style.times} onClick={onRequestClose} />
        </div>
        <h4 className={style.viewDetailHead}> Teacher Detail information : {ModalData.University_Id}</h4>
        <div className={style.detailInfoContainer}>
          <div>
            Teacher Name :
            <span>{ModalData.FirstName} {ModalData.LastName}</span>
          </div>
          <div>
            Gender : <span>{ModalData.gender}</span>
          </div>
          <div>
            Age: <span>{age}</span>
          </div>

          <div>
            Experince: <span>{ModalData.experince}</span>

          </div>
          <div>
            Level: <span >{ModalData.Level}</span>
          </div>
          <div>
            College  :  <span> {ModalData.college}</span>
          </div>
          <div>

            Department:<span>{ModalData.Department}</span>
          </div>

        </div>
      </Modal>
    </div>
  )
}
function DisplayTeacherInDepartment() {
  const [modalisopen, setmodalisopen] = useState(false);
  const [showmore, setshowmmore] = useState('')
  const [ModalData, setModalData] = useState('');

  const openmodal = (d) => {
    setModalData(d)
    setmodalisopen(true)
  }
  const closemodal = () => {
    setmodalisopen(false)
  }
  const Navigate = useNavigate();
  const user = localStorage.getItem('username');
  const Role = localStorage.getItem('Role')
  const department = localStorage.getItem('department')


  const [data, setdata] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/inner_pages/DisplayTeacher')
      .then(res => res.json())
      .then(data => setdata(data))
      .catch(err => console.log(err));
  }, [])
  const fiterData = data.filter(dept => dept.Department === department)
  const display5Teacher = showmore ? fiterData : fiterData.slice(0, 5)
  if (user && Role === 'head') {
    return (
      <>
        <div className='main-container'>
          <h3 className={style.page_header}>
            Teachers List
          </h3>
          <p className={style.search} >
            <input type='search' placeholder="Search here" ></input>
          </p>
          <hr></hr>
          <table className="table" id={style.table}>
            <thead>
              <tr className={style.header}>
                <th scope="col"> Id</th>
                <th scope="col"> Name</th>
                <th scope="col">Level</th>
                <th scope="col">Birth Data</th>
                <th scope="col">Department</th>
              </tr>
            </thead>
            <tbody className={style.body}>
              {display5Teacher.map((d, i) => (
                <tr key={d.University_Id}>
                  <td >{d.University_Id}</td>
                  <td >{d.FirstName} {d.LastName}</td>
                  <td>{d.Level}</td>
                  <td >{d.BirthData}</td>
                  <td >{d.Department}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary "
                      onClick={() => openmodal(d)}
                    ><BsEye className={style.icon} />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn bg-info" onClick={() => setshowmmore(!showmore)}>
            {showmore ? 'showless' : 'showmore'}
          </button>

          <UpdateModal
            isOpen={modalisopen}
            onRequestClose={closemodal}
            ModalData={ModalData}
          />
        </div>
      </>
    );
  } else {
    Navigate('/')
  }
}

export default DisplayTeacherInDepartment;



