import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  auth, 
  googleProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  db
} from "./firebase/Firebase";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      padding: "20px",
      position: "relative",
      overflow: "hidden",
    },

    bgCircle1: {
      position: "absolute",
      width: "300px",
      height: "300px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(0, 217, 255, 0.1), transparent 70%)",
      top: "-100px",
      right: "-100px",
      animation: "float 8s ease-in-out infinite",
    },

    bgCircle2: {
      position: "absolute",
      width: "200px",
      height: "200px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(0, 119, 255, 0.08), transparent 70%)",
      bottom: "-50px",
      left: "-50px",
      animation: "float 10s ease-in-out infinite reverse",
    },

    card: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      borderRadius: "24px",
      padding: "48px 40px",
      width: "100%",
      maxWidth: "440px",
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      position: "relative",
      zIndex: 1,
    },

    header: {
      textAlign: "center",
      marginBottom: "40px",
    },

    logo: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
      marginBottom: "12px",
    },

    logoText: {
      color: "#00d9ff",
      fontSize: "28px",
      fontWeight: "700",
    },

    title: {
      color: "#ffffff",
      fontSize: "24px",
      fontWeight: "600",
      marginBottom: "8px",
    },

    subtitle: {
      color: "rgba(255, 255, 255, 0.6)",
      fontSize: "14px",
    },

    errorMessage: {
      background: "rgba(255, 71, 87, 0.1)",
      border: "1px solid rgba(255, 71, 87, 0.2)",
      color: "#ff4757",
      padding: "12px",
      borderRadius: "12px",
      marginBottom: "20px",
      textAlign: "center",
      fontSize: "14px",
    },

    formGroup: {
      marginBottom: "24px",
    },

    label: {
      display: "block",
      color: "rgba(255, 255, 255, 0.8)",
      fontSize: "14px",
      fontWeight: "500",
      marginBottom: "8px",
    },

    input: {
      width: "100%",
      padding: "12px 16px",
      background: "rgba(255, 255, 255, 0.06)",
      border: "2px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "12px",
      color: "#ffffff",
      fontSize: "15px",
      transition: "all 0.3s ease",
      outline: "none",
      boxSizing: "border-box",
    },

    inputError: {
      borderColor: "#ff4757",
    },

    errorText: {
      color: "#ff4757",
      fontSize: "12px",
      marginTop: "6px",
      display: "block",
    },

    optionsRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "28px",
    },

    checkbox: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: "rgba(255, 255, 255, 0.7)",
      fontSize: "14px",
      cursor: "pointer",
    },

    checkboxInput: {
      width: "18px",
      height: "18px",
      accentColor: "#00d9ff",
      cursor: "pointer",
    },

    forgotLink: {
      color: "#00d9ff",
      textDecoration: "none",
      fontSize: "14px",
    },

    button: {
      width: "100%",
      padding: "14px",
      background: "linear-gradient(135deg, #00d9ff, #0077ff)",
      color: "#fff",
      border: "none",
      borderRadius: "12px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 20px rgba(0, 217, 255, 0.3)",
    },

    buttonDisabled: {
      opacity: 0.6,
      cursor: "not-allowed",
    },

    footer: {
      textAlign: "center",
      marginTop: "28px",
      color: "rgba(255, 255, 255, 0.6)",
      fontSize: "14px",
    },

    signupLink: {
      color: "#00d9ff",
      textDecoration: "none",
      fontWeight: "600",
    },

    divider: {
      display: "flex",
      alignItems: "center",
      margin: "24px 0",
      gap: "16px",
    },

    dividerLine: {
      flex: 1,
      height: "1px",
      background: "rgba(255, 255, 255, 0.08)",
    },

    dividerText: {
      color: "rgba(255, 255, 255, 0.4)",
      fontSize: "12px",
      whiteSpace: "nowrap",
    },

    socialButtons: {
      display: "flex",
      justifyContent: "center",
      gap: "12px",
    },

    socialButton: {
      flex: 1,
      maxWidth: "200px",
      padding: "12px",
      background: "rgba(255, 255, 255, 0.06)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      borderRadius: "12px",
      color: "rgba(255, 255, 255, 0.8)",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
    },

    googleButton: {
      background: "#ffffff",
      color: "#333333",
      border: "1px solid #dadce0",
    },

    socialButtonDisabled: {
      opacity: 0.6,
      cursor: "not-allowed",
    },

    googleIcon: {
      width: "20px",
      height: "20px",
    },
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    setErrorMessage("");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  // Save user to Firestore (silent - no user messages)
  const saveUserToFirestore = async (user) => {
    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName || user.email?.split('@')[0] || "User",
          email: user.email,
          photoURL: user.photoURL || null,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        });
      } else {
        await updateDoc(userRef, {
          lastLogin: new Date().toISOString(),
        });
      }
    } catch (error) {
      // Silent fail - no user notification
      console.error("Error saving user to Firestore:", error);
    }
  };

  // Email/Password Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      
      const user = userCredential.user;
      await saveUserToFirestore(user);
      
      localStorage.setItem("authToken", user.accessToken);
      localStorage.setItem("userName", user.displayName || user.email?.split('@')[0] || "User");
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userUID", user.uid);
      
      setIsLoading(false);
      navigate("/");
      setTimeout(() => {
        window.location.reload();
      }, 100);
      
    } catch (error) {
      setIsLoading(false);
      // Silent fail - show generic message only
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setErrorMessage("");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      await saveUserToFirestore(user);
      
      localStorage.setItem("authToken", user.accessToken);
      localStorage.setItem("userName", user.displayName || user.email?.split('@')[0] || "User");
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userUID", user.uid);
      localStorage.setItem("userPhoto", user.photoURL || "");
      
      setIsGoogleLoading(false);
      navigate("/");
      setTimeout(() => {
        window.location.reload();
      }, 100);
      
    } catch (error) {
      setIsGoogleLoading(false);
      // Silent fail - show generic message only
      setErrorMessage("Unable to sign in with Google. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.bgCircle1}></div>
      <div style={styles.bgCircle2}></div>

      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logo}>
            <img src="/logo192.png" width="40" height="40" alt="NiteSea" />
            <span style={styles.logoText}>NiteSea</span>
          </div>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Sign in to continue your journey</p>
        </div>

        {errorMessage && (
          <div style={styles.errorMessage}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.email ? styles.inputError : {}),
              }}
              placeholder="you@example.com"
            />
            {errors.email && <span style={styles.errorText}>{errors.email}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.password ? styles.inputError : {}),
              }}
              placeholder="Enter your password"
            />
            {errors.password && <span style={styles.errorText}>{errors.password}</span>}
          </div>

          <div style={styles.optionsRow}>
            <label style={styles.checkbox}>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                style={styles.checkboxInput}
              />
              Remember me
            </label>
            <Link to="/forgot-password" style={styles.forgotLink}>
              Forgot password?
            </Link>
          </div>

          <button 
            type="submit" 
            style={{
              ...styles.button,
              ...(isLoading ? styles.buttonDisabled : {}),
            }} 
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div style={styles.divider}>
          <div style={styles.dividerLine}></div>
          <span style={styles.dividerText}>OR CONTINUE WITH</span>
          <div style={styles.dividerLine}></div>
        </div>

        <div style={styles.socialButtons}>
          <button 
            style={{
              ...styles.socialButton,
              ...styles.googleButton,
              ...(isGoogleLoading ? styles.socialButtonDisabled : {}),
            }}
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
          >
            <svg style={styles.googleIcon} viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            {isGoogleLoading ? "Signing in..." : "Continue with Google"}
          </button>
        </div>

        <div style={styles.footer}>
          Don't have an account?{" "}
          <Link to="/signup" style={styles.signupLink}>
            Sign Up
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default Login;