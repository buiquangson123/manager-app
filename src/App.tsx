import React, { useEffect, useState } from 'react';
import './styles/index.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios'
import {user} from './app/stores/infor/index'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './app/stores/index'
import { updateStateUser, deleteUser } from './app/stores/infor/index'
import FormAddUser from './app/modules/FormAddUser'
import FormEditUser from './app/modules/FormEditUser'
import { Link } from "react-router-dom";

function App() {
  const [listUser, setListUser] = useState<user[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [add, setAdd] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false)
  const [editUser, setEditUser] = useState<user>()
  const dispatch = useDispatch()
  const stateInfor: user[] = useSelector((state: any) => state.infor.users)
  const stateAuthen = useSelector((state:any) => state.authen.authen)

  console.log("stateInfor: ", stateInfor)


  function NavChildren({ icon, title, active
  }: { icon: string, title: string, active: boolean}) {
    return (
      <li className={`hover:bg-indigo-400 my-2 cursor-pointer p-3 rounded-md ${active ? "bg-indigo-400 text-white" : ""}`}>
        <i className={`text-gray-500 fa-solid ${icon} ${active ? "bg-indigo-400 text-white" : ""}`}></i>
        <span className='text-lg ml-3'>{title}</span>
      </li>
    )
  }

  useEffect( () => {
    setLoading(true)
    const getAPI = async () => {
      const ListData = await axios.get('http://localhost:3004/users')
      
      if (ListData.data && ListData.data.length > 0) {
        setListUser(ListData.data)
        setLoading(false)
        dispatch(updateStateUser(ListData.data))
      }
      
    }
    getAPI();

  }, [])

  const handleAddUser = () => {
    if(edit) setEdit(!edit)
    setAdd(!add)
  }

  const handleDeleteUser = (id: number) => {
    const deleteAPI = async () => {
      await axios.delete(`http://localhost:3004/users/${id}`)
      dispatch(deleteUser(id))
    }
    deleteAPI();
  }

  const handleEditUser = (id: number) => {
    if (add) setAdd(!add)
    const editAPI = async () => {
      const userEdit = await axios.get(`http://localhost:3004/users/${id}`)
      setEditUser(userEdit.data)
    }
    if (edit) {
      editAPI();
    } else {
      setEdit(!edit)
      editAPI();
    }
  }
  return (
    <div className="App">
      <div className='Nav fixed top-0 left-0 bottom-0 w-[300px] shadow-xl'>
        <div className='flex my-3 justify-center'>
          <img 
            src="https://haycafe.vn/wp-content/uploads/2021/12/Hinh-nen-cute-338x600.jpg" 
            alt="error img" 
            className='w-[40px] h-[40px] rounded-[100%]'
          />
          {stateAuthen && <span className='leading-10 ml-3 text-gray-500 text-xl font-semibold uppercase'>{stateAuthen.name}</span>}
        </div>
        <div className='border w-[65%] border-stone-500r m-auto'></div>
        <div className='mx-5 mt-5'>
          <ul className='list-none '>
            <NavChildren icon={"fa-user"} title={"User Profile"} active={true}/>
            <NavChildren icon={"fa-bell"} title={"Notification"} active={false}/>
            <NavChildren icon={"fa-gear"} title={"Setting"} active={false}/>
            <Link to="/login">Login</Link>
          </ul>
        </div>
      </div>
      <div className='Container ml-[300px] px-6 mt-3'>
        <div className='Heading flex justify-between'>
          <div><p className='text-2xl text-gray-500'>Dashboard</p></div>
          <div className='flex justify-around space-x-6'>
            <div>
              <input type="text" placeholder='Nhập từ khóa cần tìm' className='w-[300px] h-8 px-2 border rounded focus:outline-none focus:border-slate-400'></input>
              <button className='bg-orange-400 rounded w-14 h-8 ml-2 border border-transparent'>
                <span className=''>
                  <i className="text-slate-500 fa-solid fa-magnifying-glass"></i>
                </span>
              </button>
            </div>
            <span><i className="leading-8 text-gray-700 text-lg fa-solid fa-bell hover:cursor-pointer"></i></span>
            <div className="user-infor relative">
              <i className="leading-8 text-gray-700 text-lg fa-solid fa-user hover:cursor-pointer"></i>
              <div className='hidden absolute top-full right-0 bg-gray-300 w-[120px] rounded overflow-hidden'>
                <ul className="">
                  <li className="p-2 hover:bg-gray-500 hover:text-white hover:cursor-pointer">Thông tin</li>
                  <li className="p-2 hover:bg-gray-500 hover:text-white hover:cursor-pointer">Đăng nhập</li>
                  <li className="p-2 hover:bg-gray-500 hover:text-white hover:cursor-pointer">Thoát</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {loading && <div>Loading....</div>}
        {!loading && stateAuthen && stateInfor &&
          <div className='Container-body mt-5'>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddUser}>Add</Button>
            <TableContainer component={Paper} className="mt-3">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell width="15%">Họ và tên</TableCell>
                    <TableCell width="10%">Địa chỉ</TableCell>
                    <TableCell width="10%">Tuổi</TableCell>
                    <TableCell width="10%">Số điện thoại</TableCell>
                    <TableCell width="15%">Email</TableCell>
                    <TableCell width="25%">Phòng ban</TableCell>
                    {stateAuthen.role === "admin" && <TableCell width="15%">Tùy chọn</TableCell> }
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stateInfor.map(user => (
                    <TableRow
                      key={user.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {user.name}
                      </TableCell>
                      <TableCell align="left">{user.address}</TableCell>
                      <TableCell align="left">{user.age}</TableCell>
                      <TableCell align="left">{user.telephone}</TableCell>
                      <TableCell align="left">{user.email}</TableCell>
                      
                      {/* <TableCell align="left">{user.departId[0] as number}</TableCell> */}
                      { stateAuthen.role === "admin" && 
                        <TableCell align="left">
                          <Stack direction="row" spacing={2}>
                            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                            <Button variant="contained" endIcon={<EditIcon />} onClick={() => handleEditUser(user.id)}>Edit</Button>
                          </Stack>
                        </TableCell> 
                      }
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        }

        {add && <FormAddUser add={add} setAdd={setAdd}></FormAddUser>}
        {edit && editUser && <FormEditUser edit={edit} editUser={editUser}></FormEditUser>}
      </div>
    </div>
  );
}

export default App;
