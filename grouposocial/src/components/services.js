export function loginUser(email, password) {
	return fetch("http://localhost:3000/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({ email, password }),
			}).then(function (response) {
					if (response.ok) {
						console.log("1");
						alert("Successfully logged in!");
						return response.json();
					} else {
						throw new Error("Could not log in");
					}
				})
				.catch((error) =>
					{return {error};}
				);
}