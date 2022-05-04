import React from 'react';
import { Formik } from 'formik';
import axios from 'axios'
import { addStateUser } from '../stores/infor/index'
import { useDispatch } from 'react-redux';
import FormInput from './common/component/FormInput'
import { useNavigate } from 'react-router-dom';
import FieldSelect from './CustomSelect';
import { handletment} from './FormEditUser'
import { getDepartment } from '../api/department'
import { addMember } from '../api/member'

interface AddForm {
    add: boolean,
    setAdd: any
}

const FormAddUser = ({ add, setAdd}:  (AddForm)) => {
    const dispatch = useDispatch()
    return (
        <Formik
            initialValues={{
                name: '',
                address: '',
                age: '',
                telephone: '',
                password: '',
                role: '',
                email: '',
                departId: ''
            }}
           
            onSubmit={(values) => {
                const getDepartAPI = async () => {
                    const ListDataDepart = await getDepartment()

                    if (ListDataDepart.data && ListDataDepart.data.length > 0) {
                        const dataPost = await addMember(values)
                        dispatch(addStateUser(dataPost.data))
                        setAdd(!add)
                    }
                };
                getDepartAPI();
            }}
        >
            <FormInput>
                <FieldSelect></FieldSelect>
                <button type="submit" className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Submit</button>
            </FormInput>
        </Formik>
    );
};

export default FormAddUser