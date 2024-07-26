/* eslint-disable react-hooks/exhaustive-deps */
import Container from "react-bootstrap/esm/Container";
import "./singlePost.css";
import Post from "../../components/post/Post";
import { useEffect, useState } from "react";
import { fetchPostById } from "../../components/services";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

const SinglePost = () => {
  const {token} = useSelector((state) => state.auth);
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  //empty array means useEffect on mount; if no brackets it'll load every life cycle
  useEffect(() => {
    const loadPost = async() => {
        const postData = await fetchPostById(postId, token);
        setPost(postData);
    }
    loadPost();
    console.log('single post test');
  }, [postId]);

  if(!post){
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <Container className="mt-4 mb-4 d-flex flex-column justify-content-center align-items-center">
                <h1>Loading...</h1>
            </Container>
        </div>
    ) 
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Container className="mt-4 mb-4 d-flex flex-column justify-content-center align-items-center">
        <div id="postsArea">
          <Post post={post} showFullContent={true} />
        </div>
      </Container>
    </div>
  )
}

export default SinglePost