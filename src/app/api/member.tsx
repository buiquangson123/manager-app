import axios from "axios";
import { handleConvertStringToNumber } from "../modules/common/helper/department.helper";
import { getDepartment } from "../api/department";

export const getListAccount = async (values: any) => {
  const accounts = await axios.get(
    `http://localhost:3004/users?email=${values.email}`
  );
  return accounts;
};

export const getListMember = async () => {
  const members = await axios.get("http://localhost:3004/users");
  return members;
};

export const deleteMember = async (id: number) => {
  const idMember = await axios.delete(`http://localhost:3004/users/${id}`);
  return idMember;
};

export const editMember = async (id: number) => {
  const dataMember = await axios.get(`http://localhost:3004/users/${id}`);
  return dataMember;
};

export const addMember = async (values: any) => {
  const ListDataDepart = await getDepartment();
  const addMember = await axios.post("http://localhost:3004/users", {
    ...values,
    age: parseInt(values.age),
    departId: handleConvertStringToNumber(values.departId, ListDataDepart.data),
  });
  return addMember;
};

export const updateMember = async (values: any, id: number) => {
  const ListDataDepart = await getDepartment();
  const addMember = await axios.put(`http://localhost:3004/users/${id}`, {
    ...values,
    age: parseInt(values.age),
    departId: handleConvertStringToNumber(values.departId, ListDataDepart.data),
  });
  return addMember;
};
