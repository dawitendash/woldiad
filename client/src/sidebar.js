import React, { useState } from 'react';
import { BsBook, BsFillGearFill, BsFillGrid1X2Fill, BsFillPeopleFill, BsMessenger, BsPerson } from 'react-icons/bs';
import { FaAngleDown, FaRecordVinyl, FaSignOutAlt } from 'react-icons/fa';
import { Link, BrowserRouter as Router } from "react-router-dom";
import style from './Styles/studentsidebar.module.css';
import Navigation from './link';
import RoutersList from "./linklist/routers";
function Sidebar({ opensidebartoggle, opensidebar }) {
    const [dropdowncourse, setdropdowncourse] = useState(false);
    const [dropdownteacher, setdropdownteacher] = useState(false);
    const [dropdownstudent, setdropdownstudent] = useState(false);
    const [dropdowndepartment, setdropdowndepartment] = useState(false);
    const [dropDownRecord, setdropDownRecord] = useState(false)
    const Role = localStorage.getItem('Role')
    const [Action, setAction] = useState('dashboared');
    const user = localStorage.getItem('username');
    if (user && Role === 'admin') {
        return (
            <Router>
                <aside
                    id="sidebar"
                    className={opensidebartoggle ? "sidebar-responsive" : ""}>
                    <div
                        className='sidebar-title'>
                        <div
                            className='sidebar-brand' id={style.sidebrand}>
                            <BsPerson className={style.person_icon} />
                            :
                            <span
                                className={style.role}>
                                {Role.toUpperCase()}
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
                            className={Action === 'dashboared' ? 'sidebar-list-item  active' : 'sidebar-list-item'} >
                            <Link
                                onClick={() => { setAction('dashboared') }}
                                to="/inner_pages/dashboard">
                                <BsFillGrid1X2Fill className='icon' />Dashboard
                            </Link>
                        </li>
                        <hr className='horizontalline'></hr>
                        <li
                            className={Action === 'College' ? 'sidebar-list-item  active' : 'sidebar-list-item'} >
                            <Link
                                onClick={() => { setAction('College') }}
                                to="/inner_pages/college_registration">
                                <BsBook className='icon' />College
                            </Link>
                            <FaAngleDown
                                onClick={() => setdropdowncourse((prev) => !prev)} className='dropdown-icon' />
                            {
                                dropdowncourse && (
                                    <ul className='dropdown sidebar-list'>
                                        <li className='dropdown-list-item'>
                                            <Link to="/inner_pages/student_registration">
                                                <BsBook className='icon' />Dispaly College
                                            </Link>
                                        </li>
                                        <li className='dropdown-list-item'> Close College</li>
                                        <li className='dropdown-list-item'>main course</li>
                                        <li className='dropdown-list-item'>manior course</li>
                                    </ul>
                                )
                            }
                        </li>
                        <hr className='horizontalline'></hr>
                        <li
                            className={Action === 'Course' ? 'sidebar-list-item  active' : 'sidebar-list-item'} >
                            <Link
                                onClick={() => { setAction('Course') }}
                                to="/inner_pages/CourseRegistration">
                                <BsBook className='icon' />Course
                            </Link>
                            <FaAngleDown
                                onClick={() => setdropdowncourse((prev) => !prev)} className='dropdown-icon' />
                            {
                                dropdowncourse && (
                                    <ul className='dropdown sidebar-list'>
                                        <li className='dropdown-list-item'>
                                            <Link to="/inner_pages/student_registration">
                                                <BsBook className='icon' />Dispaly Course
                                            </Link>
                                        </li>
                                        <li className='dropdown-list-item'> Blocked course</li>
                                        <li className='dropdown-list-item'>main course</li>
                                        <li className='dropdown-list-item'>manior course</li>
                                    </ul>
                                )
                            }
                        </li>
                        <hr className='horizontalline'></hr>
                        <li
                            className={Action === 'Department' ? 'sidebar-list-item  active' : 'sidebar-list-item'} >
                            <Link
                                onClick={() => { setAction('Department') }}
                                to="/inner_pages/DepartmentRegistartion">
                                <BsBook className='icon' />Department
                            </Link>
                            <FaAngleDown
                                onClick={() => setdropdowndepartment((prev) => !prev)} className='dropdown-icon' />
                            {
                                dropdowndepartment && (
                                    <ul className='dropdown sidebar-list'>
                                        <li className='dropdown-list-item'>
                                            <Link to="/inner_pages/DisplayDepartment">
                                                <BsBook className='icon' />Dispaly Department
                                            </Link>
                                        </li>
                                        <li className='dropdown-list-item'>Closed course</li>
                                        <li className='dropdown-list-item'>Display course</li>
                                        <li className='dropdown-list-item'>Display course</li>
                                    </ul>
                                )
                            }
                        </li>
                        <hr className='horizontalline'></hr>

                        <li
                            className={Action === 'Student' ? 'sidebar-list-item  active' : 'sidebar-list-item'} >
                            <Link
                                onClick={() => { setAction('Student') }}
                                to="/inner_pages/student_registration">
                                <BsPerson className='icon' />Student
                            </Link>
                            <FaAngleDown
                                onClick={() => setdropdownstudent((prev) => !prev)} className='dropdown-icon' />
                            {
                                dropdownstudent && (
                                    <ul className='dropdown sidebar-list'>
                                        <li className='dropdown-list-item'>
                                            <Link to="/inner_pages/display_student_information">
                                                <BsBook className='icon' />Display student
                                            </Link>
                                        </li>
                                        <li className='dropdown-list-item'>Display course</li>
                                        <li className='dropdown-list-item'>Display course</li>
                                        <li className='dropdown-list-item'>Display course</li>
                                    </ul>
                                )
                            }
                        </li>
                        <hr className='horizontalline'></hr>
                        <li
                            className={Action === 'Teacher' ? 'sidebar-list-item  active' : 'sidebar-list-item'}   >
                            <Link
                                onClick={() => { setAction('Teacher') }}
                                to="/inner_pages/TeacherRegistartion">
                                <BsFillPeopleFill className='icon' />Teacher
                            </Link>
                            <FaAngleDown
                                onClick={() => setdropdownteacher((prev) => !prev)
                                } className='dropdown-icon' />
                            {
                                dropdownteacher && (
                                    <ul className='dropdown sidebar-list'>
                                        <li
                                            className={Action === 'DisplayTeacher' ? 'dropdown-list-item active' : 'dropdown-list-item'}   >
                                            <Link
                                                onClick={() => { setAction('DisplayTeacher') }}
                                                to="/inner_pages/DisplayTeacher">
                                                <BsBook className='icon' />Dispaly Teacher
                                            </Link>
                                        </li>
                                        <li
                                            className={Action === 'DisplayTeacher' ? 'dropdown-list-item active' : 'dropdown-list-item'}   >   <Link
                                                onClick={() => { setAction('DisplayTeacher') }}
                                                to="/inner_pages/DisplayTeacher">
                                                <BsBook className='icon' />Dispaly Teacher
                                            </Link>
                                        </li>
                                        <li className='dropdown-list-item'>Display course</li>
                                        <li className='dropdown-list-item'>Display course</li>
                                    </ul>
                                )
                            }
                        </li>
                        <hr className='horizontalline'></hr>
                        <li
                            className={Action === 'RecordDetail' ? 'sidebar-list-item  active' : 'sidebar-list-item'}   >
                            <Link
                                onClick={() => { setAction('RecordDetail') }}
                                to="/inner_pages/TeacherRegistartion">
                                <FaRecordVinyl className='icon' />Record Detail
                            </Link>
                            <FaAngleDown
                                onClick={() => setdropDownRecord((prev) => !prev)
                                } className='dropdown-icon' />
                            {
                                dropDownRecord && (
                                    <ul className='dropdown sidebar-list'>
                                        <li
                                            className={Action === 'TeacherdeleteRecord' ? 'dropdown-list-item active' : 'dropdown-list-item'}   >
                                            <Link
                                                onClick={() => { setAction('TeacherdeleteRecord') }}
                                                to="/inner_pages/DisplayDeleteTeacherRecord">
                                                <BsBook className='icon' />Teacher delete Record
                                            </Link>
                                        </li>
                                        <li
                                            className={Action === 'StudentdeleteRecord' ? 'dropdown-list-item active' : 'dropdown-list-item'}   >   <Link
                                                onClick={() => { setAction('StudentdeleteRecord') }}
                                                to="/inner_pages/DiplayDeletedStudentRecord">
                                                <BsBook className='icon' />Student delete Record
                                            </Link>
                                        </li>
                                        <li className='dropdown-list-item'>Updated student  Detail</li>
                                        <li className='dropdown-list-item'>Updated Teacher Detail</li>
                                    </ul>
                                )
                            }
                        </li>
                        <hr className='horizontalline'></hr>
                        <li
                            className={Action === 'Setting' ? 'sidebar-list-item  active' : 'sidebar-list-item'} >
                            <Link
                                onClick={() => { setAction('Setting') }}
                                to="/inner_pages/ChangePassword">
                                <BsFillGearFill className='icon' />Setting
                            </Link>
                        </li>
                        <li
                            className={Action === 'Anouncement' ? 'sidebar-list-item  active' : 'sidebar-list-item'} >
                            <Link
                                onClick={() => { setAction('Anouncement') }}
                                to="/inner_pages/Announcement">
                                <BsMessenger className='icon' />Anouncement
                            </Link>
                        </li>
                        <li className='sidebar-list-item' onClick={() => {
                            localStorage.removeItem('username');
                            localStorage.removeItem('Role')
                            sessionStorage.removeItem('login')
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
    } else {
        <Navigation />
    }
}
export default Sidebar
