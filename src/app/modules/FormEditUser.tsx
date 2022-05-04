import { Formik } from "formik";
import { useDispatch } from "react-redux";
import FormInput from "./common/component/FormInput";
import { user } from "../stores/infor/index";
import { updateEditUser } from "../stores/infor/index";
import FieldSelect from "./CustomSelect";
import { handleConvertNumberToString } from "../modules/common/helper/department.helper";
import { updateMember } from "../api/member";

interface EditForm {
  edit: boolean;
  editUser: user;
  setEdit: any;
  listDepart: any;
}

const FormEditUser = ({ edit, editUser, setEdit, listDepart }: EditForm) => {
  const dispatch = useDispatch();
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
        departId: handleConvertNumberToString(editUser.departId, listDepart),
      }}
      onSubmit={(values) => {
        const submitEditUser = async () => {
          const userEdited = await updateMember(values, editUser.id);
          dispatch(updateEditUser(userEdited.data));
          setEdit(!edit);
        };
        submitEditUser();
      }}
    >
      <FormInput>
        <FieldSelect></FieldSelect>

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
