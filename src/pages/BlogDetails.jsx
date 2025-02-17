import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";


const BlogDetails = () => {
    const { id } = useParams();

    const [blog, setBlog] = useState({});
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
                setBlog(response.data.data);

                // Fetch related posts (you may need to adjust the API endpoint to fetch related posts)
                const relatedResponse = await axios.get(`http://localhost:5000/api/blogs`);
                const allBlogs = relatedResponse.data.data;

                // Filter related posts based on a criterion, e.g., category or excluding current blog
                const related = allBlogs.filter((post) => post._id !== id && post.category === response.data.data.category);
                setRelatedPosts(related.slice(0, 3)); // Limit to 3 related posts
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
            {id ? (
                <>
                    <div className="mb-10 mt-10">
                    <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
                    <p className="text-xs text-gray-500 mb-5">
                        Published {moment(blog.createdAt).fromNow()} ({moment(blog.createdAt).format("ll")})
                    </p>
                    <img className="w-full h-auto mb-4" src={blog.image} alt={blog.title} />
                    <p className="text-lg text-gray-700 mb-8">{blog.content}</p>
                   </div>
                    <hr className="my-8" />
                    {/* Related Posts Section */}
                    {relatedPosts.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Related Posts</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {relatedPosts.map((post) => (
                                    <div key={post._id} className="bg-white shadow rounded overflow-hidden">
                                        <img className="w-full h-32 object-cover" src={post.image} alt={post.title} />
                                        <div className="p-4">
                                            <h3 className="text-lg font-medium">{post.title}</h3>
                                            <p className="text-sm text-gray-600">{post.content.slice(0, 100)}...</p>
                                            <a
                                                href={`/blogs/${post._id}`}
                                                className="text-blue-500 hover:underline text-sm mt-2 inline-block"
                                            >
                                                Read More
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <p className="text-center text-gray-500">Blog not found</p>
            )}
        </div>
    );
};

export default BlogDetails;
