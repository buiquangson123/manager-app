import { Field } from "formik";
import React from "react";
import Select from "react-select";

interface ColourOption {
  value: string;
  label: string;
}

export const colourOptions: ColourOption[] = [
  { value: "Phòng kiểm toán", label: "Phòng kiểm toán" },
  { value: "Phòng kế toán", label: "Phòng kế toán" },
  { value: "Phòng hành chính", label: "Phòng hành chính" },
  { value: "Phòng nhân sự", label: "Phòng nhân sự" },
];

function FormikSelect({ field, form }: any) {
  const defaultValue = () => {
    let arrSelect: any = [];
    for (let item in form.values.departId) {
      for (let color in colourOptions) {
        if (colourOptions[color].value === form.values.departId[item]) {
          arrSelect = [...arrSelect, colourOptions[color]];
        }
      }
    }
    return arrSelect;
  };
  return (
    <Select
      isMulti
      options={colourOptions as any}
      name={field.name}
      defaultValue={defaultValue || ""}
      // onBlur={field.onBlur}
      onChange={(option: any) => {
        const selectedOption = option.map((item: any) => item.value);
        form.setFieldValue(field.name, selectedOption);
      }}
    />
  );
}

const FieldSelect = () => <Field name="departId" component={FormikSelect} />;

export default FieldSelect;
