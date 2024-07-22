import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Join = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const SignUp = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/register",
        inputValue
      );
      setCookie("accessToken", data["accessToken"], { path: "/" });
      navigate("/blog");
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <input type="email" name="email" onChange={inputChangeHandler} />
      <input type="password" name="password" onChange={inputChangeHandler} />
      <button onClick={SignUp}>회원가입</button>
    </div>
  );
};

export default Join;
