import { useState } from "react"
import axios from "axios"
import { API_ROUTES, PAGE_ROUTES } from "../Routes/apiRoutes";

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("");
    
  const handleLogin = async () => {
    
    try{
      const res = await axios.post(API_ROUTES.AUTH.LOGIN,{ email, password })

      // Save the token
      localStorage.setItem("token", res.data.accessToken)
      localStorage.setItem("refreshToken", res.data.refreshToken)

      // Save the user
      localStorage.setItem("user", JSON.stringify(res.data.user))

      // Redirect to dashboard after successful login
      window.location.href = PAGE_ROUTES.DASHBOARD
    }
    catch(err) {
      setError("Invalid email or password")
    }
  };
  

  return (
   <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 100 }}>
      <h2>Order Management System</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 300 }}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: 8, fontSize: 14 }}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 8, fontSize: 14 }}
        />
        {error && <p style={{ color: "red", margin: 0 }}>{error}</p>}
        <button onClick={handleLogin} style={{ padding: 10, fontSize: 14, cursor: "pointer" }}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;