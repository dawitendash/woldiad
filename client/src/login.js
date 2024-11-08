import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { FaInfoCircle, FaLock, FaSignInAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Loginvalidation } from "./formvalidation/Loginvalidation";
import style from "./Styles/login.module.css";
const initialValue = {
  username: "",
  password: "",
  remember: false,
};
function Login() {
  localStorage.removeItem('username')
  localStorage.removeItem('Role')
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState('');
  const Navigate = useNavigate();
  const loginsubmit = (values) => {
    setloading(true)
    setTimeout(() => {
      setloading(false);
      const { username, password } = values;
      console.log({ username, password });
      const url = "http://localhost:5000/";
      axios.post(
        url, values
      ).then(res => {
        console.log(res)
        console.log(res.data.id)
        if (res.data.Login && res.data.isAdmin) {
          const num = Math.floor(Math.random() * 90000) + 10000;
          Navigate('/Verfication')
          localStorage.setItem('otp', num)
          localStorage.setItem('username', username);
          localStorage.setItem('Role', res.data.Role);
          localStorage.setItem('fname', res.data.fname);
          localStorage.setItem('lname', res.data.lname);
          localStorage.setItem('email', res.data.email);
        } else if (res.data.Login && res.data.isStudent) {
          const num = Math.floor(Math.random() * 90000) + 10000;
          localStorage.setItem('otp', num)
          Navigate('/Verfication')
          localStorage.setItem('username', username);
          localStorage.setItem('Role', res.data.Role);
          localStorage.setItem('fname', res.data.fname);
          localStorage.setItem('lname', res.data.lname);
          localStorage.setItem('department', res.data.department);
        }
        else if (res.data.Login && res.data.isTeacher) {
          const num = Math.floor(Math.random() * 90000) + 10000;
          localStorage.setItem('otp', num)
          Navigate('/Verfication')
          localStorage.setItem('username', username);
          localStorage.setItem('Role', res.data.Role);
          localStorage.setItem('fname', res.data.fname);
          localStorage.setItem('lname', res.data.lname);
          localStorage.setItem('department', res.data.department);
          sessionStorage.setItem('id', res.data.id)
        }
        else if (res.data.Login && res.data.isHead) {
          const num = Math.floor(Math.random() * 90000) + 10000;
          localStorage.setItem('otp', num)
          Navigate('/Verfication')
          console.log(res.data.id)
          localStorage.setItem('username', username);
          localStorage.setItem('Role', res.data.Role);
          localStorage.setItem('fname', res.data.fname);
          localStorage.setItem('lname', res.data.lname);
          localStorage.setItem('department', res.data.department);
        } else {
          seterr('username or password invalid');
        }
      }).catch(err => {

        if (!err?.response) {
          Navigate('/ErrorPage/ErrorPage')
        } else if (err.response.status === 404) {
          Navigate('/ErrorPage/ErrorPage')
        } else if (err.reponse.status === 500) {
          Navigate('/ErrorPage/ErrorPage')
        }
      })
    }, 2000)
  };
  return (
    <div className={style.form_content}>
      <Formik
        initialValues={initialValue}
        validationSchema={Loginvalidation}
        onSubmit={loginsubmit}
      >
        {({ isSubmitting }) => (
          <Form className={style.login_form}>
            <div>
              {err && (
                <p className="alert alert-danger w-1" id={style.errors}>
                  <FaInfoCircle className='m-2' style={{ color: 'black' }} />{err}
                </p>
              )}
              <h2>
                Sign in
                <FaSignInAlt className={style.icon} />
              </h2>
              <div className={style.username}>
                <label htmlFor="username">Username: </label>
                <Field type="text" name="username" placeholder='username' />
                <FaUser className={style.InputIcons} />
                <ErrorMessage
                  className={style.error} name="username" component="div" />
              </div>
              <div className={style.password}>
                <label htmlFor="password">Password:</label>
                <Field type="password" name="password" placeholder='password' />
                <FaLock className={style.InputIcons} />
                <ErrorMessage
                  className={style.error} name="password" component="div" />
              </div>
              <div className={style.checkbox}>
                <Field type="checkbox" name="remember" />
                <label>Remember Me.</label>

                <Link
                  className={style.forget_password_tag}
                  to="/pages/forget_password"
                >
                  Forget Password?
                </Link>
                <ErrorMessage
                  id={style.block_meg}
                  className={style.error} name="remember" component="div" />
              </div>
              <div className={style.button}>
                <button type="submit" name="submit" disabled={loading}>
                  {
                    loading ? (
                      <>
                        <span className='loader'></span>
                        Please wait...
                      </>
                    ) : (
                      'Login'
                    )
                  }
                </button>
              </div>
              <div className={style.have_no_account}>
                <span>Don't have an account? </span>
                <Link
                  className={style.registration_tag}
                  to="/pages/NewUserRegistration"
                >
                  Register
                </Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default Login;