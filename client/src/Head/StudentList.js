import { React, useEffect, useState } from "react";
import { BsEye } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import style from '../Styles/display_student_iformation.module.css';
Modal.setAppElement('#root');
const UpdateModal = ({ isOpen, onRequestClose, ModalData }) => {
    const today = new Date();
    const birthdate = new Date(ModalData.birthdate)
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
                <h4 className={style.viewDetailHead}> student Detail information : {ModalData.university_id}</h4>
                <div className={style.detailInfoContainer}>
                    <div >
                        Student Name :
                        <span>{ModalData.fname} {ModalData.lname}</span>
                    </div>
                    <div>
                        Entrance Mark: <span>{ModalData.entrancemark}</span>
                    </div>
                    <div>
                        Age: <span>{age}</span>
                    </div>

                    <div>
                        CGPA: <span>{ModalData.gpa}</span>

                    </div>
                    <div>
                        Region: <span >{ModalData.region}</span>
                    </div>
                    <div>
                        Have Disable :  <span> {ModalData.disabled}</span>
                    </div>
                    <div>

                        Batch:<span>{ModalData.bacth}</span>
                    </div>
                    <div>

                        College: <span>{ModalData.college}
                        </span>
                    </div>
                    <div>
                        Department:<span>{ModalData.department}</span>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
function DisplayDepartmentStudent() {
    const [modalisopen, setmodalisopen] = useState(false);
    const [showmore, setshowmmore] = useState('')
    const [ModalData, setModalData] = useState('');
    const department = localStorage.getItem('department')
    const openmodal = (d) => {
        setmodalisopen(true)
        setModalData(d)
    }
    const closemodal = () => {
        setmodalisopen(false)
    }
    const Navigate = useNavigate();
    const user = localStorage.getItem('username');
    const Role = localStorage.getItem('Role')
    const [data, setdata] = useState([]);

    useEffect(() => {

        fetch(`http://localhost:5000/inner_pages/display_student_information `)
            .then(res => res.json())
            .then(data => setdata(data))
            .catch(err => console.log(err));
    }, [])
    const filterdate = data.filter(dept => dept.department === department.toLocaleLowerCase())
    const diplay5Student = showmore ? filterdate : filterdate.slice(0, 5)
    if (user && Role === 'head') {
        return (
            <>
                <div className='main-container'>
                    <h3 className={style.page_header}>
                        Student List
                    </h3>
                    <p className={style.search} >
                        <input type='search' placeholder="Search here" name="search" ></input>

                    </p>
                    <hr></hr>

                    <table className="table" id={style.table}>
                        <thead>
                            <tr className={style.header}>
                                <th scope="col">University Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">GPA</th>
                                <th scope="col">Batch</th>
                                <th scope='col'>college</th>
                                <th scope="col">Department</th>
                                {
                                    Role === 'admin' ?
                                        (<th scope="col">Action</th>) :
                                        (<></>)
                                }

                            </tr>
                        </thead>
                        <tbody className={style.body}>
                            {
                                filterdate.length === 0 ? (
                                    <tr >
                                        <td colSpan='6'>No Student record Founed in {department}</td>
                                    </tr>
                                ) : (
                                    diplay5Student.map(d => (
                                        <tr key={d.university_id}>
                                            <td >{d.university_id}</td>
                                            <td >{d.fname} {d.lname}</td>
                                            <td >{d.gpa}</td>
                                            <td >{d.bacth}</td>
                                            <td >{d.college}</td>
                                            <td >{d.department}</td>
                                            <td>
                                                <button onClick={() => openmodal(d)} className="btn btn-primary"><BsEye className={style.icon} />viewDetail</button>
                                            </td>
                                        </tr>
                                    ))
                                )
                            }
                        </tbody>

                    </table>
                    <button className="btn bg-info" onClick={() => setshowmmore(!showmore)}>
                        {showmore ? 'showless' : 'showmore'}
                    </button>

                </div>
                < UpdateModal
                    isOpen={modalisopen}
                    onRequestClose={closemodal}
                    ModalData={ModalData}
                />

            </>
        );
    } else {
        Navigate('/')
    }
}

export default DisplayDepartmentStudent;





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