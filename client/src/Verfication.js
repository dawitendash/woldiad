import { Field, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import style from './Styles/Verification.module.css';
const initialValue = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
};

function Verification() {
    const navigate = useNavigate();
    const otp = localStorage.getItem('otp');
    console.log(otp)
    const [timeLeft, setTimeLeft] = useState(60); // Initialize countdown timer
    const inputRefs = useRef([]);


    useEffect(() => {
        if (timeLeft === 0) {
            alert("OTP has expired!");
            navigate('/'); // Redirect to Login because the otp is expered
        }
        const timerId = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(prevTime => prevTime - 1);
            }
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft, navigate]);

    const handleSubmit = (values) => {
        const enteredOtp = values.code1 + values.code2 + values.code3 + values.code4 + values.code5;
        console.log(enteredOtp);

        if (otp === enteredOtp) {
            localStorage.removeItem('otp');
            localStorage.setItem('login', true);
            navigate('/inner_pages/dashboard');
            window.location.reload();
        } else {
            alert("Invalid OTP! Please try again.");
        }
    };

    const handleChange = (index, setFieldValue) => (e) => {
        const { value } = e.target;
        // Allow only numbers
        if (/^[0-9]$/.test(value) || value === '') {
            setFieldValue(`code${index + 1}`, value);
            // Move to next input if value is entered
            if (value && index < 4) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (index) => (e) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <div className={style.verification_code}  >
            <Formik
                initialValues={initialValue}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form>
                        <h2>Enter OTP please</h2>
                        <div className={style.verification_code_container}>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Field
                                    key={index}
                                    type="text"
                                    maxLength='1'
                                    className={style.input}
                                    name={`code${index + 1}`}
                                    innerRef={(el) => (inputRefs.current[index] = el)}
                                    onChange={handleChange(index, setFieldValue)}
                                    onKeyDown={handleKeyDown(index)}
                                />
                            ))}
                        </div>
                        <div className={style.button_container}>
                            <button type='submit' className='btn btn-primary' disabled={isSubmitting || timeLeft === 0}>Verify</button>
                        </div>
                        <div className={timeLeft < 10 ? 'last_ten' : 'time_counter'}>
                            Time left: {timeLeft}s
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Verification;
