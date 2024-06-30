import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SignInInput } from "@learndev/todo-common";
import LabelledInput from "./LabelledInput";
import { Response } from "../types/interface";
import { HTTP } from "../HTTP";
const SigninForm = () => {
  const [user, setUser] = useState<SignInInput>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  async function sendRequest() {
    try {
      const res = await HTTP.post('/api/v1/auth/signin', JSON.stringify({...user}));
      console.log(res.data);
      const { response } = res.data as Response<{ accessToken: string }>;
      localStorage.setItem("token", response.accessToken);
      navigate("/todo/1");
    } catch (e) {
      alert("Error while signing up");
      // alert the user here that the request failed
    }
  }

  return (<div className="h-screen flex justify-center flex-col">
    <div className="flex justify-center">
      <div>
        <div className="px-10">
          <div className="text-3xl font-bold">
            Sign In to your account
          </div>
          <div className="text-slate-500"> Already have an account?<Link className="pl-2 underline" to={"/signup"}>sign up</Link></div>
        </div>
        <div className="pt-8">
          <LabelledInput onChange={(e) => {
            setUser((previous) => { return { ...previous, email: e.target.value } })
          }} label="email" placeholder="Enter your email" key={"email"} type="email" />
          <LabelledInput onChange={(e) => {
            setUser((previous) => { return { ...previous, password: e.target.value } })
          }} label="password" placeholder="Enter your password" key={"password"} type="password" />
          <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Sign in</button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SigninForm;
