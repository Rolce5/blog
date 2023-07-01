import { BiSolidPencil, BiSolidTrash } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
// import * as Icon from 'react-bootstrap-icons'
const ManagePost = ({ posts, setPosts }) => {
    const navigate = useNavigate();

    const LoadEdit = (id) => {
        navigate(`/post/edit/${id}`)
    }
    const deleteFunction = (id) => {
        // if (window.confirm('Confirm delete'));

        // fetch("http://localhost:3000/api//posts/" + id, {
        //     method: "DELETE",
        // }).then((res) => {
        //     toast.success('Deleted successfully.');
        //     window.location.reload();
        // }).catch((err) => {
        //     console.log(err.message)
        // });
        if (window.confirm('Are you sure you want to delete this post?')) {
            fetch(`http://localhost:3000/api/posts/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    setPosts(posts.filter(post => post.id !== id));
                    toast.success('Post deleted successfully', {
                        position: toast.POSITION.TOP // Set the position option to TOP
                      });
                })
                .catch(error => {
                    console.log(error);
                    toast.error(error.response.data.error);
                });
        }
    }


    return (
        <div >
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

                            {/* <li className="nav-item ">
                                <Link to="/" className="nav-link"> <button type="submit" className="btn btn-light">
                                    <i className="bi bi-door-closed-fill"></i>Logout
                                </button></Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link"> <i className="bi bi-box-arrow-in-right"></i>Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link"> <i className="bi bi-box-arrow-in-right"></i>Register</Link>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container px-4 py-5">
                <div className="col-md-10 mx-auto col-lg-10">
                    <div className="d-flex justify-content-end text-right mb-3">
                        <Link to="/post/create" className="btn btn-success"> Create Post</Link>
                    </div>
                    <div className="table-responsive position-relative">
                        <table className="table  table-hover">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Body</th>
                                </tr>
                            </thead>

                            <tbody>
                                {posts.map(post => (
                                    <tr key={post.id}>
                                        <td>{post.title}</td>
                                        <td>{post.body}</td>
                                        <td>
                                            <Link to={`/post/edit/${post.id}`}><BiSolidPencil size='2rem'/></Link>
                                            <Link to="#" onClick={() => { deleteFunction(post.id) }} ><BiSolidTrash size='2rem' color="red"/></Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div >
            </div>
        </div >
    );
}

export default ManagePost;