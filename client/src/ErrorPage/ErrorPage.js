import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import style from './Error.module.css';
function ErrorPage() {
    const Navigate = useNavigate();
    return (
        <div className={style.page}>
            <FaExclamationTriangle className={style.errorIcon} />
            <p>
                Data Fetching Error please try again later !!!
            </p>
            <button className='btn btn-primary' onClick={() => {

                Navigate('/');
                window.location.reload()
            }

            }> Refresh To Reload</button>
        </div>
    )
}

export default ErrorPage
