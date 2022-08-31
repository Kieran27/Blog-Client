import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Comment from "../../Components/Widgets/comment.jsx";
import CreateComment from "../../Components/Widgets/createComment.jsx";
import LoginReminder from "../../Components/Widgets/loginReminder.jsx";
import DeleteComment from "../../Components/Modals/deleteComment.jsx";
import DeletePost from "../../Components/Modals/deletePost.jsx";
import UpdatePost from "../../Components/Widgets/updatePost.jsx";
import UpdateComment from "../../Components/Widgets/updateComment.jsx";
import { useAuth } from "../../Auth/authentication-context";
import styles from "./post.module.scss";
import axios from "axios";

const Post = () => {
  const [postData, setPostData] = useState(null);
  const [commentId, setCommentId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletePostModal, setDeletePostModal] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editPost, setEditPost] = useState(false);

  const { user } = useAuth();
  const postId = useParams();
  const navigate = useNavigate();

  const openDeleteModal = (e) => {
    if (e.currentTarget.id === "comment-dlt-btn") {
      const commentId =
        e.currentTarget.parentElement.parentElement.parentElement.parentElement
          .id;
      setCommentId(commentId);
    }
    setDeleteModal((deleteCommentModal) => !deleteCommentModal);
  };

  const showEdit = (index) => {
    if (!editOpen) setEditIndex(index);
    setEditOpen((editOpen) => !editOpen);
  };

  const openEditPost = () => {
    setEditPost((editPost) => !editPost);
  };

  const openDeletePostModal = () => {
    setDeletePostModal((deletePostModal) => !deletePostModal);
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
      alert(`comment ${commentId} Updated!`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/posts/${postId.postid}`
      );
      alert(`Comment ${postId.postid} Deleted!`);
      setCommentId(null);
      setDeleteModal(false);
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  const updatePost = async (title, content) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/posts/${postId.postid}`,
        {
          title: title,
          content: content,
        }
      );
      alert(`Post ${postId.postid} Updated!`);
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await axios.get(
          `http://localhost:3000/api/posts/${postId?.postid}`
        );
        const postData = post.data.post;
        setPostData(postData);
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
      {deletePostModal && (
        <DeletePost
          openDeletePostModal={openDeletePostModal}
          postId={postId}
          deletePost={deletePost}
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
          <h2>{postData?.title}</h2>
          <div className={styles.postContentHeader}>
            <div>
              <span>{`by ${postData?.author}`}</span>
              <span>{`On ${postData?.timestamp}`}</span>
            </div>

            {postData?.author === user?.user.username ? (
              <div>
                <button onClick={openDeletePostModal}>
                  <AiOutlineDelete /> Delete Post
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className={styles.postContentBody}>
            {editPost && (
              <UpdatePost
                postData={postData}
                openEditPost={openEditPost}
                updatePost={updatePost}
              />
            )}
            {postData?.content}
            {postData?.author === user?.user.username ? (
              <div className={styles.editPost}>
                <button onClick={openEditPost}>
                  <AiOutlineEdit />
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className={styles.postContentFooter}>
            <h2>{`Discussion (${postData?.comments.length})`}</h2>
            {user ? (
              <CreateComment postId={postId.postid} />
            ) : (
              <LoginReminder />
            )}
            {postData?.comments.map((comment, index) => {
              return editOpen && index === editIndex ? (
                <UpdateComment
                  comment={comment}
                  key={comment._id}
                  editOpen={showEdit}
                  updateComment={updateComment}
                />
              ) : (
                <Comment
                  comment={comment}
                  key={comment._id}
                  index={index}
                  openDeleteModal={openDeleteModal}
                  showEdit={showEdit}
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
