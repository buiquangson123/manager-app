import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import FormInput from "./FormInput";
import { user } from "../stores/infor/index";
import { updateEditUser } from "../stores/infor/index";

interface EditForm {
  edit: boolean;
  editUser: user;
  setEdit: any;
}

const FormEditUser = ({ edit, editUser, setEdit }: EditForm) => {
  const dispatch = useDispatch();
  console.log("edit: ", edit);
  console.log("editUser: ", editUser);

  return (
    <Formik
      initialValues={{
        name: editUser.name,
        address: editUser.address,
        age: editUser.age,
        telephone: editUser.telephone,
        password: editUser.password,
        role: editUser.role,
        email: editUser.email,
      }}
      onSubmit={(values) => {
        const updateEditAPI = async () => {
          const dataEdit = await axios.put(
            `http://localhost:3004/users/${editUser.id}`,
            values
          );

          console.log("dataPost", dataEdit);
          dispatch(updateEditUser(dataEdit.data));
          setEdit(!edit);
        };
        updateEditAPI();
      }}
    >
      <FormInput>
        <button
          type="submit"
          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
        >
          Update
        </button>
      </FormInput>
    </Formik>
  );
};

export default FormEditUser;
