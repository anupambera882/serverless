import { InputAreaType } from "../types/interface";

const InputArea = ({ label, placeholder, onChange, type, required = true }: InputAreaType) => {
  return (<>
      <label htmlFor={label} className=" block mb-2 text-sm font-medium text-black">{label}</label>
      <input onChange={onChange} type={type || 'text'} name={label} id={label} className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required={required} autoComplete="off" />
    </>);
}

export default InputArea;