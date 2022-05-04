import React from 'react';
import { Field, Form, } from 'formik';

const FormInput = ({children}:(any)) => {
    return (
        <Form className="my-10 flex m-auto flex-col w-[400px]" >
            <label htmlFor="name">Họ và tên</label>
            <Field
                name="name"
                type="text"
                className="mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder="Nhập họ và tên"
            />

            <label htmlFor="address">Địa chỉ</label>
            <Field
                name="address"
                type="text"
                className="mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder="Nhập địa chỉ"
            />

            <label htmlFor="age">Tuổi</label>
            <Field
                name="age"
                type="text"
                className="mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder="Nhập tuổi"
            />

            <label htmlFor="telephone">Số điện thoại</label>
            <Field
                name="telephone"
                type="text"
                className="mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder="Nhập số điện thoại"
            />

            <label htmlFor="password">Mật khẩu</label>
            <Field
                name="password"
                type="text"
                className="mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder="Nhập mật khẩu"
            />

            <label htmlFor="email">Email</label>
            <Field
                name="email"
                type="text"
                className="mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder="Nhập họ và tên"
            />

            <label htmlFor="role">Role</label>
            <Field
                name="role"
                type="text"
                className="mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder="Nhập họ và tên"
            />

            {children}

        </Form>
    );
};

export default FormInput