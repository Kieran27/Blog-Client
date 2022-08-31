import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/authentication-context";
import PostHeader from "./postHeader.jsx";
import PostBody from "./postBody.jsx";
import CommentSection from "./commentSection.jsx";
import DeleteComment from "../../Components/Modals/deleteComment.jsx";
import DeletePost from "../../Components/Modals/deletePost.jsx";
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
          <PostHeader
            postData={postData}
            openDeletePostModal={openDeletePostModal}
          />
          <PostBody
            postData={postData}
            editPost={editPost}
            openEditPost={openEditPost}
            updatePost={updatePost}
          />
          <CommentSection
            postData={postData}
            postId={postId}
            editIndex={editIndex}
            showEdit={showEdit}
            editOpen={editOpen}
            updateComment={updateComment}
            openDeleteModal={openDeleteModal}
          />
        </div>
      </section>
    </>
  );
};

export default Post;
