import { useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('mario');
    const { data: blog, error, isPending } = useFetch('http://localhost:8000/api/blog-detail/' + id);
    const [update, setUpdate] = useState(false);
    const history = useHistory();

    const handleClick = () => {
        var csrftoken = getCookie('csrftoken');
        
        fetch('http://localhost:8000/api/blog-delete/' + blog.id, {
            method: 'DELETE',
            headers: { 
                "Content-Type": "application/json",
                'X-CSRFToken': csrftoken,
            },
        }).then(() => {
            history.push('/');
        })
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        const blog = { title, body, author };
        var csrftoken = getCookie('csrftoken');

        fetch('http://localhost:8000/api/blog-update/' + id + '/', {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('blog updated')
            history.push('/');
        })

    }

    const getCookie = (name) => {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const Updating = () => {
        setUpdate(true);
        setTitle(blog.title)
        setAuthor(blog.author)
        setBody(blog.body)
    }

    return (
        
        <div className="blog-details">
            { isPending && <div>Loading...</div> }
            { error && <div>{ error }</div> }
            { blog && (
                <article>
                    {!update ? <h2>{ blog.title }</h2> : (
                        <div>
                            <label>Blog Title:</label>
                            <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                    )}
                    {!update ? <p>Written by { blog.author }</p> : (
                        <div>
                            <label>Blog Author:</label>
                            <input type="text" required value={ author } onChange={(e) => setAuthor(e.target.value)}/>
                        </div>
                    )}
                    {!update ? <div>{ blog.body }</div> : (
                        <div>
                            <label>Blog Body:</label>
                            <textarea required value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                        </div>
                    )}

                    <button onClick={handleClick}>Delete</button>
                    {!update ? <button onClick={Updating}>Update</button> : <button onClick={handleUpdate}>Update Now</button> }
                </article>
            )}
            
        </div>
    );
}
 
export default BlogDetails;