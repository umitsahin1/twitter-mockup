import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";

const LoginForm = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  function validatePassword(str) {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(str) || "Strong password giriniz.";
  }

  function onSubmitFn(data) {
    axios
      .post("https://reqres.in/api/users", data)
      .then((response) => {
        toast.success("Giriş başarılı id" + response.data.id);
        history.push("/feed");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  return (
    <div className="flex flex-col gap-4 w-96 ">
      <i className="fa-brands fa-twitter text-blue-400 fa-2xl mb-6"></i>
      <h2 className="text-3xl font-bold">Log in to Twitter</h2>
      <form onSubmit={handleSubmit(onSubmitFn)}>
        <div className="mb-4 flex flex-col gap-1 ">
          <input
            className="p-2 border-2 border-gray w-full mb-3"
            placeholder="Phone number, email-address"
            {...register("email", {
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Geçerli bir email adresi giriniz",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500  bg-red-100 p-1 rounded-lg">
              {errors.email.message}
            </span>
          )}
          <input
            className="p-2 border-2 border-gray w-full"
            placeholder="Password"
            required
            {...register("password", {
              minLength: {
                value: 8,
                message: "Şifreniz en az 8 karakter olmalıdır",
              },
              maxLength: {
                value: 12,
                message: "Şifreniz en fazla 12 karakter olmalıdır",
              },
              validate: { validatePassword },
            })}
          />
          {errors.password && (
            <span className="text-red-500 bg-red-100 p-2 rounded-lg">
              {errors.password && errors.password.message}
            </span>
          )}
        </div>
        <button
          className="rounded-full text-white bg-blue-400 p-4 text-center w-full"
          type="submit"
          disabled={!isValid}
        >
          Log In
        </button>
      </form>
      <div className="text-blue-400 flex justify-between">
        <Link to="/forgot-password">Forgot password?</Link>
        <Link to="/signup">Sign up to Twitter</Link>
      </div>
    </div>
  );
};

export default LoginForm;
