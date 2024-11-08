import { useState } from "react";
import HeadSidebar from './Head/HeadSidebar';
import Header from './header';
import "./link.css";
import Nav from './nav';
import Sidebar from "./sidebar";
import StuedntSidebar from './Student/Sidebar';
import TeacherSidebar from './Teacher/TeacherSidebar';
const user = localStorage.getItem('username');
const Role = localStorage.getItem('Role')
function removeAfterLimitedTime() {
  const remove = () => {
    localStorage.removeItem('username')
    localStorage.removeItem('Role')
    sessionStorage.removeItem('login')
  }
  window.addEventListener('beforeunload', remove)
}
function Navigation() {
  const [opensidebartoggle, setsidebartoggle] = useState(false);
  const opensidebar = () => {
    setsidebartoggle(!opensidebartoggle);
  }
  if (user && Role === 'admin') {
    removeAfterLimitedTime()
    return (
      <div className="grid-container">
        <Header opensidebar={opensidebar} />
        <Sidebar opensidebartoggle={opensidebartoggle} opensidebar={opensidebar} />
      </div>
    )
  } else if (user && Role === 'teacher') {
    removeAfterLimitedTime()
    return (
      <div className="grid-container">
        <Header opensidebar={opensidebar} />
        <TeacherSidebar opensidebartoggle={opensidebartoggle} opensidebar={opensidebar} />
      </div>
    )
  } else if (user && Role === 'head') {
    removeAfterLimitedTime()
    return (
      <div className="grid-container">
        <Header opensidebar={opensidebar} />
        <HeadSidebar opensidebartoggle={opensidebartoggle} opensidebar={opensidebar} />
      </div>
    )
  } else if (user && Role === 'student') {
    removeAfterLimitedTime()
    return (
      <div className="grid-container">
        <Header opensidebar={opensidebar} />
        <StuedntSidebar opensidebartoggle={opensidebartoggle} opensidebar={opensidebar} />
      </div>
    )
  } else {
    return (
      <Nav />
    )
  }
}
export default Navigation


