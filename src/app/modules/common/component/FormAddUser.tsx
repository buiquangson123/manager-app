import { Formik } from "formik";
import { addStateUser, user } from "../../../stores/sliceMemberInfor/index";
import { useDispatch } from "react-redux";
import FormInput from "./FormInput";
import FieldSelect from "./CustomSelect";
import { addMember } from "../../../api/member";
import * as Yup from 'yup';
import { OverLay } from "../../overlay/overlay.template";

interface AddForm {
  listDepart: any,
  showOverlay: boolean,
  setShowOverlay: (isShow: boolean) => void,
  setAdd: (add: boolean) => void,
}

const FormAddUser = ({ listDepart, setShowOverlay, setAdd, showOverlay }: AddForm) => {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        name: "",
        address: "",
        age: "",
        telephone: "",
        password: "",
        role: "",
        email: "",
        departId: [],
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
        const submitAdd = async () => {
          const addedUser = await addMember(values as any);
          dispatch(addStateUser(addedUser.data));
          setShowOverlay(false)
          setAdd(false)
        };
        submitAdd();
      }}
    >
      <FormInput showOverlay={showOverlay}>
        <FieldSelect listDepart={listDepart}></FieldSelect>
        <button
          type="submit"
          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </FormInput>
    </Formik>
  );
};

export default FormAddUser;
