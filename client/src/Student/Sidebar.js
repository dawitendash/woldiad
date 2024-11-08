import React, { useEffect, useState } from 'react';
import { BsBook, BsCalendar, BsFillGearFill, BsFillGrid1X2Fill, BsFillPeopleFill, BsMessenger, BsPerson } from 'react-icons/bs';
import { FaAngleDown, FaSignOutAlt } from 'react-icons/fa';
import { Link, BrowserRouter as Router } from "react-router-dom";
import '../App.css';
import RoutersList from "../linklist/routers";
import style from '../Styles/studentsidebar.module.css';
function StuedntSidebar({ opensidebartoggle, opensidebar }) {
    const [dropdowncourse, setdropdowncourse] = useState(false);
    const Role = localStorage.getItem('Role')
    const [innerCourse, setinnerCourse] = useState('')
    const department = localStorage.getItem('department')
    const [data, setData] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/inner_pages/SelectCourseToStudent')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    }, [])
    const fiterData = data.filter(course => course.department_id === department)
    const [Action, setAction] = useState('dashboared');
    console.log(data);
    console.log(fiterData)
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
                        <span
                            className={style.role}>
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
                        className={Action === 'dashboared' ? 'sidebar-list-item active' : 'sidebar-list-item'} >
                        <Link onClick={() => { setAction('dashboared') }}
                            to="/inner_pages/dashboard">
                            <BsFillGrid1X2Fill className='icon' />Dashboard
                        </Link>
                    </li>
                    <hr
                        className='horizontalline'>
                    </hr>
                    <li
                        className={Action === 'Course' ? 'sidebar-list-item  active' : 'sidebar-list-item'} >

                        <Link
                            onClick={() => { setAction('Course') }}>

                            <BsFillPeopleFill className='icon' />Course
                        </Link>
                        <FaAngleDown
                            onClick={() => setdropdowncourse((prev) => !prev)} className='dropdown-icon' />
                        {
                            dropdowncourse && (
                                fiterData.map((d, i) => (
                                    <ul>
                                        <li key={i}
                                            className={Action === `${d.course_title}` ? 'sidebar-list-item  active' : 'sidebar-list-item'}
                                        >
                                            <hr
                                                className='horizontalline'>
                                            </hr>
                                            <Link
                                                onClick={() => { setAction(`${d.course_title}`) }}
                                            >
                                                {d.course_title}
                                            </Link>
                                            <FaAngleDown
                                                onClick={() => setinnerCourse(`${d.course_title}`)} className='dropdown-icon' />
                                            {innerCourse === `${d.course_title}` && (
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
                                                            to="/Teacher/Grade">
                                                            <BsBook className='icon' />Grade
                                                        </Link>
                                                    </li>

                                                </ul>
                                            )
                                            }
                                        </li>
                                    </ul>

                                )
                                )
                            )
                        }
                    </li>
                    <hr
                        className='horizontalline'>
                    </hr>
                    <li
                        className={Action === 'Placement' ? 'sidebar-list-item  active' : 'sidebar-list-item'} >
                        <Link
                            onClick={() => { setAction('Placement') }}
                            to="/Student/Placement">
                            <BsBook className='icon' />Placement
                        </Link>
                    </li>
                    <hr
                        className='horizontalline'>
                    </hr>
                    <li
                        className={Action === 'Class' ? 'sidebar-list-item  active' : 'sidebar-list-item'} >
                        <Link
                            onClick={() => { setAction('Class') }}
                            to="/Student/Class">
                            <BsFillGearFill className='icon' />Class
                        </Link>
                    </li>
                    <hr
                        className='horizontalline'>
                    </hr>
                    <li
                        className={Action === 'Schedule' ? 'sidebar-list-item  active' : 'sidebar-list-item'} >
                        <Link
                            onClick={() => { setAction('Schedule') }}
                            to="/Student/Schedule">
                            <BsCalendar className='icon' />Schedule
                        </Link>
                    </li>
                    <hr
                        className='horizontalline'>
                    </hr>
                    <li
                        className={Action === 'Clearlance' ? 'sidebar-list-item  active' : 'sidebar-list-item'} >
                        <Link
                            onClick={() => { setAction('Clearlance') }}
                            to="/Student/Clearlance">
                            <BsMessenger className='icon' />Clearlance
                        </Link>
                    </li>

                    <hr
                        className='horizontalline'>
                    </hr>
                    <li
                        className='sidebar-list-item' onClick={() => {
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
export default StuedntSidebar
