import axios from "axios";
import { format } from "date-fns";
import { Field, Form, Formik } from "formik";
import { React, useEffect, useState } from "react";
import { BsTrash } from 'react-icons/bs';
import { FaPen, FaTimes } from "react-icons/fa";
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import style from '../Styles/display_student_iformation.module.css';
import styles from '../Styles/DisplayTeacher.module.css';
Modal.setAppElement('#root');
const UpdateModal = ({ isOpen, onRequestClose, ModalData }) => {
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
            width: '35rem',
            height: '28rem',
            padding: '20px',
          },
        }}
      >
        <div className={style.times_container}>
          <FaTimes className={style.times} onClick={onRequestClose} />
        </div>
        <Formik>{({ isvalid }) => (
          <Form className={styles.updateform}>
            <h4 className={style.editHead}> update student Detail:{ModalData.university_id} </h4>
            <div className={styles.fname}>
              <label htmlFor="FirstName">First Name:</label>
              <Field type="text" name="fname" value={ModalData.fname}
              ></Field>
            </div>
            <div className={styles.lname}>
              <label htmlFor="lastname">Last Name:</label>
              <Field type="text" name="lname" value={ModalData.lname}
              ></Field>
            </div>
            <div className={styles.gender}>
              <label htmlfor='gender'>Gender:</label>
              <Field type="radio" name="gender" value='male' checked={ModalData.gender === 'male'}></Field>Male
              <Field type="radio" name="gender" value='female' checked={ModalData.gender === 'female'}>
              </Field> Female
            </div>
            <div className={styles.gender}>
              <label htmlfor='gender'>Disabled:</label>
              <Field type="radio" name="diabled" value='yes' checked={ModalData.disabled === 'yes'}></Field>Yes
              <Field type="radio" name="diabled" value='no' checked={ModalData.disabled === 'no'}>
              </Field>No
            </div>
            <div className={styles.birthdata}>
              <label htmlFor="Region">Region:</label>
              <Field type="text" name="region" value={ModalData.region} ></Field>
            </div>
            <div className={styles.birthdata}>
              <label htmlFor='BirthDate'>BirthDate:</label>
              <Field type="date" name="birthdate" value={ModalData.birth_date} ></ Field>
            </div>
            <div className={styles.birthdata}>
              <label htmlFor="Bacth">Bacth:</label>
              <Field type="number" name="bacth" min="1" max="6" value={ModalData.bacth}></Field>
            </div>
            <div className={styles.birthdata}>
              <label htmlFor="College">College:</label>
              <Field type="text" name="college" value={ModalData.college}></Field>
            </div>
            <div className={styles.birthdata}>
              <label htmlFor="Department">Department:</label>
              <Field type="text" name="department" value={ModalData.department} ></Field>
            </div>
            <div className={styles.btn}>
              <button type="submit" className="btn btn-primary">Update</button>
            </div>
          </Form>
        )}</Formik>
      </Modal>
    </div>
  )
}
function Displaystudent() {
  const Navigate = useNavigate();
  const [ModalData, setModalData] = useState('')
  const user = localStorage.getItem('username');
  const Role = localStorage.getItem('Role')
  const [data, setdata] = useState([]);
  const [modalisopen, setmodalisopen] = useState(false);
  const [showmore, setshowmmore] = useState('')
  const [deleteMessage, setDeleteMessage] = useState('')
  const openmodal = (d) => {
    setModalData(d)
    setmodalisopen(true)

  }
  const closemodal = () => {
    setmodalisopen(false)
  }

  useEffect(() => {
    fetch(`http://localhost:5000/inner_pages/display_student_information`)
      .then(res => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setdata(data)
        } else {
          console.log('the expected value is must be an array')
        }
      }

      )
      .catch(err => console.log(err));
  }, [])
  const insertDeleteStudentRecord = async (id) => {
    const getDayName = (date) => {
      const option = { weekday: 'long' }
      return new Intl.DateTimeFormat('en-US', option).format(date);
    }
    const currentdate = new Date();
    const deleteday = format(currentdate, ' MMMM dd , yyyy');
    const deletetime = getDayName(currentdate);
    await axios.post('http://localhost:5000/inner_pages/DeletestudentRecord', { id, user, Role, deleteday, deletetime })
  }
  const handleDelete = async (id) => {
    console.log(id)
    await fetch('http://localhost:5000/inner_pages/DeleteStudent' + id, { method: 'DELETE' }).then(res => {
      try {
        if (res) {
          insertDeleteStudentRecord(id)
          setDeleteMessage('Delete succussfully')
          setTimeout(() => {
            setDeleteMessage('')
          }, 3000);
        } else {
          console.log('error')
        }
      } catch (err) {
        console.log(err)
      }
    }
    )

  }
  const diplay = showmore ? data :
    data.slice(0, 5);
  if (user && Role === 'admin') {
    return (
      <>
        {deleteMessage && <p className="alert alert-success"> {deleteMessage}  </p>}
        <div className='main-container'>
          <h3 className={style.page_header}>
            Student List
          </h3>
          <p className={style.search} >
            <input type='search' placeholder="Search here" name="search" ></input>
          </p>
          <hr></hr>
          <div class="table-responsive">
            <table className="table" id={style.table}>
              <thead>
                <tr className={style.header}>
                  <th scope="col">University Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">GPA</th>
                  <th scope="col">Batch</th>
                  <th scope='col'>college</th>
                  <th scope="col">Department</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className={style.body}>
                {
                  diplay.length === 0 ? (
                    <tr>
                      <td colSpan='7'>There is no record yet!!</td>
                    </tr>
                  ) : (
                    Array.isArray(diplay) && diplay.map((d, i) => (
                      <tr key={i}>
                        <td >{d.university_id}</td>
                        <td >{d.fname} {d.lname}</td>
                        <td >{d.gpa}</td>
                        <td >{d.bacth}</td>
                        <td >{d.college}</td>
                        <td >{d.department}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => openmodal(d)}  ><FaPen className={style.icon} /></button>
                          <button
                            type="button" className="btn btn-danger" onClick={() => handleDelete(d.university_id)} ><BsTrash className={style.icon} />
                          </button>
                        </td>
                      </tr>)
                    ))}
              </tbody>

            </table>
          </div>
          <button className="btn bg-info" onClick={() => setshowmmore(!showmore)}>
            {showmore ? 'showless' : 'showmore'}
          </button>
          < UpdateModal
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
export default Displaystudent; 