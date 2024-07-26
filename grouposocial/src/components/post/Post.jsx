import "./post.css";
import PropTypes from 'prop-types';

const Post = ({post, showFullContent = false}) => {
  const { email, content, imageUrl, publishedDate } = post; 
  return (
    <div className="post-container d-flex flex-column justify-content-center align-items-center">
      {/* <div className="unread-banner d-flex flex-row justify-content-start">New!</div> */}
      <div className="post-content-info d-flex flex-row justify-content-between">
        <p className="post-info" id="postEmail">{email}</p>
        <p className="post-info" id="postDate">{publishedDate}</p>
      </div>
      <div className="post-content-body d-flex flex-row justify-content-start">
        <p className={showFullContent ? 'full-content' : 'preview-content'}>{content}</p>
      </div>
      {/* only render post image if it exists; else load nothing */}
      {(imageUrl) ? <div className="post-image d-flex flex-row justify-content-center">
        <img src={imageUrl} width="75%" alt={content}/>
      </div> : null}
    </div>
  )
}
Post.propTypes = {
  post: PropTypes.object.isRequired, 
  showFullContent: PropTypes.bool,
}

export default Post