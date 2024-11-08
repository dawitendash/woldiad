import React, { useEffect, useState } from 'react';
import style from '../Styles/display_student_iformation.module.css';
function DisplayDepartment() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/inner_pages/DisplayDepartment')
      .then(res => res.json())
      .then(data => setdata(data))
      .catch(err => console.log(err));
  }, [])
  return (
    <>
      <div className='main-container'>
        <h3 className={style.page_header}>
          Department List
        </h3>
        <p className={style.search} >
          <input type='search' placeholder="Search here" ></input>
        </p>
        <hr></hr>
        <table className="table" id={style.table}>
          <thead>
            <tr className={style.header}>
              <th scope="col"> Dep. Name</th>
              <th scope="col"> Dep .Id</th>
              <th scope="col">college</th>
              <th scope="col">Max cpacity</th>
              <th scope="col">Min capacity</th>
              <th scope="col">T.course</th>
              <th scope="col">T.Teacher</th>
              <th scope="col">Location</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className={style.body}>
            {data.map((d, i) => (
              <tr key={i}>
                <td >{d.department_name}</td>
                <td >{d.department_id}</td>
                <td>{d.college}</td>
                <td >{d.max_capacity}</td>
                <td >{d.min_capacity}</td>
                <td >{d.total_course}</td>
                <td >{d.total_teacher}</td>
                <td>{d.location}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary "
                  >Update
                  </button>

                  <button
                    type="button" className="btn btn-danger"
                  >Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>


      </div>
    </>
  );
}

export default DisplayDepartment
