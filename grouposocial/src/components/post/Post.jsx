import "./post.css";
import PropTypes from 'prop-types';
import moment from 'moment';

const Post = ({post, showFullContent = false, lastVisit}) => {
  const { email, content, imageUrl, publishedDate } = post; 

  console.log("published date: ", publishedDate);
  console.log("last visit: ", lastVisit);
  // Determines if post is new by comparing post publish timestamp to stored last feed visit timestamp
  const isNew = lastVisit && new Date(publishedDate) > new Date(lastVisit);
  console.log("is new: ", isNew);

  return (
    <div className="post-container d-flex flex-column justify-content-center align-items-center">
      <div className="post-content-info d-flex justify-content-between" id={isNew ? 'newPost' : ''}>
        <p className="post-info" id="postEmail">{email}</p>
        {isNew && <p className="new-txt">New!</p>}
        <p className="post-info" id="postDate">{moment(publishedDate).format('MM/DD/YYYY')}</p>
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
  lastVisit: PropTypes.string,
}

export default Post