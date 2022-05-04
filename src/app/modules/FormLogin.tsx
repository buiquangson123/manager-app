import { Formik, Field, Form } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../stores/authen/index";
import { getListAccount } from "../api/member";

const FormLogin = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  return (
    <Formik
      initialValues={{
        password: "",
        email: "",
      }}
      onSubmit={async (values) => {
        const listAccount = await getListAccount(values);
        if (listAccount.data.length > 0) {
          if (listAccount.data[0].password === values.password) {
            dispatch(getUser(listAccount.data[0]));
            history("/");
          } else {
            console.log("Email hoặc password sai!!!");
          }
        }
      }}
    >
      <Form className="my-10 flex m-auto flex-col w-[300px]">
        <label htmlFor="email">Email</label>
        <Field
          name="email"
          type="text"
          className="mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          placeholder="Nhập email"
        />

        <label htmlFor="password">Password</label>
        <Field
          name="password"
          type="text"
          className="mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          placeholder="Nhập password"
        />

        <button
          type="submit"
          className="shadow bg-[#1d3557] hover:bg-[#475C76] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
        >
          Đăng nhập
        </button>
      </Form>
    </Formik>
  );
};

export default FormLogin;