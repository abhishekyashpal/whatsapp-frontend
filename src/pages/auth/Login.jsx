import { useEffect, useState } from "react";
import Input from "../../components/Common/Input";
import Button from "../../components/Common/Button";
import { loginUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";


export default function Login() {

  useEffect(() => {
    clearLocalStorage();
  }, []);

  const clearLocalStorage = () => {
    localStorage.removeItem("mobile");
  };
  const [form, setForm] = useState({
    mobile: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(e)
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      console.log("Form data:", form);
      localStorage.setItem("mobile", form.mobile);
      navigate("/");
    } catch (err) {
      alert("Login failed.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <Input label="Mobile" name="mobile" value={form.mobile} onChange={handleChange} />
      {/* <Input label="Password" type="password" name="password" value={form.password} onChange={handleChange} /> */}
      <Button onClick={handleLogin}>Login</Button>

      <h5>Not Registered yet, Click to <a onClick={() => navigate("/register")}>Register</a></h5>
    </div>
  );
}
