type props = {
  label?: string;
  required?: boolean;
  name: string;
  register: Function;
  value: unknown;
  inpClassName?: string;
  type?: string;
  placeholder?: string;
  onChange?: Function;
  errors: any;
};

export const AppInput = (props: props) => {
  return (
    <div className="text-start mb-2">
      {props?.label && (
        <label className="small text-start small">
          {props.label}
          {props.required ? <span className="text-danger">*</span> : null}
        </label>
      )}
      <input
        {...props.register(props.name, {
          required: props?.required ? true : false,
        })}
        defaultValue={props?.value}
        type={props.type || "text"}
        className={`form-control ${
          props.inpClassName ? props.inpClassName : ""
        }`}
        placeholder={props?.placeholder || ""}
        name={props.name}
        onChange={props.onChange ? props.onChange : () => {}}
      />
      {props.errors?.[props.name] && (
        <p className="text-danger text-start small">
          {props.errors?.[props.name]["message"]}
        </p>
      )}
    </div>
  );
};
