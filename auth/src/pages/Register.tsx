import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SignUpInput } from "@learndev/todo-common";
import HTTP from "../HTTP";
import InputArea from "../components/LabelledInput";
import SubmitButton from "../components/SubmitButton";
import Quote from "../components/Quote";
const Register = () => {
  const [user, setUser] = useState<SignUpInput>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await HTTP.post('/api/v1/auth/signup', JSON.stringify({ ...user }));
      console.log(res.data);
      navigate("/login");
    } catch (e) {
      alert("Error while signing up")
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
                <div className="text-3xl font-extrabold">
                  Create an account
                </div>
                <div className="text-slate-500">
                  Don't have an account?
                  <Link className="pl-2 underline" to={"/login"}>
                    Login in
                  </Link>
                </div>
              </div>
              <div className="pt-4">
                <form onSubmit={handleSubmit}>
                  <InputArea onChange={(e) => {
                    setUser((previous) => { return { ...previous, firstName: e.target.value } })
                  }} label="firstName" placeholder="John" key={"firstName"} />
                  <InputArea onChange={(e) => {
                    setUser((previous) => { return { ...previous, lastName: e.target.value } })
                  }} label="lastName" placeholder="Doe" key={"lastName"} />
                  <InputArea onChange={(e) => {
                    setUser((previous) => { return { ...previous, email: e.target.value } })
                  }} label="email" placeholder="johndoe@example.com" key={"email"} type="email" />
                  <InputArea onChange={(e) => {
                    setUser((previous) => { return { ...previous, password: e.target.value } })
                  }} label="password" placeholder="Enter 6 character or more" key={"password"} type="password" />
                  <SubmitButton label="Register" />
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

export default Register;
