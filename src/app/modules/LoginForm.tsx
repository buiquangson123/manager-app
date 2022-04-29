import React, { useEffect, useState } from 'react';
import { Formik , Field, Form } from 'formik';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../stores/authen/index'


const LoginForm = () => {
    const dispatch = useDispatch()
    const history = useNavigate();
    return (
        <Formik
            initialValues={{
                password: "",
                email: ""
            }}

            onSubmit={(values) => {
                const getAPIUser = async () => {
                    const user = await axios.get(`http://localhost:3004/users?email=${values.email}`)

                    if(user.data.length > 0) {
                        if (user.data[0].password === values.password) {
                            dispatch(getUser(user.data[0]))
                            history('/');
                        } else {
                            console.log("Email hoặc password sai!!!")
                        }
                    } else {
                        console.log("Email hoặc password sai!!!")
                    }
                }
                getAPIUser();
            }}
        >
            <Form className="my-10 flex m-auto flex-col w-[300px]" >
                <label htmlFor="email">Email</label>
                <Field
                    name="email"
                    type="text"
                    className="mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    placeholder="Nhập email"
                />

                <label htmlFor="password">Password</label>
                <Field
                    name="password"
                    type="text"
                    className="mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    placeholder="Nhập password"
                />

                <button type="submit" className="shadow bg-[#1d3557] hover:bg-[#475C76] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Đăng nhập</button>

            </Form>
        </Formik>
    );
};

export default LoginForm