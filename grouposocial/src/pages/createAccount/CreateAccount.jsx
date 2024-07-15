import "./createAccount.css";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { loginUser } from "../../components/services";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from '../../features/auth/authSlice';

const CreateAccount = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	return (
		<div className="d-flex flex-column justify-content-center align-items-center">
			<Container className="main-sec d-flex flex-column justify-content-center align-items-center">
				<h1>Create Account</h1>

				<h2>Please use your work email to create your GroupoSocial account.</h2>

				<Form className="d-flex flex-column justify-content-center align-items-center">
					<Form.Group className="form-fld mb-3" controlId="formBasicEmail">
						<Form.Label className="form-lbl">Email</Form.Label>
						<Form.Control
							onChange={function (e) {
								setEmail(e.target.value);
							}}
							type="email"
							placeholder="Enter email"
						/>
					</Form.Group>

					<Form.Group className="form-fld mb-3" controlId="formBasicPassword">
						<Form.Label className="form-lbl">Password</Form.Label>
						<Form.Control
							onChange={function (e) {
								setPassword(e.target.value);
							}}
							type="password"
							placeholder="Password"
						/>
					</Form.Group>

					<Button
						onClick={function (e) {
							e.preventDefault();
							// Send captured email and password text to API
							fetch("http://localhost:3000/api/auth/signup", {
								method: "POST",
								headers: {
									"Content-Type": "application/json",
									Accept: "application/json",
								},
								body: JSON.stringify({ email, password }),
							}).then(async function (response) {
									if (response.ok) {
										alert("New user successfully created!");
										// Automatically log in user once account is created using function in services file
										const { userId, token, error } = await loginUser(email, password);
										if(userId && token){
											dispatch(loginSuccess({ userId, email, token }));
											navigate('/'); // Navigate to the new homepage
											console.log("2");
										}
										else {
											alert("There was an error in the login process", error)
										}
									} else {
										throw new Error("New user not created");
									}
								})
								.catch((error) =>
									alert("There was an error while creating the new user", error)
								);
						}}
						className="form-btn d-flex align-items-center justify-content-center"
						type="submit"
					>
						Create Account
					</Button>
				</Form>
			</Container>
		</div>
	);
};

export default CreateAccount;
