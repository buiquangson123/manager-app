import { Formik } from "formik";
import { useDispatch } from "react-redux";
import FormInput from "./FormInput";
import { user } from "../../../stores/sliceMemberInfor/index";
import { updateEditUser } from "../../../stores/sliceMemberInfor/index";
import FieldSelect from "./CustomSelect";
import { handleConvertNumberToString } from "../helper/department.helper";
import { updateMember } from "../../../api/member";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'; 

interface EditForm {
  edit: boolean,
  editUser: user,
  setEdit: any,
  listDepart: any,
  showOverlay: boolean,
  setShowOverlay: (isShow: boolean) => void
}

const FormEditUser = ({ edit, editUser, setEdit, listDepart, setShowOverlay, showOverlay }: EditForm) => {
  const dispatch = useDispatch();
  const history = useNavigate();
 
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
        departId: handleConvertNumberToString(editUser.departId, listDepart)
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(15, 'Ít nhất 15 kí tự hoặc hơn')
          .required('Bạn cần nhập họ và tên'),
        address: Yup.string()
          .required('Bạn cần nhập địa chỉ'),
        email: Yup.string()
          .email('Email chưa đúng định dạng')
          .required('Bạn cần nhập email'),
        password: Yup.string()
          .required('Bạn cần nhập mật khẩu')
          .min(8, 'Mật khẩu cần ít nhất 8 kí tự'),
        age: Yup.number()
          .typeError('Tuổi phải là số')
          .positive('Tuổi phải lớn hơn 0')
          .required('Bạn cần nhập tuổi'),
        telephone: Yup.number()
          .typeError('Số điện thoại phải là số')
          .required('Bạn cần nhập số điện thoại'),
        role: Yup.string()
          .oneOf(
            ['admin', 'staff'],
            'Bạn cần chọn chức vụ'
          )
          .required('Bạn cần chọn chức vụ'),
        departId: Yup.array()
          .min(1, "Cần chọn ít nhất một phòng ban")
          .required('Bạn cần chọn phòng ban'),
      })}
      onSubmit={(values) => {
        const submitEdit = async () => {
          const editedUser = await updateMember(values as any, editUser.id);
          dispatch(updateEditUser(editedUser.data));
          setEdit(!edit);
          setShowOverlay(false)
          history("/");
        };
        submitEdit();
      }}
    >
      <FormInput showOverlay={showOverlay}>
        <FieldSelect listDepart={listDepart}></FieldSelect>
        
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
