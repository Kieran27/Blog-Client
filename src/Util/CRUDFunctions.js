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
