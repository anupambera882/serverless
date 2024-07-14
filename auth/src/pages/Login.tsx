import { Link, useNavigate } from "react-router-dom";
import InputButton from "../components/LabelledInput"
import { useState } from "react";
import { SignInInput } from "@learndev/todo-common";
import HTTP from "../HTTP";
import { Response } from "../types/interface";
import useAuth from "../hooks/useAuth";
import useIsLoginState from "../hooks/useIsLoginState";
import SubmitButton from "../components/SubmitButton";
import Quote from "../components/Quote";

const Login = () => {
  const [user, setUser] = useState<SignInInput>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const { setIsLogin } = useIsLoginState();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await HTTP.post('/api/v1/auth/signin', JSON.stringify({ ...user }));
      const { response } = res.data as Response<{ accessToken: string, email: string, role: string }>;
      const { accessToken, email, role } = response;
      setAuth({ email, roles: [role], accessToken });
      setIsLogin(true);
      navigate("/todo");
    } catch (e) {
      alert("Error while signing up");
      // alert the user here that the request failed
    }
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <div className="h-screen flex justify-center flex-col">
          <div className="flex justify-center">
            <div>
              <div className="px-10">
                <div className="text-3xl font-bold">
                  Login In to your account
                </div>
                <div className="text-slate-500"> Already have an account?<Link className="pl-2 underline" to={"/register"}>Register</Link></div>
              </div>
              <div className="pt-8">
                <form onSubmit={handleSubmit}>
                  <InputButton onChange={(e) => {
                    setUser((previous) => { return { ...previous, email: e.target.value } })
                  }} label="email" placeholder="johndoe@example.com" key={"email"} type="email" />
                  <InputButton onChange={(e) => {
                    setUser((previous) => { return { ...previous, password: e.target.value } })
                  }} label="password" placeholder="Enter 6 character or more" key={"password"} type="password" />
                  <SubmitButton label="Login" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block"><Quote /></div>
    </div>
  )
}

export default Login;