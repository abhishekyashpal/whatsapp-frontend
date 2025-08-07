import { useState } from "react";
import Input from "../../components/Common/Input";
import Button from "../../components/Common/Button";
import { loginUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await loginUser(form);
      if (res?.token) {
        localStorage.setItem("token", res.token);
        navigate("/");
      }
    } catch (err) {
      alert("Login failed.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <Input label="Email" name="email" value={form.email} onChange={handleChange} />
      <Input label="Password" type="password" name="password" value={form.password} onChange={handleChange} />
      <Button onClick={handleLogin}>Login</Button>

      <h5>Not Registered yet, Click to <a onClick={() => navigate("/register")}>Register</a></h5>
    </div>
  );
}
