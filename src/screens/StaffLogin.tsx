import { FieldValues, useForm } from "react-hook-form";
import { AppInput } from "../commonUi/AppInpurt";
import styles from "./login.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../zodSchemas/staffSchemas";
import { staffAxios } from "../axios/staffAxios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const StaffLogin = () => {
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const state = watch();
  const navigate = useNavigate();
  const submit = async (data: FieldValues) => {
    const apiRes = await staffAxios.post("/auth/login", data, {
      withCredentials: true,
    });
    if (apiRes?.data?.success) {
      navigate("/");
    } else {
      toast.error(apiRes?.data?.errorMessage);
    }
  };

  return (
    <div className={styles.staffLogin}>
      <h3 className="text-white">
        <i>
          Kitchen-Link Deliveries <i className="fa-solid fa-truck"></i>
        </i>
      </h3>
      <div className={styles.loginCont}>
        <h5 className="text-center">Staff Login</h5>
        <form action="" onSubmit={handleSubmit(submit)}>
          <AppInput
            errors={errors}
            name="email"
            value={state.email}
            register={register}
            label="Email"
            required={true}
            type="email"
          />
          <AppInput
            errors={errors}
            name="password"
            value={state.password}
            register={register}
            label="Password"
            required={true}
            type="password"
          />

          <button className="btn  btn-primary w-100 mt-3" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
