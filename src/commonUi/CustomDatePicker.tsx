import moment from "moment";
import { useState } from "react";
import DatePicker from "react-datepicker";

export const CustomDateRange = (props: {
  defaultValue: string;
  onChange: ({}) => void;
  name: string;
}) => {
  const [value, setValue] = useState<any>([new Date(), new Date()]);
  return (
    <DatePicker
      value={props.defaultValue}
      onChange={(date) => props.onChange({ [props.name]: date })}
      className="form-control"
    />
  );
};
