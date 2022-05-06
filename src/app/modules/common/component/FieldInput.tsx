import { ErrorMessage, Field } from "formik"
import { Fragment } from "react"

interface FieldInput {
    label: string, 
    name: string, 
    placeholder: string
}

const FieldInput = ({ label, name, placeholder }: FieldInput) => {
    return (
        <Fragment>
            <label htmlFor="name">{label}</label>
            <Field
                name={name}
                type="text"
                className="mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder={placeholder}
            />
            <ErrorMessage name={name} component="span" className="text-red-400 mb-2"/>
        </Fragment>
    )
}

export default FieldInput