import axios from "axios";

export const getDepartment = async () => {
    const listDepartment = await axios.get("http://localhost:3004/departments")
    return listDepartment
}