
import  { useState } from "react";
import axios from "axios";
const AddTestimonial = () => {
    const [testimonial, setTestimonial] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");

    const [image, setImage] = useState("");
  
    const handleAddTestimonial = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("text", testimonial);
            formData.append("name", name);
            formData.append("role", role);
            formData.append("image", image);

            const response = await axios.post("https://amar-savings-loan.onrender.com/api/testimonials/addTestimonial", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response);
            setTestimonial("");
            setName("");
            setRole("");
            setImage("");
        } catch (error) {
            console.error("There was an error adding the testimonial!", error);
        }
    };
    return (
        <section className="bg-gray-100 py-16"> 
        <div className="mt-16">
          <h3 className="text-xl font-bold mb-4">Add Your Testimonial</h3>
          <form onSubmit={handleAddTestimonial} className="bg-gray-100 p-6 rounded shadow">
            <div className="mb-4">
              <textarea
                name="text"
                value={testimonial}
                onChange={(e) => setTestimonial(e.target.value)}
                placeholder="Your Testimonial"
                className="w-full p-3 border rounded"
                rows="3"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full p-3 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Your Role"
                className="w-full p-3 border rounded"
                required
              />
            </div>
            <div className="mb-4">
                <input
                    type="file"
                    name="image"
                    onChange={(e) => setImage(e.target.files[0])}
                    placeholder="Your Image URL (optional)"
                    className="w-full p-3 border rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Add Testimonial
            </button>
          </form>
        </div>
      
    </section>
    );
};

export default AddTestimonial;