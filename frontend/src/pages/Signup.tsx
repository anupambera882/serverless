import Quote from "../components/Quote";
import SignupForm from "../components/SignupForm";

const Signup = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div><SignupForm /></div>
      <div className="hidden lg:block"><Quote /></div>
    </div>
  )
}

export default Signup;