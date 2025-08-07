import { useState } from "react";
import Input from "../../components/Common/Input";
import Button from "../../components/Common/Button";
import { registerUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    user_name: "",
    mobile: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await registerUser(form);
      if (res?.token) {
        localStorage.setItem("token", res.token);
        navigate("/");
      }
    } catch (err) {
      alert("Registration failed.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <Input label="Username" name="user_name" value={form.user_name} onChange={handleChange} />
      <Input label="Mobile" name="mobile" value={form.mobile} onChange={handleChange} />
      <Input label="Email" name="email" value={form.email} onChange={handleChange} />
      <Input label="Password" type="password" name="password" value={form.password} onChange={handleChange} />
      <Button onClick={handleRegister}>Register</Button>
      <h5>Already have account?, Click to <a onClick={() => navigate("/login")}>Login</a></h5>
    </div>
  );
}
