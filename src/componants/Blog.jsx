import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    // console.log(blogs)

    useEffect(() => { 
        const fetchBlogs = async () => {
            try {
                const response = await axios.get("https://amar-savings-loan.onrender.com/api/blogs");
                setBlogs(response.data.data);
            } catch (error) {
                console.error("There was an error!", error);
            }
        };
        fetchBlogs();   
    }, []);

    
    return (
        <section id="blog" className="bg-gray-100 py-16">
        <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Latest Insights & Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.map(blog=><div key={blog._id} className="p-6 bg-white rounded shadow">
            <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                <p className="text-sm">{blog.content.slice(0, 120)} ...</p>
                <img src={blog.image} alt={ blog.title} />
            <Link to={`/${blog._id}`} className="text-blue-500 hover:underline">Read More</Link>
            </div>)}
            
        </div>
        </div>
    </section>
    );
};

export default Blog;