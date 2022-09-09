import axios from "axios";
import { useAuth } from "../../Auth/authentication-context";
import { useState } from "react";
import { useNavigate } from "react-router";

export const useCreatePost = () => {
  const [errorsArray, setErrorsArray] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const navigate = useNavigate();
  const { user, validateToken } = useAuth();
  const refreshToken = user?.refreshToken;

  const createPost = async (title, content, refreshToken) => {
    try {
      const res = await axios.post(
        "https://evening-fjord-72509.herokuapp.com/api/posts",
        {
          title: title,
          content: content,
          author: user.user.username,
        },
        {
          headers: {
            "x-auth-token": refreshToken,
          },
        }
      );
      setIsCreating(false);
      alert("Post Created!");
      navigate("/");
    } catch (error) {
      setIsCreating(false);
      validateToken(error);
      let errors = error.response.data.message.errors.title.message;
      if (typeof errors !== String) errors = "Oops, something went wrong";
      const errorIsArray = Array.isArray(errors);
      if (errorIsArray) {
        setErrorsArray(errors);
      } else {
        setErrorMessage(errors);
      }
    }
  };

  return { createPost, isCreating, errorsArray, errorMessage };
};
