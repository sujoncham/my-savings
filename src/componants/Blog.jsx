import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs } from "../redux/features/blogSlice";
import { Link } from "react-router-dom";

const Blog = () => {
  const dispatch = useDispatch();
  const { paginatedBlogs, totalPages, loading, error } = useSelector((state) => state.blogs);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchBlogs({ page: currentPage, type: "blog" }));
  }, [dispatch, currentPage]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section id="blog" className="bg-gray-100 py-16">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">All Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {paginatedBlogs.map((blog) => (
            <div key={blog._id} className="p-6 bg-white rounded shadow">
              <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
              <p className="text-sm">{blog.content.slice(0, 120)} ...</p>
              <img src={blog.image} alt={blog.title} className="my-4 w-full h-48 object-cover rounded" />
              <Link to={`/blogs/${blog._id}`} className="text-blue-500 hover:underline mt-4 inline-block">
                Read More
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 mx-2 rounded ${currentPage === 1 ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
          >
            Previous
          </button>
          <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 mx-2 rounded ${currentPage === totalPages ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
