import { useEffect, useState } from "react";
import "./styles/index.css";
import { test, user } from "./app/stores/sliceMemberInfor/index";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { updateStateUser, deleteUser } from "./app/stores/sliceMemberInfor/index";
import FormAddUser from "./app/modules/common/component/FormAddUser";
import FormEditUser from "./app/modules/common/component/FormEditUser";
import { getListMember, deleteMember, editMember } from "./app/api/member";
import { department, getDepartment } from "./app/api/department";
import MainTable from './app/modules/MainTable'
import Header from './app/modules/Header'
import NavBar from "./app/modules/NavBar";
import { AppDispatch, RootState } from "./app/stores";

function App() {
  const [listDepart, setListDepart] = useState<department[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [add, setAdd] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [editUser, setEditUser] = useState<user>();

  const dispatch = useDispatch();
  const stateInfor: user[] = useSelector((state: any) => state.infor.users);
  const stateLogin = useSelector((state: any) => state.login.account)
  const stateAccount = checkStateAccount() || {}

  //Start useAppDispatch , useAppSelector

  const useAppDispatch = () => useDispatch<AppDispatch>()
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

  const stateNew = useAppSelector((state) => state.infor.users)
  const dispatch1 = useAppDispatch()

  console.log("useAppSelector stateNew: ", stateNew)
  console.log("useAppSelector stateNew: ", dispatch1(test()))

  // End useAppDispatch , useAppSelector

  function checkStateAccount() {
    if (stateLogin.length > 0) return stateLogin
    return JSON.parse(localStorage.getItem("Account") as string)
  }

  useEffect(() => {
    setLoading(true);
    const handleAPI = async () => {
      const listMember = await getListMember();
      const listDepartment = await getDepartment();
      if (listMember.data.length > 0) {
        setLoading(false);
        dispatch(updateStateUser(listMember.data));
      }

      if (listDepartment.data.length > 0) {
        setListDepart(listDepartment.data);
      }
    };
    handleAPI();
  }, []);

  const handleAddUser = () => {
    if (edit) setEdit(!edit);
    setAdd(!add);
  };

  const handleDeleteUser = async (id: number) => {
    const idUser = await deleteMember(id);
    if (idUser !== null || idUser !== undefined || idUser !== "")
      dispatch(deleteUser(id));
  };

  const handleEditUser = async (id: number) => {
    if (add) setAdd(!add);
    const dataMember = await editMember(id);
    if (dataMember) setEditUser(dataMember.data);
    setEdit(!edit);
  };

  return (
    <div className="App">
      <NavBar stateAccount={stateAccount}></NavBar>

      <div className="Container ml-[300px] px-6 mt-3">

        <Header stateAccount={stateAccount}></Header>

        {listDepart && <MainTable 
          loading = {loading}
          stateAccount={stateAccount}
          stateInfor ={stateInfor}
          listDepart={listDepart as any}
          handleAddUser = {handleAddUser}
          handleDeleteUser = {handleDeleteUser}
          handleEditUser = {handleEditUser}
        ></MainTable>}

        {add && listDepart && <FormAddUser add={add} setAdd={setAdd} listDepart={listDepart}></FormAddUser>}
        {edit && editUser && listDepart && (
          <FormEditUser
            edit={edit}
            editUser={editUser}
            setEdit={setEdit}
            listDepart={listDepart}
          ></FormEditUser>
        )}

      </div>
    </div>
  );
}

export default App;
