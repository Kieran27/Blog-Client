import { BrowserRouter, Routes, Route } from "react-router-dom";
import Base from "./Base.jsx";
import Homepage from "./Routes/Homepage/homepage.jsx";
import Signup from "./Routes/Signup/signup.jsx";
import Login from "./Routes/Login/login.jsx";
import Post from "./Routes/BlogPost/post.jsx";
import Profile from "./Routes/Profile/profile.jsx";
import CreatePost from "./Routes/CreatePost/createPost.jsx";
import Header from "./Components/Landmarks/header.jsx";
import Footer from "./Components/Landmarks/footer.jsx";
import { AuthProvider } from "./Auth/authentication-context.js";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <main className="content-wrapper">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/posts/:postid" element={<Post />} />
            <Route path="/profile/:userid" element={<Profile />} />
            <Route path="/createpost" element={<CreatePost />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
};
export default App;
