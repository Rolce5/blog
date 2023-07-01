import { Link } from "react-router-dom";
import moment from 'moment';
import { BiCog } from "react-icons/bi";
const Home = ({ posts, createdAt }) => {

    const elapsedTime = moment(createdAt).fromNow();

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
                                <BiCog />  Manage Post
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
            <div className="container mt-5">
                <div  className="container  mb-4 ">
                    <div>
                        {posts.map(post => (

                            <div key={post.id}>
                                <small className="text-body-tertiary">Posted {moment(post.createdAt).fromNow()}</small>
                                <h1 className="my-2 "><Link to={`/posts/${post.id}`} className="text-decoration-none text-dark text-primary:hover"> {post.title}</Link></h1>
                                <p> {post.body.slice(0, 1000)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;