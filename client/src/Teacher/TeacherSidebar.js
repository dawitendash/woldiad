import React, { useEffect, useState } from 'react';
import { BsBook, BsFillGearFill, BsFillGrid1X2Fill, BsFillPeopleFill, BsMessenger, BsPerson } from 'react-icons/bs';
import { FaAngleDown, FaSignOutAlt } from 'react-icons/fa';
import { Link, BrowserRouter as Router } from "react-router-dom";
import '../App.css';
import RoutersList from "../linklist/routers";
import style from '../Styles/studentsidebar.module.css';
function TeacherSidebar({ opensidebartoggle, opensidebar }) {
    const Role = localStorage.getItem('Role')
    const [Action, setAction] = useState('Dashboard');
    const user = localStorage.getItem('username')
    const [courseDropDown, setCourseDropDown] = useState(false)
    const department = localStorage.getItem('department')
    const [data, setData] = useState([])
    const id = sessionStorage.getItem('id')
    useEffect(() => {
        fetch('http://localhost:5000/inner_pages/SelectCourseToTeacher')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    }, [])
    const filteredCourse = data.filter(d => d.teacher_id === id)
    if (user && Role === 'teacher') {
        console.log(filteredCourse)
        console.log(id)
        return (
            <Router>
                <aside
                    id="sidebar"
                    className={opensidebartoggle ? "sidebar-responsive" : ""}>
                    <div
                        className='sidebar-title'>
                        <div
                            className='sidebar-brand'
                            id={style.sidebrand}>
                            <BsPerson className={style.person_icon} />
                            :
                            <span className={style.role}>
                                {department.toUpperCase()} {Role.toUpperCase()}
                            </span>
                        </div>
                        <span
                            className='icon close-icon'
                            onClick={opensidebar}>
                            X
                        </span>
                    </div>
                    <ul
                        className='sidebar-list'>
                        <li
                            className={Action === 'Dashboard' ? 'sidebar-list-item  active' : 'sidebar-list-item'} >
                            <Link
                                onClick={() => { setAction('Dashboard') }}
                                to="/inner_pages/dashboard">
                                <BsFillGrid1X2Fill className='icon' />Dashboard
                            </Link>
                        </li>
                        <hr className='horizontalline'></hr>
                        <li
                            className={Action === 'RecordDetail' ? 'sidebar-list-item  active' : 'sidebar-list-item'} > {filteredCourse.length !== 0 ?
                                (filteredCourse.map((d, i) => (
                                    <>

                                        <Link key={i}
                                            onClick={() => { setAction('RecordDetail') }}
                                            to="/Teacher/Resourses"> {d.course}
                                        </Link>
                                        <FaAngleDown
                                            onClick={() => setCourseDropDown((prev) => !prev)} className='dropdown-icon' />
                                    </>
                                ))
                                ) : (<></>)
                            }
                            {courseDropDown && (
                                <ul className='dropdown sidebar-list'>
                                    <hr className='horizontalline'></hr>
                                    <li
                                        className={Action === 'Resources' ? 'sidebar-list-item  active' : 'sidebar-list-item'} >
                                        <Link
                                            onClick={() => { setAction('Resources') }}
                                            to="/Teacher/Resourses">
                                            <BsFillPeopleFill className='icon' />Resources
                                        </Link>
                                    </li>
                                    <hr className='horizontalline'></hr>
                                    <li
                                        className={Action === 'Assigment' ? 'sidebar-list-item  active' : 'sidebar-list-item'} >
                                        <Link
                                            onClick={() => { setAction('Assigment') }}
                                            to="/Teacher/Assigment">
                                            <BsFillPeopleFill className='icon' />Assigment
                                        </Link>
                                    </li>
                                    <hr className='horizontalline'></hr>
                                    <li
                                        className={Action === 'Grade' ? 'dropdown-list-item active' : 'dropdown-list-item'}   >
                                        <Link
                                            onClick={() => { setAction('Grade') }}
                                            to="/Teacher/MakeGrade">
                                            <BsBook className='icon' />Grade
                                        </Link>
                                    </li>

                                </ul>
                            )
                            }
                        </li>
                        <hr className='horizontalline'></hr>
                        <li
                            className={Action === 'Report' ? 'sidebar-list-item  active' : 'sidebar-list-item'} >
                            <Link
                                onClick={() => { setAction('Report') }}
                                to="/Teacher/Report">
                                <BsBook className='icon' />Report
                            </Link>
                            <FaAngleDown className='dropdown-icon' />
                        </li>
                        <hr className='horizontalline'></hr>
                        <li className='sidebar-list-item'>
                            <Link to="/inner_pages/student_registration">
                                <BsFillGearFill className='icon' />Setting
                            </Link>
                        </li>
                        <li className='sidebar-list-item'>
                            <Link to="/inner_pages/Announcement">
                                <BsMessenger className='icon' />Anouncement
                            </Link>
                        </li>
                        <li className='sidebar-list-item' onClick={() => {
                            localStorage.removeItem('username');
                            window.location.reload()
                        }} >
                            <Link>
                                <FaSignOutAlt className='icon' />Logout</Link>
                        </li>
                    </ul>
                </aside>
                <RoutersList />
            </Router>
        )
    }
}
export default TeacherSidebar
