import styles from "./login.module.css";
import LogoIcon from "../components/logoIcon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { login } from "../utils/auth";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<Record<string, string>>({});
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const navigate = useNavigate();
  const validate = () => {
    const newError: Record<string, string> = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) newError.email = "Invalid email format";
    if (!password.trim()) newError.password = "Password should not be empty";
    return newError;
  };
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setError({});
      const newErrors = validate();
      setError(newErrors);
      if (Object.keys(newErrors).length > 0) return;
      const res = await login(email, password);
      if (res.data.role === "manager") navigate("/overview");
      else navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) setError({ server: err.message });
      console.log("Inside catch block");
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginDiv}>
        <div className={styles.loginHeaderDiv}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <LogoIcon />
            <h2>LeaveFlow</h2>
          </div>
          <h3>Welcome back</h3>
          <p>Please enter your credentials to access your account</p>
        </div>
        {error && error.server && (
          <span className={styles.error}>{error.server}</span>
        )}
        <form onSubmit={handleSubmit}>
          <div className={styles.loginInputContainer}>
            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              value={email}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="marcus.vance@company.com"
              required
            />
            {error && error.email && (
              <span className={styles.error}>{error.email}</span>
            )}
          </div>
          <div className={styles.loginInputContainer}>
            <label htmlFor="password">Password</label>
            <div className={styles.passwordContainer}>
              <input
                type={isOpen ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                placeholder="password"
                required
              />
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={styles.eyeIcon}
              >
                {isOpen ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {error && error.password && (
              <span className={styles.error}>{error.password}</span>
            )}
          </div>
          <div className={styles.submitButtonDiv}>
            <button type="submit">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
