import { Formik, Field, Form } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../stores/sliceLogin/index";
import { getListAccount } from "../api/member";
import { useState } from "react";
import { user } from "../stores/sliceMemberInfor";

export interface FormLogin {
  password: string,
  email: string
}

const FormLogin = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [error, setError] = useState("")
  return (
    <Formik
      initialValues={{
        password: "",
        email: "",
      }}
      onSubmit={async (values) => {
        const listAccount = await getListAccount(values);
        if (listAccount.data.length > 0) {
          const account = listAccount.data.filter((item: user) => item.password === values.password)
          if (account.length > 0) {
            localStorage.setItem('Account', JSON.stringify(account[0]));
            dispatch(getUser(account[0]));
            history("/");
          } else {
            setError("Email hoặc password không đúng!");
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

        <span className="text-red-400 text-lg mb-2">{error}</span>

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
