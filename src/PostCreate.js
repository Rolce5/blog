import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom"

import {compress, compressAccurately, filetoDataURL} from 'image-conversion';




const PostCreate = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [url, setUrl] = useState('')
    const [image, setImage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', body);
        formData.append('image', image);

        fetch('http://localhost:3000/api/posts', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log('Post added successfully:', data);
                setTitle('');
                setBody('');
                setImage(null);
                navigate('/post/manage')
                toast.success('Post added successfully');
            })
            .catch(error => console.log('Error adding post:', error));
    };

    const handleChange = async (e) => {
        const file = e.target.files[0]
        console.log(file)
        const res = await filetoDataURL(file)
        console.log(res);
        setImage(res)
    }
    
    return (
        <div className="container col-xl-10 col-xxl-8 px-4 py-5">
            <div className="col-md-10 mx-auto col-lg-7">
                <form className="p-4 p-md-5 border  bg-light" onSubmit={handleSubmit}>
                    <header className="text-center">
                        <h2 className="text-2xl font-bold uppercase mb-1">Create a Post</h2>
                    </header>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title:</label>
                        <input type="text" id="title" className="form-control" value={title} onChange={(event) => setTitle(event.target.value)} required />
                        {/* {title.length===0 && validation && <span className="text-danger">title is required</span>} */}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Image:</label>
                        <input type="file" id="image" className="form-control" onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="body" className="form-label">Body:</label>
                        <textarea id="body" className="form-control" value={body} onChange={(event) => setBody(event.target.value)} required />
                        {/* {body.length===0 &&  validation && <span className="text-danger">this field is required</span>} */}

                    </div>
                    <div className="mb-6">

                        <button type="submit" className="btn btn-success">Create</button>
                        <Link to="/post/manage" className="text-black ml-4">Back</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PostCreate;