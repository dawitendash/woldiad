import axios from 'axios';
import { format } from 'date-fns';
import { Field, Form, Formik } from 'formik';
import { React, useEffect, useState } from "react";
import { BsTrash } from 'react-icons/bs';
import { FaPen, FaTimes } from "react-icons/fa";
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import style from '../Styles/display_student_iformation.module.css';
import styles from '../Styles/DisplayTeacher.module.css';
Modal.setAppElement('#root');
const UpdateModal = ({ isOpen, onRequestClose, ModalData }) => {
  // const today = new Date()
  // const birthdata = new Date(ModalData.birthdata)

  // // const age = today.getFullYear() - birthdata.getFullYear()

  const intialValues = {
    fname: ModalData.fname,
    lname: ModalData.lname,
    gender: ModalData.gender,
    birthdate: ModalData.BirthData,
    experince: ModalData.experince,
    Level: ModalData.Level,
    College: ModalData.College,
    Department: ModalData.Department,
  }
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
            top: '41%',
            left: '55%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-60%,-40%)',
            width: '35rem',
            height: '34rem',
            padding: '20px',
            animation: 'slidshow 0.5s forwards',
          },
        }}
      >
        <div className={style.times_container}>
          <FaTimes className={style.times} onClick={onRequestClose} />
        </div>
        <Formik initialValues={intialValues}>
          {({ isValid }) => (
            <Form className={styles.updateTeacherInfo}>
              <h4 className={styles.editHead}> Edit Teacher Detail: {ModalData.University_Id}</h4>
              <div className={styles.fname}>
                <label htmlfor='firstName'>First Name:</label>
                <Field type="text" name="fname" value={ModalData.FirstName}
                ></Field>
              </div>
              <div className={styles.lname}>
                <label htmlfor='lastName'>Last Name:</label>
                <Field type="text" name="lname" value={ModalData.LastName}
                ></Field>
              </div>
              <div className={styles.gender}>
                <label htmlfor='gender'>Gender:</label>
                <Field type="radio" name="gender" value='male' checked={ModalData.gender === 'male'}></Field>Male
                <Field type="radio" name="gender" value='female' checked={ModalData.gender === 'female'}>
                </Field> Female
              </div>
              <div className={styles.birthdata}>
                <label htmlFor='BirthDate'>BirthDate:</label>
                <Field type="date" name="birthdate" min="0" value={ModalData.BirthData}  ></ Field>
              </div>
              <div className={styles.experince}>
                <label htmlfor='experince'>Experince :</label>
                <Field type="number" name="experince" min="0" value={ModalData.experince}  ></ Field>
              </div>
              <div className={styles.Level}>
                <label htmlfor='level'>Level :</label>
                <Field type="text" name="Level" value={ModalData.Level}></Field>
              </div>
              <div className={styles.college}>
                <label htmlFor='College'>College :</label>
                <Field type="text" name="College" value={ModalData.college}></Field>
              </div>
              <div className={styles.Department}>
                <label htmlFor='Department'>Department :</label>
                <Field type="text" name="Department" value={ModalData.Department}></Field>
              </div>

              <div className={styles.btn}>
                <button onClick={onRequestClose} type="submit" className="btn btn-primary">Update</button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  )
}
function DisplayTeacher() {
  const [modalisopen, setmodalisopen] = useState(false);
  const [ModalData, setModalDate] = useState('');
  const openmodal = (d) => {
    setModalDate(d)
    setmodalisopen(true)
  }
  const closemodal = () => {
    setmodalisopen(false)
  }
  const Navigate = useNavigate();
  const user = localStorage.getItem('username');
  const Role = localStorage.getItem('Role')
  const [data, setdata] = useState([]);
  const [deleteMessge, setdeleteMessge] = useState('')
  const deletedTeacherRecord = async (id) => {
    const getDayName = (date) => {
      const option = { weekday: 'long' }
      return new Intl.DateTimeFormat('en-US', option).format(date);
    }
    const currentdate = new Date();
    const deleteday = format(currentdate, ' MMMM dd , yyyy');
    const deletetime = getDayName(currentdate);
    const Role = localStorage.getItem('Role')
    await axios.post('http://localhost:5000/inner_pages/DeleteTeacherRecord', { id, user, Role, deleteday, deletetime }).then(res => {
      console.log({ id, user, Role, deleteday, deletetime })
      console.log(res)
    })

  }

  //handleDelete

  const handleDelete = async (id) => {
    console.log(id)
    await fetch('http://localhost:5000/inner_pages/DeleteTeacher' + id, { method: 'DELETE' })
    Navigate('/inner_pages/DisplayTeacher')
    deletedTeacherRecord(id)
    setdeleteMessge('Delete succussfully')
    setTimeout(() => {
      setdeleteMessge('')
    }, 3000);

  }
  useEffect(() => {
    fetch('http://localhost:5000/inner_pages/DisplayTeacher')
      .then(res => res.json())
      .then(data => setdata(data))
      .catch(err => console.log(err));
  }, [])
  if (user && Role === 'admin') {
    return (
      <>
        {
          deleteMessge && (<p className="alert alert-success">{deleteMessge}</p>)
        }
        <div className='main-container'>

          <h3 className={style.page_header}>
            Teachers List
          </h3>
          <p className={style.search} >
            <input type='search' placeholder="Search here" ></input>
          </p>
          <hr></hr>
          <div class="table-responsive">
            <table className="table" id={style.table}>
              <thead>
                <tr className={style.header}>
                  <th scope="col"> Id</th>
                  <th scope="col"> Name</th>
                  <th scope="col">Level</th>
                  <th scope="col">Birth Data</th>
                  <th scope="col">Department</th>
                  <th scope="col">Role</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className={style.body}>
                {
                  data.length === 0 ? (
                    <tr >
                      <td colSpan='7'>There is no record Yet!!</td>
                    </tr>
                  ) :
                    (data.map((d, i) => (
                      <tr key={i}>
                        <td >{d.University_Id}</td>
                        <td >{d.FirstName} {d.LastName}</td>
                        <td>{d.Level}</td>
                        <td >{d.BirthData}</td>
                        <td >{d.Department}</td>
                        <td >{d.Role}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary "
                            onClick={() => openmodal(d)}   ><FaPen className={style.icon} />
                          </button>
                          <button
                            type="button" className="btn btn-danger"
                            onClick={() => handleDelete(d.University_Id)}
                          ><BsTrash className={style.icon} />  </button>
                        </td>

                      </tr>)
                    ))}
              </tbody>
            </table>
          </div>
          <UpdateModal
            isOpen={modalisopen}
            onRequestClose={closemodal}
            ModalData={ModalData} />
        </div>
      </>
    );
  } else {
    Navigate('/')
  }
}

export default DisplayTeacher;





// const [users, setuser] = useState([]);
// useEffect(() => {}, []);
// function getuser() {
//   axios.get("http://localhost/my-react-app/backend/index.php")
//     .then(function (response) {
//       console.log(response.data);
//     });
// }
// <tbody>
//   {users.map((user, key) => (
//     <tr key={key}>
//       <td>{user.u_id}</td>
//       <td>{user.fname}</td>
//       <td>{user.lname}</td>
//       <td>{user.batch}</td>
//       <td>{user.gpa}</td>
//       <td>{user.d_id}</td>
//     </tr>
//   ))
// </tbody>