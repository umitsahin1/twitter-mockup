import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useForm } from "react-hook-form";
import axios from "axios";

const SignUp = () => {
  const [data, setData] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const history = useHistory();

  const apiUrl = import.meta.env.VITE_API_URL;

  const onSubmit = (formData) => {
    axios
      .post(`${apiUrl}/twitter/api/v1/auth/register`, formData)
      .then((response) => {
        console.log("Başarılı:", response.data);
        setData(response.data);
        history.push("/login"); // Başarılı olursa login sayfasına yönlendir
      })
      .catch((error) => {
        console.error("Hata:", error.response?.data || error.message);
      });
  };

  return (
    <div>
      <div className="flex justify-center items-center h-dvh ">
        <section className="flex flex-col justify-center items-center ">
          <h1 className="text-4xl mt-5">Sign Up</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="gap-5 flex flex-col bg-white opacity-90 p-10 rounded-3xl min-w-80 md:min-w-[45rem] my-10"
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-lg md:text-xl text-gray-700">Username *</h2>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                className="h-10 w-full text-base bg-gray-100 rounded-sm border border-[#D9D9D9] p-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ml-2"
                {...register("username", {
                  required: "İsim zorunludur*",
                  minLength: {
                    value: 3,
                    message: "İsim en az 3 karakter olmalıdır",
                  },
                })}
              />
              {errors.name && (
                <p className="text-red-600">{errors.username.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-lg md:text-xl text-gray-700">
                Email Address *
              </h2>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@gmail.com"
                className="h-10 w-full text-base bg-gray-100 rounded-sm border border-[#D9D9D9] p-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ml-2"
                {...register("email", {
                  required: "E-posta zorunludur",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Geçersiz e-posta adresi",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-lg md:text-xl text-gray-700">Password *</h2>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="********"
                className="h-10 w-full text-base bg-gray-100 rounded-sm border border-[#D9D9D9] p-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ml-2"
                {...register("password", {
                  required: "Şifre zorunludur",
                  minLength: {
                    value: 8,
                    message: "Şifre en az 8 karakter olmalıdır",
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                    message: "Şifre en az bir harf ve bir rakam içermelidir",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}
            </div>

            <a href="/login" className="text-black text-md mt-2">
              Already have an account?
              <span className="text-[#23A6F0] ml-4 ">Login</span>
            </a>

            <button
              type="submit"
              className="inline-flex items-center justify-center  gap-2 rounded-md text-sm font-medium bg-[#23A6F0] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2  mt-5 w-40 h-12 mx-auto"
            >
              Sign Up
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default SignUp;
