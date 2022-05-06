
import { Formik, Form, Field } from "formik";
import { filterMembers } from '../api/member';
import { useDispatch } from 'react-redux';
import { filterUser, user } from '../stores/sliceMemberInfor';


interface Header {
    stateAccount: user
}
const Header = ({ stateAccount}: Header) => {
    const dispatch = useDispatch()
    return (
        <div className="Heading flex justify-between">
            <div>
                <p className="text-2xl text-gray-500">{stateAccount.role === "admin" ? "Dashboard" : ""}</p>
            </div>
            <div className="flex justify-around space-x-6">
                <div>
                    <Formik
                        initialValues={{
                            search: ""
                        }}

                        onSubmit={(values) => {
                            const filterMember = async() => {
                                const filteredList = await filterMembers(values.search)
                                if (filteredList) dispatch(filterUser(filteredList.data))
                            }
                            filterMember()
                        }}
                    >
                        <Form>
                            <Field
                                name="search"
                                type="text"
                                placeholder="Nhập từ khóa cần tìm"
                                className="w-[300px] h-8 px-2 border rounded focus:outline-none focus:border-slate-400"   
                            />
                            <button type="submit" className="bg-orange-400 rounded w-14 h-8 ml-2 border border-transparent">
                                <span className="">
                                    <i className="text-slate-500 fa-solid fa-magnifying-glass"></i>
                                </span>
                            </button>
                        </Form>
                    </Formik>
                </div>
                <span>
                    <i className="leading-8 text-gray-700 text-lg fa-solid fa-bell hover:cursor-pointer"></i>
                </span>
            </div>
        </div>
    )
}

export default Header