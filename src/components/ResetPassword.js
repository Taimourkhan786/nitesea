// src/components/ResetPassword.js
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { 
  auth, 
  verifyPasswordResetCode,
  confirmPasswordReset
} from "./firebase/Firebase";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [oobCode, setOobCode] = useState("");
  const [email, setEmail] = useState("");
  const [isValidCode, setIsValidCode] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    // Get the oobCode from URL parameters
    const params = new URLSearchParams(location.search);
    const code = params.get('oobCode');
    const mode = params.get('mode');
    
    console.log("Reset password - Mode:", mode);
    console.log("Reset password - Code:", code);
    
    if (code && mode === 'resetPassword') {
      setOobCode(code);
      
      // Verify the reset code
      verifyPasswordResetCode(auth, code)
        .then((email) => {
          console.log("Password reset verified for:", email);
          setEmail(email);
          setIsValidCode(true);
          setIsVerifying(false);
        })
        .catch((error) => {
          console.error("Invalid reset code:", error);
          setErrorMessage("Invalid or expired reset link. Please request a new one.");
          setIsValidCode(false);
          setIsVerifying(false);
        });
    } else {
      setErrorMessage("Invalid reset link. Please request a new one.");
      setIsVerifying(false);
    }
  }, [location]);

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

    lockIcon: {
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

    emailDisplay: {
      color: "#00d9ff",
      fontWeight: "500",
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

    passwordStrength: {
      marginTop: "8px",
      height: "4px",
      borderRadius: "2px",
      background: "rgba(255, 255, 255, 0.1)",
      overflow: "hidden",
    },

    passwordStrengthBar: {
      height: "100%",
      borderRadius: "2px",
      transition: "width 0.3s ease",
    },

    passwordStrengthText: {
      fontSize: "12px",
      color: "rgba(255, 255, 255, 0.4)",
      marginTop: "4px",
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

    spinner: {
      display: "inline-block",
      width: "20px",
      height: "20px",
      border: "2px solid rgba(255,255,255,0.3)",
      borderTop: "2px solid #fff",
      borderRadius: "50%",
      animation: "spin 0.8s linear infinite",
      marginRight: "8px",
      verticalAlign: "middle",
    },

    verifyingText: {
      color: "rgba(255, 255, 255, 0.6)",
      textAlign: "center",
      fontSize: "16px",
      padding: "20px 0",
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword(value);
      if (errors.password) {
        setErrors({ ...errors, password: "" });
      }
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
      if (errors.confirmPassword) {
        setErrors({ ...errors, confirmPassword: "" });
      }
    }
    setErrorMessage("");
    setSuccessMessage("");
  };

  const getPasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.length >= 10) strength++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
    if (/\d/.test(pass)) strength++;
    if (/[^a-zA-Z0-9]/.test(pass)) strength++;
    return strength;
  };

  const getPasswordStrengthColor = (strength) => {
    if (strength <= 1) return "#ff4757";
    if (strength <= 2) return "#ff6b81";
    if (strength <= 3) return "#ffa502";
    if (strength <= 4) return "#2ed573";
    return "#00d9ff";
  };

  const getPasswordStrengthLabel = (strength) => {
    if (strength <= 1) return "Weak";
    if (strength <= 2) return "Fair";
    if (strength <= 3) return "Good";
    if (strength <= 4) return "Strong";
    return "Very Strong";
  };

  const validate = () => {
    const newErrors = {};
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isValidCode) {
      setErrorMessage("Invalid reset link. Please request a new one.");
      return;
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await confirmPasswordReset(auth, oobCode, password);
      
      setIsLoading(false);
      setSuccessMessage(
        "✅ Password reset successfully!\n\n" +
        "Your password has been updated. You can now login with your new password."
      );
      
      setPassword("");
      setConfirmPassword("");
      
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      
    } catch (error) {
      setIsLoading(false);
      console.error("Password reset error:", error);
      
      let message = "Unable to reset password. Please try again.";
      
      if (error.code === 'auth/expired-action-code') {
        message = "The reset link has expired. Please request a new one.";
      } else if (error.code === 'auth/invalid-action-code') {
        message = "Invalid reset link. Please request a new one.";
      } else if (error.code === 'auth/weak-password') {
        message = "Password is too weak. Please use a stronger password.";
      } else if (error.code === 'auth/user-disabled') {
        message = "This account has been disabled.";
      } else if (error.code === 'auth/network-request-failed') {
        message = "Network error. Please check your internet connection.";
      }
      
      setErrorMessage(message);
    }
  };

  // Show verifying state
  if (isVerifying) {
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
            <span style={styles.lockIcon}>🔒</span>
            <h2 style={styles.title}>Verifying Link...</h2>
            <div style={styles.verifyingText}>
              <div style={styles.spinner}></div>
              <br />
              <span>Please wait while we verify your reset link.</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show invalid link state
  if (!isValidCode && !isVerifying) {
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
            <span style={styles.lockIcon}>🔒</span>
            <h2 style={styles.title}>Invalid Link</h2>
            <p style={styles.subtitle}>
              The password reset link is invalid or has expired.
            </p>
          </div>
          {errorMessage && (
            <div style={styles.errorMessage}>{errorMessage}</div>
          )}
          <div style={styles.footer}>
            <Link to="/forgot-password" style={styles.loginLink}>
              Request New Reset Link
            </Link>
            <Link to="/login" style={{...styles.loginLink, fontSize: "13px", color: "rgba(255,255,255,0.4)"}}>
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
          
          <span style={styles.lockIcon}>🔒</span>
          
          <h2 style={styles.title}>Reset Password</h2>
          <p style={styles.subtitle}>
            Create a new password for your account.<br />
            <span style={styles.emailDisplay}>{email}</span>
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

        {!successMessage && (
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>New Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.password ? styles.inputError : {}),
                }}
                placeholder="Enter new password (min 6 characters)"
              />
              {password && (
                <>
                  <div style={styles.passwordStrength}>
                    <div style={{
                      ...styles.passwordStrengthBar,
                      width: `${(getPasswordStrength(password) / 5) * 100}%`,
                      background: getPasswordStrengthColor(getPasswordStrength(password)),
                    }} />
                  </div>
                  <span style={styles.passwordStrengthText}>
                    Password Strength: {getPasswordStrengthLabel(getPasswordStrength(password))}
                  </span>
                </>
              )}
              {errors.password && <span style={styles.errorText}>{errors.password}</span>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.confirmPassword ? styles.inputError : {}),
                }}
                placeholder="Confirm your new password"
              />
              {errors.confirmPassword && <span style={styles.errorText}>{errors.confirmPassword}</span>}
            </div>

            <button 
              type="submit" 
              style={{
                ...styles.button,
                ...(isLoading ? styles.buttonDisabled : {}),
              }} 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span style={styles.spinner}></span>
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        )}

        <div style={styles.footer}>
          <Link to="/login" style={styles.loginLink}>
            ← Back to Sign In
          </Link>
          <Link to="/forgot-password" style={{...styles.loginLink, fontSize: "13px", color: "rgba(255,255,255,0.4)"}}>
            Request New Reset Link
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ResetPassword;