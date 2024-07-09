import { useEffect, useState } from "react";

const useIsLoginState = () => {
  const isLogin = localStorage.getItem('isLogin');

  const [value, setValue] = useState(isLogin ? JSON.parse(isLogin) as boolean : false);

  useEffect(() => {
    localStorage.setItem('isLogin', JSON.stringify(value));
  }, [value])

  return { isLogin: value, setIsLogin: setValue };
}

export default useIsLoginState;
