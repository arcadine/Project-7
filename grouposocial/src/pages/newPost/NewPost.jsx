import "./newPost.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const [postText, setPostText] = useState("");
	const [postImage, setPostImage] = useState("");
  const navigate = useNavigate();
  const {token, userEmail: email} = useSelector((state) => state.auth);
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
			<Container className="main-sec mt-4 mb-4 d-flex flex-column justify-content-start align-items-center">
        <h1>New Post</h1>
        <h2><em>Remember to keep posts work appropriate!</em></h2>

        <Form className="newPostForm">
          <Form.Group className="mb-3" controlId="newPostForm.ControlTextarea1">
            <Form.Label className="form-lbl-sm">What&apos;s on your mind?</Form.Label>
            <Form.Control 
              onChange={function (e) {
								setPostText(e.target.value);
							}}
              as="textarea" rows={3}
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label className="form-lbl-sm">Select image file (optional)</Form.Label>
            <Form.Control 
              onChange={function (e) {
								setPostImage(e.target.files[0]);
							}}
              type="file"
            />
          </Form.Group>

          <div className="text-center">
            <Button 
              onClick={async function (e) {
                e.preventDefault();
                const formData = new FormData();
                formData.append("content", postText);
                if (postImage) {
                  formData.append("imageUrl", postImage);
                }
                formData.append("email", email);

                fetch("http://localhost:3000/api/createPost", {
                  method: "POST",
                  headers: {
                    "Authorization": `Bearer ${token}`
                  },
                  body: formData
                }).then(async function (response) {
                    if (response.ok) {
                      alert("New post uploaded!");
                      navigate('/'); // Navigate back to feed on post upload
                    } else {
                      throw new Error("New post not uploaded");
                    }
                  })
                  .catch((error) =>
                    alert("There was an error while uploading the new post", error)
                  );
              }}
              className="form-btn" 
              type="submit"
            >
              Post
            </Button>
          </div>
          
        </Form>
      </Container>
    </div>

  )
}

export default NewPost