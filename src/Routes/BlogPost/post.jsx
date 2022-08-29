import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Comment from "../../Components/Widgets/comment.jsx";
import CreateComment from "../../Components/Widgets/createComment.jsx";
import LoginReminder from "../../Components/Widgets/loginReminder.jsx";
import DeleteComment from "../../Components/Modals/deleteComment.jsx";
import UpdateComment from "../../Components/Widgets/updateComment.jsx";
import { useAuth } from "../../Auth/authentication-context";
import styles from "./post.module.scss";
import axios from "axios";

const Post = () => {
  const [postData, setPostData] = useState(null);
  const [commentData, setCommentData] = useState(null);
  const [commentId, setCommentId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editOpen, setEditOpen] = useState(true);
  const { user } = useAuth();
  const postId = useParams();

  const openDeleteModal = (e) => {
    if (e.currentTarget.id === "comment-dlt-btn") {
      const commentId =
        e.currentTarget.parentElement.parentElement.parentElement.parentElement
          .id;
      setCommentId(commentId);
    }
    setDeleteModal((deleteCommentModal) => !deleteCommentModal);
  };

  const showEdit = () => {
    setEditOpen((editOpen) => !editOpen);
  };

  const deleteComment = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/posts/${postId.postid}/comments/${commentId}`
      );
      alert(`Comment ${commentId} Deleted!`);
      setCommentId(null);
      setDeleteModal(false);
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  const updateComment = async (commentId, commentContent) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/posts/${postId.postid}/comments/${commentId}`,
        {
          commentContent: commentContent,
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await axios.get(
          `http://localhost:3000/api/posts/${postId.postid}`
        );
        const postData = post.data.post;
        setPostData(postData);
        setCommentData(postData.comments);
        console.log(postData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [postId.postid]);

  return (
    <>
      {deleteModal && (
        <DeleteComment
          openDeleteModal={openDeleteModal}
          deleteComment={deleteComment}
        />
      )}
      <section className={styles.postContainer}>
        <div className={styles.postImgContainer}>
          <img
            src="https://ik.imagekit.io/devtoolstech/hero-graphic_ib35c2NXyL_.png?ik-sdk-version=javascript-1.4.3&updatedAt=1642265118782"
            alt=""
          />
        </div>
        <div className={styles.postContentContainer}>
          <div className={styles.postContentHeader}>
            <h2>{postData?.title}</h2>
            <div>
              <span>{`by ${postData?.author}`}</span>
              <span>{`On ${postData?.timestamp}`}</span>
            </div>
          </div>
          <div className={styles.postContentBody}>{postData?.content}</div>
          <div className={styles.postContentFooter}>
            <h2>{`Discussion (${postData?.comments.length})`}</h2>
            {user ? (
              <CreateComment postId={postId.postid} />
            ) : (
              <LoginReminder />
            )}
            {postData?.comments.map((comment) => {
              return !editOpen ? (
                <Comment
                  comment={comment}
                  key={comment._id}
                  openDeleteModal={openDeleteModal}
                  showEdit={showEdit}
                />
              ) : (
                <UpdateComment
                  comment={comment}
                  key={comment._id}
                  editOpen={showEdit}
                  updateComment={updateComment}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Post;
