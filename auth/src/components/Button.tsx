import { ButtonType } from "../types/interface";

const Button = ({ label, type = 'button', onClick }: ButtonType) => {
  return (
    <button type={type} className="flex items-center justify-center rounded-full border border-transparent hover:cursor-pointer focus:outline-none" onClick={onClick}>
      <span className="text-lg text-gray-500">{label}</span>
    </button>
  )
}

export default Button;