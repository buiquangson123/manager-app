import React from 'react';
import { Formik } from 'formik';
import axios from 'axios'
import { addStateUser } from '../stores/infor/index'
import { useDispatch } from 'react-redux';
import FormInput from './FormInput'
import { useNavigate } from 'react-router-dom';

interface AddForm {
    add: boolean,
    setAdd: any
}

const FormAddUser = ({ add, setAdd}:  (AddForm)) => {
    console.log("add", add)
    const dispatch = useDispatch()
    const history = useNavigate();
    return (
        <Formik
            initialValues={{
                name: '',
                address: '',
                age: '',
                telephone: '',
                password: '',
                role: '',
                email: ''}}
           
            onSubmit={(values) => {
                const postAPI = async () => {
                    const dataPost = await axios.post('http://localhost:3004/users', { ...values, age: parseInt(values.age) })

                    console.log("dataPost", dataPost)
                    dispatch(addStateUser(dataPost.data))
                    history('/');
                    setAdd(!add)
                }
                postAPI();
            }}
        >
            <FormInput>
                <button type="submit" className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Submit</button>
            </FormInput>
        </Formik>
    );
};

export default FormAddUser