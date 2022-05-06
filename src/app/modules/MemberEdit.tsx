import { useLocation } from "react-router-dom"
import NavBar from "./NavBar"
import { user } from '../stores/sliceMemberInfor/index'
import FormEditUser from "./common/component/FormEditUser";
import { useEffect, useState } from "react";
import { getDepartment } from "../api/department";
import { editMember } from "../api/member";

type LocationState = { stateAccount: user };

const StaffEdit = () => {
    const location = useLocation()
    const { stateAccount } = location.state as LocationState
    const [edit, setEdit] = useState<boolean>(true);
    const [listDepart, setListDepart] = useState<any>([]);
    const [editUser, setEditUser] = useState<user>();
    useEffect(() => {
        const getListDepart = async() => {
            const listDepartment = await getDepartment()
            const dataMember = await editMember(stateAccount.id);
            if (listDepartment) setListDepart(listDepartment.data)
            if (dataMember) setEditUser(dataMember.data);
        }
        getListDepart()
    }, [])
    return (
        <div>
            <NavBar stateAccount={stateAccount}></NavBar>
            {edit && listDepart.length > 0 && editUser !== undefined && <FormEditUser 
                edit={edit}
                editUser={editUser}
                setEdit={setEdit}
                listDepart={listDepart}
            ></FormEditUser>}
        </div>
    )
}

export default StaffEdit