import React from "react";
import { Field, Form, ErrorMessage } from "formik";
import FieldInput from "./FieldInput";


const arrField = [
  {
    name: "name",
    label: "Họ và tên",
    placeholder: "Nhập họ và tên"
  },
  {
    name: "address",
    label: "Địa chỉ",
    placeholder: "Nhập địa chỉ"
  },
  {
    name: "age",
    label: "Tuổi",
    placeholder: "Nhập tuổi"
  },
  {
    name: "telephone",
    label: "Số điện thoại",
    placeholder: "Nhập số điện thoại"
  },
  {
    name: "password",
    label: "Mật khẩu",
    placeholder: "Nhập mật khẩu"
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Nhập email"
  },

]
  

const FormInput = ({ children, showOverlay }: any) => {
  return (
    <Form className={`${showOverlay ? "absolute left-[16%] pb-8" : ""} my-14 flex m-auto flex-col w-[400px]`}>

      {
        arrField.map((item, index) => {
          return <FieldInput key={index} label={item.label} name={item.name} placeholder={item.placeholder}></FieldInput>
        })
      }

      <label htmlFor="role">Chức vụ</label>
      <Field
        as="select"
        name="role"
        className="mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
      >
        <option value="" className="text-gray-700" disabled>
          Lựa chọn quyền
        </option>
        <option value="admin">Admin</option>
        <option value="staff">Staff</option>
      </Field>
      <ErrorMessage name="role" component="span" className="text-red-400 mb-2"/>

      {children}
    </Form>
  );
};

export default FormInput;
