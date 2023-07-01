import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {compress, compressAccurately} from 'image-conversion';


const PostShow = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);




    const [comments, setComments] = useState([]);
    const [author, setAuthor] = useState('');
    const [email, setEmail] = useState('');
    const [text, setText] = useState('');
    const [errors, setErrors] = useState([]);


    async function fetchComments() {
        try {
            const response = await fetch(`/api/posts/${postId}/comments`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.log(error);
            setErrors(['Error fetching comments']);
        }
    }

    async function submitComment(event) {
        event.preventDefault();

        const data = { author, email, text };

        try {
            const response = await fetch(`/api/posts/${postId}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            if (result.error) {
                setErrors([result.error]);
            } else {
                setErrors([]);
                setAuthor('');
                setEmail('');
                setText('');
                fetchComments();
            }
        } catch (error) {
            console.log(error);
            setErrors(['Error posting comment']);
        }
    }





    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/posts/${postId}`);
                const data = await response.json();
                setPost(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError(error);
                setLoading(false);
            }
        };
        fetchPost();
        fetchComments();
    }, [postId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary ">
                <div className="container-fluid ">
                    <button className="navbar-toggler" type="button" d ata-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarSupportedContent">
                        <ul className="navbar-nav  mb-2 mb-lg-0 ">
                            <li className="nav-item">
                                <Link to="/" className="nav-link"> Home</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav  mb-2 mb-lg-0 grid gap-3">
                            <li className="nav-item ">
                                <span className=" fw-bold uppercase">
                                    Welcome
                                </span>
                            </li>
                            <li className="nav-item">
                                {<Link to="/post/manage" className="nav-link"> <span> <i className="bi bi-gear"></i>
                                    Manage Post
                                </span></Link>}
                            </li>

                            <li className="nav-item ">
                                <Link to="/" className="nav-link"> <button type="submit" className="btn btn-light">
                                    <i className="bi bi-door-closed-fill"></i>Logout
                                </button></Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link"> <i className="bi bi-box-arrow-in-right"></i>Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link"> <i className="bi bi-box-arrow-in-right"></i>Register</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container mt-5">
                {
                    <div>

                        <h2>{post.title}</h2>
                        <img src='file:///C:/Users/hp/Desktop/demoImages/image1.jpg' alt={post.title} />
                        {post.image && <img src={post.image} alt={post.title} />}
                        <p>{post.body}</p>
                    </div>
                }
                <div className="container">
                    <h2 className="mt-5 mb-2 text-4xl font-bold text-center text-gray-900">Comments</h2>
                    <form onSubmit={submitComment} className="mb-0">
                        <div className="form-group">
                            <label htmlFor="author" className="text-sm font-medium text-gray-700">Author</label>
                            <input type="text" id="author" name="author" className="form-control" value={author} onChange={(event) => setAuthor(event.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email" name="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="text" className="text-sm font-medium text-gray-700 mt-4">Text</label>
                            <textarea id="text" name="text" className="form-control" value={text} onChange={(event) => setText(event.target.value)} required></textarea>
                        </div>
                        {errors.length > 0 && (
                            <div className="mt-4">
                                <ul className="bg-danger px-4 py-5 rounded">
                                    {errors.map((error, index) => <li key={index}>{error}</li>)}
                                </ul>
                            </div>
                        )}
                        <button type="submit" className="btn btn-primary mt-2">Post</button>
                    </form>
                    <div className="mt-4">
                        {comments.map((comment, index) => (
                            <div key={index} className="mb-3 bg-white p-4 rounded shadow">
                                <div className="d-flex align-items-center">
                                    <div className="mr-4 flex-shrink-0">
                                        <span className="bg-dark-subtle p-3 rounded-circle">{comment.author.split(' ').map(name => name[0]).join('').toUpperCase()}</span>
                                    </div>
                                    <div className="flex-grow-1 ms-2">
                                        <p className="mb-0 font-weight-bold">{comment.author}</p>
                                        <p className="mb-0 text-muted">{new Date(comment.created_at).toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="mt-3 ms-2">
                                    <p>{comment.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostShow;