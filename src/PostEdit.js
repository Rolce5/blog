import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams,  Link, useNavigate } from "react-router-dom"

const PostEdit = ({posts }) => {
    const { postid:id } = useParams(); // {postid: 1|2|3}
    const navigate = useNavigate();
    const [post, setPost] = useState({})
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [image, setImage] = useState(null);
  
    useEffect(() => {
      fetch(`http://localhost:3000/api/posts/${id}`)
        .then(res => res.json())
        .then(data => {
          setTitle(data.title);
          setBody(data.body);
          setThumbnailUrl(data.thumbnailUrl);
          console.log(data)
        })
        .catch(error => console.log(error));




    }, [id]);
  
    const handleTitleChange = (event) => {
      setTitle(event.target.value);
    };
  
    const handleBodyChange = (event) => {
      setBody(event.target.value);
    };
  
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      setImage(file);
  
      // Display a thumbnail of the selected image
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setThumbnailUrl(reader.result);
      };
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const formData = new FormData();
      formData.append('title', title);
      formData.append('body', body);
      formData.append('image', image);
  
      fetch(`http://localhost:3000/api/posts/${id}`, {
        method: 'PATCH',
        body: formData,
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          navigate('/post/manage')
          toast.success('Post updated successfully');
          window.location.reload(); // Reload the page
          window.onload = () => {
            toast.success('Post updated successfully'); // Display the toast notification after the page has reloaded
          };
        })
        .catch(error => console.log(error));
    };
  
    return (
        <div className="container col-xl-10 col-xxl-8 px-4 py-5">
            <div className="col-md-10 mx-auto col-lg-7">
                <form className="p-4 p-md-5 border  bg-light" onSubmit={handleSubmit}>
                    <header className="text-center">
                        <h2 className="text-2xl font-bold uppercase mb-1">Edit Post</h2>
                    </header>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title:</label>
                        <input type="text" id="title" name="title" className="form-control" value={title} onChange={handleTitleChange} />
                        {/* {title.length == 0 && validation && <span className="text-danger">title is required</span>} */}
                    </div>
                    <div>
                        <div>
                            <label htmlFor="image" className="form-label">Image:</label>
                            {thumbnailUrl && (
                                <img src={thumbnailUrl} alt="Post thumbnail" style={{ maxWidth: '100px' }} />
                            )}
                            <input type="file" id="image" name="image" className="form-control" onChange={handleImageChange} />
                        </div>
                        <label htmlFor="body" className="form-label">Body:</label>
                        {/* <textarea id="body" className="form-control" value={body} onChange={(event) => setBody(event.target.value)} required /> */}
                        <textarea id="body" name="body" className="form-control" value={body} onChange={handleBodyChange} required />
                        {/* {body.length == 0 && validation && <span className="text-danger">this field is required</span>} */}
                    </div>
                    <div className="mb-6">
                        <button type="submit" className="btn btn-success">Edit Post</button>
                        <Link to="/post/manage" className="text-black ml-4">Back</Link>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default PostEdit;