import { BrowserRouter, Routes, Route } from "react-router-dom";
import Base from "./Base.jsx";
import Homepage from "./Routes/Homepage/homepage.jsx";
import Signup from "./Routes/Signup/signup.jsx";
import Login from "./Routes/Login/login.jsx";
import Post from "./Routes/BlogPost/post.jsx";
import Header from "./Components/Landmarks/header.jsx";
import Footer from "./Components/Landmarks/footer.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/posts/:postid" element={<Post />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};
export default App;
