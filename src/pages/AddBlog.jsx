import { useState } from "react";
import axios from "axios";

const AddBlog = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);

    const handleAddExpense = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            formData.append("image", image[0]);

            const response = await axios.post("https://amar-savings-loan.onrender.com/api/blogs/addBlog", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response);
            setTitle("");
            setContent("");
            setImage(null);
        } catch (error) {
            console.error("There was an error adding the blog!", error);
        }
    };

    return (
        <div className="container mx-auto px-5 py-10 m-10">
            <div className="mb-10 border-2 border-blue-500 p-5 rounded">
                <h3 className="text-lg font-semibold mb-3">Add Blog</h3>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="w-full p-2 border border-gray-300 rounded mb-3"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                    className="w-full p-2 border border-gray-300 rounded mb-3"
                />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files)}
                    className="w-full p-2 border border-gray-300 rounded mb-3"
                />
                <button
                    onClick={handleAddExpense}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                    Add Blog
                </button>
            </div>
        </div>
    );
};

export default AddBlog;
