import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/authentication-context";
import ReactBar from "../../Components/Landmarks/reactBar";
import PostHeader from "./postHeader.jsx";
import PostBody from "./postBody.jsx";
import LoadingCover from "../../Components/Landmarks/loadingCover.jsx";
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
  const [postLoading, setPostLoading] = useState(true);
  const [actionPending, setActionPending] = useState(false);

  const { user, validateToken } = useAuth();
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
      setActionPending(true);
      const res = await axios.delete(
        `https://evening-fjord-72509.herokuapp.com/api/posts/${postId.postid}/comments/${commentId}`,
        {
          headers: {
            "x-auth-token": user.refreshToken,
          },
        }
      );
      alert(`Comment ${commentId} Deleted!`);
      setActionPending(false);
      setCommentId(null);
      setDeleteModal(false);
      window.location.reload();
    } catch (error) {
      setActionPending(false);
      validateToken(error);
      alert(error);
    }
  };

  const updateComment = async (commentId, commentContent) => {
    try {
      setActionPending(true);
      const res = await axios.put(
        `https://evening-fjord-72509.herokuapp.com/api/posts/${postId.postid}/comments/${commentId}`,
        {
          commentContent: commentContent,
        },
        {
          headers: {
            "x-auth-token": user.refreshToken,
          },
        }
      );
      alert(`comment ${commentId} Updated!`);
      setActionPending(false);
      window.location.reload();
    } catch (error) {
      setActionPending(false);
      validateToken(error);
      console.log(error);
    }
  };

  const deletePost = async () => {
    try {
      setActionPending(true);
      const res = await axios.delete(`/api/posts/${postId.postid}`, {
        headers: {
          "x-auth-token": user.refreshToken,
        },
      });
      alert(`Comment ${postId.postid} Deleted!`);
      setActionPending(false);
      setCommentId(null);
      setDeleteModal(false);
      navigate("/");
    } catch (error) {
      setActionPending(false);
      validateToken(error);
      alert(error);
    }
  };

  const updatePost = async (title, content) => {
    try {
      setActionPending(true);
      const res = await axios.put(
        `https://evening-fjord-72509.herokuapp.com/api/posts/${postId.postid}`,
        {
          title: title,
          content: content,
        },
        {
          headers: {
            "x-auth-token": user.refreshToken,
          },
        }
      );
      alert(`Post ${postId.postid} Updated!`);
      setActionPending(false);
      window.location.reload();
    } catch (error) {
      setActionPending(false);
      validateToken(error);
      alert(error);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await axios.get(
          `https://evening-fjord-72509.herokuapp.com/api/posts/${postId?.postid}`
        );
        const postData = post.data.post;
        setPostData(postData);
        setPostLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [postId.postid]);

  return (
    <>
      {postLoading && <LoadingCover postLoading={postLoading} />}
      {deleteModal && (
        <DeleteComment
          openDeleteModal={openDeleteModal}
          actionPending={actionPending}
          deleteComment={deleteComment}
        />
      )}
      {deletePostModal && (
        <DeletePost
          openDeletePostModal={openDeletePostModal}
          actionPending={actionPending}
          deletePost={deletePost}
        />
      )}
      <ReactBar postData={postData} postId={postId} />
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
            actionPending={actionPending}
            openEditPost={openEditPost}
            updatePost={updatePost}
          />
          <CommentSection
            postData={postData}
            postId={postId}
            actionPending={actionPending}
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
