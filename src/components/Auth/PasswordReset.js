import { useState } from "react";
import axios from "axios";

const PasswordResetForm = () => {
  const [resetEmail, setResetEmail] = useState("");
  const [isPasswordResetLoading, setIsPasswordResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handlePasswordReset = async (event) => {
    event.preventDefault();

    try {
      setIsPasswordResetLoading(true);

      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCR645Usau9CFI7QsbvX-fL7iehx-P4xU8`,
        JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: resetEmail,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Password reset link sent successfully:", response.data);
      setResetSuccess(true);
    } catch (error) {
      console.error("Error sending password reset email:", error);
    } finally {
      setIsPasswordResetLoading(false);
    }
  };

  return (
    <div>
      {!resetSuccess ? (
        <div>
          <h2>Forgot Password</h2>
          <form onSubmit={handlePasswordReset}>
            <div>
              <label htmlFor="resetEmail">Enter your email:</label>
              <input
                type="email"
                id="resetEmail"
                required
                value={resetEmail}
                onChange={(event) => setResetEmail(event.target.value)}
              />
            </div>
            <div>
              {isPasswordResetLoading ? (
                <p>Loading...</p>
              ) : (
                <button type="submit">Send Reset Link</button>
              )}
            </div>
          </form>
        </div>
      ) : (
        <p>
          Password reset link sent successfully. Please check your email and
          follow the instructions.
        </p>
      )}
    </div>
  );
};

export default PasswordResetForm;
