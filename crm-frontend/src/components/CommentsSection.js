import React from 'react';

const CommentsSection = ({ comments }) => {
  return (
    <div className="comments-section">
      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <p>{comment.comment.charAt(0).toUpperCase() + comment.comment.slice(1)}</p>
          <small>Created at: {comment.created_at}</small>
        </div>
      ))}
    </div>
  );
};

export default CommentsSection;
