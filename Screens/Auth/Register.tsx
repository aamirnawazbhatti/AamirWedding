import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from '../../sharecomponents/Layout';
import { BASE_URL } from "../../src/config";

function Register() {
  const navigate = useNavigate();
  const [heNumber, setHeNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!heNumber || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");
    // navigate("/home");
    try {
      const response = await fetch(`${BASE_URL}/4DACTION/TLMS_user_sign_up_verify_api`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          he_no: heNumber,

        }),
      });

      // NOTE: If the API returns a 200 OK even on login failure, 
      // we need to check the data structure.
      const dataOne = await response.json();
      console.log("TLMS_user_sign_up_verify_ap API Response:", dataOne);


      if (
        response.ok &&
        (dataOne.login_status != "Already Signed Up" && dataOne.login_status != "Invalid HE Number")
      ) {
        console.log("emp_id", dataOne.emp_id)
        try {
          const response = await fetch(`${BASE_URL}/4DACTION/TLMS_user_sign_up_submit_api`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              emp_id: dataOne.emp_id,
              password: password,
            }),
          });

          // NOTE: If the API returns a 200 OK even on login failure, 
          // we need to check the data structure.
          const data = await response.json();
          console.log("TLMS_user_sign_up_submit_api API Response:", data);

          // Adjust the condition below based on the actual API response format
          // (e.g., if it uses 'status', 'success', 'resultCode', etc.)
          if (
            response.ok &&
            (data.status == "Successful")
          ) {
            alert("Successfully created account, please login.");
            navigate("/");
          } else {
            setError(data.status || data.message || data.error || "Invalid credentials. Please try again.");
          }
        } catch (err) {
          console.error("Login Error:", err);
          // For demonstration purposes, if the API is not reachable, we might still want to navigate
          // but let's show an error for now.
          setError("Unable to connect to server. Please check your connection.");
        } finally {
          setLoading(false);
        }





      } else {
        setError(dataOne.login_status || dataOne.message || dataOne.error || "Invalid credentials. Please try again.");
      }

    } catch (err) {
      console.error("Login Error:", err);
      // For demonstration purposes, if the API is not reachable, we might still want to navigate
      // but let's show an error for now.
      setError("Unable to connect to server. Please check your connection.");
    } finally {
      setLoading(false);
    }



  };

  return (
    <Layout>
      <div className="container" style={{
        minHeight: "calc(100vh - 170px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem"
      }}>
        <div className="card" style={{
          width: "100%",
          maxWidth: "450px",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem"
        }}>
          <div style={{ textAlign: "center" }}>
            <img
              src="/HELogo.png"
              alt="Logo"
              style={{ width: "120px", height: "auto", marginBottom: "1rem" }}
            />
            <h2 style={{
              fontSize: "1.75rem",
              fontWeight: "bold",
              color: "var(--primary)",
              marginBottom: "0.5rem"
            }}>
              Welcome To SignUp Window
            </h2>
            <p className="cardDiscription">Please enter your details to Sign Up</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500", color: "var(--gray-800)" }}>
                HE Number
              </label>
              <input
                className="input-field"
                placeholder="Enter your HE number"
                value={heNumber}
                onChange={(e) => setHeNumber(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500", color: "var(--gray-800)" }}>
                Password / CNIC
              </label>
              <input
                className="input-field"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div style={{
                color: "#e11d48",
                backgroundColor: "#fff1f2",
                padding: "0.75rem",
                borderRadius: "8px",
                fontSize: "0.875rem",
                textAlign: "center",
                border: "1px solid #fda4af"
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="button"
              style={{ width: "100%", marginTop: "0.5rem" }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner" style={{
                    width: "18px",
                    height: "18px",
                    border: "2px solid #fff",
                    borderTopColor: "transparent",
                    borderRadius: "50%",
                    display: "inline-block",
                    animation: "spin 0.8s linear infinite"
                  }}></span>
                  <span>Logging in...</span>
                </>
              ) : "Sign Up"}
            </button>
            <button
              className=""
              style={{ width: "100%", marginTop: "0.5rem", border: "none", backgroundColor: "white", textDecoration: "underline" }}

              onClick={() => navigate("/")}
            >Sign In</button>
          </form>

          <style>
            {`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      </div>
    </Layout>
  );
}

export default Register;