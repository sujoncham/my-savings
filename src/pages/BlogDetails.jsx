
import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`https://amar-savings-loan.onrender.com/api/blogs/${id}`);
                setBlog(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            {blog ? (
                <>
                    <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
                    <img className="w-full h-auto mb-4" src={blog.image} alt={blog.title} />
                    <p className="text-lg text-gray-700">{blog.content}</p>
                </>
            ) : (
                <p className="text-center text-gray-500">Blog not found</p>
            )}
        </div>
    );
};

export default BlogDetails;