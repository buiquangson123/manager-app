import { Field, ErrorMessage } from "formik";
import React, { Fragment } from "react";
import Select from "react-select";

interface DepartmentOption {
  value: string;
  label: string;
}

function FormikSelect({ field, form, listDepart }: any) {
  const departmentOption: DepartmentOption[] = listDepart.reduce((acc: any, cur: any) => {
    return [...acc, { value: cur.name_depart, label: cur.name_depart }]
  }, [])

  const defaultValue = () => {
    let valueDefault: any = [];
    for (let item in form.values.departId) {
      for (let color in departmentOption) {
        if (departmentOption[color].value === form.values.departId[item]) {
          valueDefault = [...valueDefault, departmentOption[color]];
        }
      }
    }
    return valueDefault;
  };

  return (
    <Fragment>
      <label htmlFor="departId">Phòng ban</label>
      <Select
        isMulti
        options={departmentOption as any}
        name={field.name}
        defaultValue={defaultValue || ""}
        onChange={(option: any) => {
          const selectedOption = option.map((item: any) => item.value);
          form.setFieldValue(field.name, selectedOption);
        }}
        className="mb-3"
      />
      <ErrorMessage name="departId" component="span" className="text-red-400 mb-2"/>
    </Fragment>
  );
}

const FieldSelect = ({ listDepart } : any) => <Field name="departId" component={FormikSelect} listDepart={listDepart}/>;

export default FieldSelect;
