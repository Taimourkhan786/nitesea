// src/components/ForgotPassword.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, sendPasswordResetEmail } from "./firebase/Firebase";

const ForgotPassword = () => {
  // Remove unused navigate
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
      marginBottom: "32px",
    },

    logo: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
      marginBottom: "16px",
    },

    logoText: {
      color: "#00d9ff",
      fontSize: "28px",
      fontWeight: "700",
    },

    keyIcon: {
      fontSize: "48px",
      display: "block",
      marginBottom: "8px",
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
      lineHeight: "1.6",
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

    successMessage: {
      background: "rgba(0, 217, 255, 0.1)",
      border: "1px solid rgba(0, 217, 255, 0.2)",
      color: "#00d9ff",
      padding: "16px",
      borderRadius: "12px",
      marginBottom: "20px",
      textAlign: "center",
      fontSize: "14px",
      lineHeight: "1.6",
    },

    infoBox: {
      background: "rgba(0, 217, 255, 0.05)",
      border: "1px solid rgba(0, 217, 255, 0.08)",
      borderRadius: "12px",
      padding: "12px 16px",
      marginBottom: "24px",
      display: "flex",
      alignItems: "flex-start",
      gap: "10px",
    },

    infoIcon: {
      fontSize: "18px",
      flexShrink: 0,
      marginTop: "1px",
    },

    infoText: {
      color: "rgba(255, 255, 255, 0.5)",
      fontSize: "13px",
      lineHeight: "1.5",
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
      display: "flex",
      flexDirection: "column",
      gap: "6px",
    },

    loginLink: {
      color: "#00d9ff",
      textDecoration: "none",
      fontWeight: "600",
      fontSize: "14px",
      transition: "color 0.3s ease",
    },

    signupLink: {
      color: "rgba(255, 255, 255, 0.4)",
      textDecoration: "none",
      fontSize: "13px",
      transition: "color 0.3s ease",
    },
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors({ ...errors, email: "" });
    }
    setErrorMessage("");
    setSuccessMessage("");
  };

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // IMPORTANT: Use your custom reset password URL
      await sendPasswordResetEmail(auth, email, {
        url: `${window.location.origin}/reset-password`,
        handleCodeInApp: false,
      });
      
      setIsLoading(false);
      setSuccessMessage(
        "✅ Password reset email sent successfully!\n\n" +
        "Please check your email inbox (and spam folder) for the password reset link."
      );
      
      setEmail("");
      
    } catch (error) {
      setIsLoading(false);
      console.error("Password reset error:", error);
      
      let message = "Unable to send reset email. Please try again.";
      
      if (error.code === 'auth/user-not-found') {
        message = "No account found with this email address.";
      } else if (error.code === 'auth/invalid-email') {
        message = "Invalid email address. Please check and try again.";
      } else if (error.code === 'auth/too-many-requests') {
        message = "Too many requests. Please try again later.";
      } else if (error.code === 'auth/network-request-failed') {
        message = "Network error. Please check your internet connection.";
      }
      
      setErrorMessage(message);
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
          
          <span style={styles.keyIcon}>🔑</span>
          
          <h2 style={styles.title}>Forgot Password</h2>
          <p style={styles.subtitle}>
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {errorMessage && (
          <div style={styles.errorMessage}>
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div style={styles.successMessage}>
            {successMessage.split('\n').map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        )}

        <div style={styles.infoBox}>
          <span style={styles.infoIcon}>💡</span>
          <span style={styles.infoText}>
            You'll receive a password reset link via email. Make sure to check your spam folder if you don't see it.
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.email ? styles.inputError : {}),
              }}
              placeholder="you@example.com"
            />
            {errors.email && <span style={styles.errorText}>{errors.email}</span>}
          </div>

          <button 
            type="submit" 
            style={{
              ...styles.button,
              ...(isLoading ? styles.buttonDisabled : {}),
            }} 
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Email"}
          </button>
        </form>

        <div style={styles.footer}>
          <Link to="/login" style={styles.loginLink}>
            ← Back to Sign In
          </Link>
          <Link to="/signup" style={styles.signupLink}>
            Create New Account
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

export default ForgotPassword;