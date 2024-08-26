// service function to log in user
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

// service function to get all posts with pagination support
export async function fetchPosts(page, token) {
    try {
		const response = await fetch(`http://localhost:3000/api/getPosts?page=${page}`, 
			{headers: {
				"Authorization": `Bearer ${token}`
		},});
		const data = await response.json();
	
		if (!response.ok) {
			throw new Error('Post request failed');
		}
	
		return {
			posts: data.posts,
			totalPages: data.totalPages,
		};
	} catch (error) {
		console.error(error);
		return {
			posts: [],
			totalPages: 1,
		};
	}
}

// service function to get current logged in user's posts
export async function fetchMyPosts(page, token, email) {
    console.log('email in services: ', email);
	try {
		const response = await fetch(`http://localhost:3000/api/getMyPosts?page=${page}&email=${encodeURIComponent(email)}`, 
								{
									headers: {
									"Authorization": `Bearer ${token}`
									},
								});
		const data = await response.json();
	
		if (!response.ok) {
			throw new Error('Post request failed');
		}
	
		return {
			posts: data.posts,
			totalPages: data.totalPages,
		};
	} catch (error) {
		console.error(error);
		return {
			posts: [],
			totalPages: 1,
		};
	}
}

// service function to get a specific post by ID
export async function fetchPostById(postId, token) {
	try {
		const response = await fetch(`http://localhost:3000/api/getPostById/${postId}`, {
		headers: {
			"Authorization": `Bearer ${token}` // Ensure token is passed if needed
		},
		});
		const data = await response.json();
  
		if (!response.ok) {
			throw new Error('Failed to fetch post');
		}
  
		return data.post;
	} catch (error) {
		console.error(error);
		return null;
	}
}