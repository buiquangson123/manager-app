import { Fragment } from "react"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import { handleConvertNumberToString } from './common/helper/department.helper'
import { user } from '../stores/sliceMemberInfor/index'

interface ListDepart {
    id: number,
    name_depart: string
}

interface MainTable {
    loading: boolean,
    stateAccount: user,
    stateInfor: user[],
    listDepart: ListDepart,
    handleAddUser: () => void,
    handleDeleteUser: (id:number) => void,
    handleEditUser: (id:number) => void
}

const MainTable = ({
    loading,
    stateAccount,
    stateInfor,
    listDepart,
    handleAddUser,
    handleDeleteUser,
    handleEditUser 
}: MainTable) => {
    return (
        <Fragment>
            {loading && <div className="loader m-auto"></div> }
            {!loading && stateAccount.id >= 0 && stateInfor && listDepart && (
                <div className="Container-body mt-5">
                    {stateAccount.role === "admin" && <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={handleAddUser}
                    >
                        Add
                    </Button>}
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
                                    {stateAccount.role === "admin" && (
                                        <TableCell width="15%">Tùy chọn</TableCell>
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {stateInfor.map((user) => (
                                    <TableRow
                                        key={user.name}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {user.name}
                                        </TableCell>
                                        <TableCell align="left">{user.address}</TableCell>
                                        <TableCell align="left">{user.age}</TableCell>
                                        <TableCell align="left">{user.telephone}</TableCell>
                                        <TableCell align="left">{user.email}</TableCell>

                                        <TableCell align="left" className="">
                                            {handleConvertNumberToString(
                                                user.departId,
                                                listDepart
                                            ).map((item:string, index:number) => (
                                                <span key={index} className="inline-block ml-1 px-2 py-1 bg-[#faebd7] rounded-[4px] text-[#d2691e] mb-1 text-center">{item}</span>
                                            ))}
                                        </TableCell>
                                        {stateAccount.role === "admin" && (
                                            <TableCell align="left">
                                                <Stack direction="row" spacing={2}>
                                                    <Button
                                                        variant="outlined"
                                                        startIcon={<DeleteIcon />}
                                                        onClick={() => handleDeleteUser(user.id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        endIcon={<EditIcon />}
                                                        onClick={() => handleEditUser(user.id)}
                                                    >
                                                        Edit
                                                    </Button>
                                                </Stack>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )
            }
        </Fragment>
    )
}

export default MainTable
