/* eslint-disable react-hooks/exhaustive-deps */
import Container from "react-bootstrap/esm/Container";
import "./feed.css";
import Post from "../../components/post/Post";
import { useEffect, useState } from "react";
import { fetchPosts } from "../../components/services";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setLastVisit } from "../../features/auth/authSlice";

const Feed = () => {
  const {token, lastVisit} = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  
  const loadPosts = async () => {
    setLoading(true);
    const { posts: newPosts, totalPages: newTotalPages } = await fetchPosts(page, token);
    const existingPostIds = posts.map(p => p.id);
    //filters out existing posts from new posts before setting them
    const nextPost = newPosts.filter(p => !existingPostIds.includes(p.id));
    const theNewPost = [...posts, ...nextPost];
    setPosts(theNewPost);
    setTotalPages(newTotalPages);
    setLoading(false);

    // Store time of feed visit after posts load
    const currentVisit = new Date().toISOString();
    setTimeout(() => {dispatch(setLastVisit(currentVisit))}, 7000);
    //localStorage.setItem('lastVisit', currentVisit);
  };

  //empty array means useEffect on mount; if no brackets it'll load every life cycle
  useEffect(() => {
    console.log('load posts test');
    loadPosts();
  }, [page]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Container className="mt-4 mb-4 d-flex flex-column justify-content-center align-items-center">
        <h1>Latest Posts</h1>

        <div id="postsArea">
          {posts.map((p, i) => (
            <div key={i} onClick={() => handlePostClick(p.id)} style={{ cursor: 'pointer' }}>
              <Post post={p} showFullContent={false} lastVisit={lastVisit}/>
            </div>
          ))}
        </div>
        {console.log("last visit in feed: ", lastVisit)}

        {page < totalPages ? (
          <button className="md-gm-btn" onClick={handleLoadMore} disabled={loading}>
            {loading ? 'Loading...' : 'Load More'}
          </button>
        ) : (
          <p>End of Feed</p>
        )}
      </Container>
    </div>
  )
}

export default Feed