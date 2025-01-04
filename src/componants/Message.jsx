import { useState } from "react";

const Message = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://amar-savings-loan.onrender.com/api/message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Message sent successfully!", data);
                setFormData({
                    name: "",
                    email: "",
                    message: "",
                });
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error sending message:", error);
            alert("An error occurred while sending your message. Please try again.");
        }
    };

    return (
        <section className="bg-gradient-to-r from-blue-500 to-teal-500 py-20">
            <div className="container mx-auto">
                <h2 className="text-2xl font-bold text-center mb-8">Get in Touch</h2>
                <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            className="w-full p-3 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            className="w-full p-3 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <textarea
                            placeholder="Your Message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="4"
                            className="w-full p-3 border rounded"
                            required
                        ></textarea>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Message;
