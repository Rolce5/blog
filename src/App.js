import './App.css';
import Home from './Home';
import ManagePost from './ManagePost';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PostCreate from './PostCreate';
import PostEdit from './PostEdit';
import PostShow from './PostShow';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { ToastContainer } from 'react-toastify';
// import Navbar from './Navbar';




function App() {

  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div className="App">
      {/* <Navbar/> */}
      <ToastContainer></ToastContainer>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home posts={posts} />}></Route>
            <Route path="/posts/:postId" element={<PostShow />} />
            {/* <Route path='/post/:postid' element={<Show/>}></Route> */}
            <Route path='/post/manage' element={<ManagePost posts={posts} setPosts={setPosts} />}></Route>
            <Route path='/post/create' element={<PostCreate />}></Route>
            <Route path='/post/edit/:postid' element={<PostEdit posts={posts} />}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
