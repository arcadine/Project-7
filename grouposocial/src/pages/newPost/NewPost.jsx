import "./newPost.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const NewPost = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
			<Container className="main-sec mt-4 mb-4 d-flex flex-column justify-content-start align-items-center">
        <h1>New Post</h1>
        <h2><em>Remember to keep posts work appropriate!</em></h2>

        <Form className="newPostForm">
          <Form.Group className="mb-3" controlId="newPostForm.ControlTextarea1">
            <Form.Label className="form-lbl-sm">What&apos;s on your mind?</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label className="form-lbl-sm">Select image file (optional)</Form.Label>
            <Form.Control type="file" />
          </Form.Group>

          <div className="text-center">
            <Button className="form-btn" 
              type="submit">
              Post
            </Button>
          </div>
          
        </Form>
      </Container>
    </div>

  )
}

export default NewPost