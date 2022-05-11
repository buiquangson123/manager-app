import axios from "axios";

export interface department {
    id: number,
    name_depart: string
}

export const getDepartment = async () => {
    const listDepartment = await axios.get("http://localhost:3004/departments")
    return listDepartment
}