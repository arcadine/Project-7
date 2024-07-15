/* eslint-disable react-hooks/exhaustive-deps */
import Container from "react-bootstrap/esm/Container";
import "./feed.css";
import Post from "../../components/post/Post";
import { useEffect, useState } from "react";
import { fetchPosts } from "../../components/services";
import { useSelector } from "react-redux";

const Feed = () => {
  const {token} = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
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
  };

  //empty array means useEffect on mount; if no brackets it'll load every life cycle
  useEffect(() => {
    console.log('test');
    loadPosts();
  }, [page]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Container className="mt-4 mb-4 d-flex flex-column justify-content-center align-items-center">
        <h1>Latest Posts</h1>

        <div id="postsArea">
          {posts.map((p, i) => <Post key={i} post={p} />)}
        </div>

        {page < totalPages ? (
          <button className="lg-gm-btn" onClick={handleLoadMore} disabled={loading}>
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