import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import FormInput from "./common/component/FormInput";
import { user } from "../stores/infor/index";
import { updateEditUser } from "../stores/infor/index";
import FieldSelect from "./CustomSelect";
import { handleDepartment } from "../../App"

interface EditForm {
  edit: boolean;
  editUser: user;
  setEdit: any;
  listDepart: any
}

export const handletment = (arr: any, data: any) => {
  let arrNew: any = [];
  for (const x in arr) {
    for (const y in data) {
      if (arr[x] === data[y].name_depart) {
        arrNew = [...arrNew, data[y].id];
      }
    }
  }
  return arrNew;
};

const FormEditUser = ({ edit, editUser, setEdit, listDepart }: EditForm) => {
  const dispatch = useDispatch();
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
        departId: handleDepartment(editUser.departId, listDepart)
      }}
      onSubmit={(values) => {
        const getDepartAPI = async () => {
          const ListDataDepart = await axios.get(
            "http://localhost:3004/departments"
          );

          if (ListDataDepart.data && ListDataDepart.data.length > 0) {
            const updateEditAPI = async () => {
              const dataEdit = await axios.put(
                `http://localhost:3004/users/${editUser.id}`,
                { ...values, departId: handletment(values.departId, ListDataDepart.data)}
              );
    
              dispatch(updateEditUser(dataEdit.data));
              setEdit(!edit);
            };
            updateEditAPI();
          }
        };
        getDepartAPI();

      }}
    >
      <FormInput>
        <FieldSelect></FieldSelect>

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
