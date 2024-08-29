import "./deleteAccount.css";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from '../../features/auth/authSlice';

const DeleteAccount = () => {
  const [submittedEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token, userEmail: loggedInEmail } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteAccount = (e) => {
    e.preventDefault();

    if (submittedEmail !== loggedInEmail) {
      return alert("The email provided does not match the email of the user currently logged in.");
    }

    // Send captured email and password text to API
    fetch("http://localhost:3000/api/auth/deleteAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ email: submittedEmail, password }),
    })
      .then(async (response) => {
        if (response.ok) {
          alert("Account has been successfully deleted!");
          // Automatically log out user once account is deleted using authSlice
          dispatch(logout());
          navigate('/'); // Navigate to the logged out version of homepage
        } else {
          const data = await response.json();
          alert(`User has not been deleted: ${data.message}`);
        }
      })
      .catch((error) =>
        alert("There was an error while deleting the user", error)
      );
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Container className="main-sec d-flex flex-column justify-content-center align-items-center">
        <h1>Delete Account</h1>

        <h2>Once you delete your account, you will have to make a new account to access GroupoSocial content again.</h2>

        <Form className="d-flex flex-column justify-content-center align-items-center" onSubmit={handleDeleteAccount}>
          <Form.Group className="form-fld mb-3" controlId="formBasicEmail">
            <Form.Label className="form-lbl">Email</Form.Label>
            <Form.Control
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="form-fld mb-3" controlId="formBasicPassword">
            <Form.Label className="form-lbl">Password</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Button
            className="form-btn d-flex align-items-center justify-content-center"
            type="submit"
          >
            Delete Account
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default DeleteAccount;