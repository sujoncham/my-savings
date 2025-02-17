import axios from "axios";
import { useEffect, useState } from "react";

const BlogEdit = () => {
  const [blogs, setBlogs] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [updatedBlog, setUpdatedBlog] = useState({ title: "", content: "", image: "" });

  // Fetch blogs from the API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs");
        setBlogs(response.data.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    fetchBlogs();
  }, []);

  // Open edit modal with prefilled data
  const openEditModal = (blog) => {
    setSelectedBlog(blog);
    setUpdatedBlog({ title: blog.title, content: blog.content, image: blog.image });
    setIsEditModalOpen(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedBlog(null);
    setUpdatedBlog({ title: "", content: "", image: "" });
  };

  // Handle edit submission
  const handleEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/blogs/${selectedBlog._id}`, updatedBlog);
      const updatedBlogs = blogs.map((blog) =>
        blog._id === response.data._id ? response.data : blog
      );
      setBlogs(updatedBlogs);
      closeEditModal();
    } catch (error) {
      console.error("Error updating blog", error);
    }
  };

  // Handle delete operation
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      const filteredBlogs = blogs.filter((blog) => blog._id !== id);
      setBlogs(filteredBlogs);
    } catch (error) {
      console.error("Error deleting blog", error);
    }
  };

  return (
    <section id="blog" className="bg-gray-100 py-10">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Latest Insights & Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6"></div>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Sl</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Excerpt</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Image</th>
              <th className="border border-gray-300 px-4 py-2 text-left w-52">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <tr key={blog._id} className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{blog.title}</td>
                <td className="border border-gray-300 px-4 py-2">{blog.content.slice(0, 70)}...</td>
                <td className="border border-gray-300 px-4 py-2">
                  <img src={blog.image} alt={blog.title} className="w-52 h-20" />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => openEditModal(blog)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Del
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2"> 
              <h2 className="text-xl font-bold mb-4">Edit Blog</h2>
              <input
                type="text"
                placeholder="Title"
                value={updatedBlog.title}
                onChange={(e) => setUpdatedBlog({ ...updatedBlog, title: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded"
              />
              <textarea
                placeholder="Content"
                value={updatedBlog.content}
                onChange={(e) => setUpdatedBlog({ ...updatedBlog, content: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded"
                rows={4}
                
              ></textarea>
              <input
                type="text"
                placeholder="Image URL"
                value={updatedBlog.image}
                onChange={(e) => setUpdatedBlog({ ...updatedBlog, image: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded"
              />
              <div className="flex justify-end">
                <button
                  onClick={closeEditModal}
                  className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEdit}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogEdit;
