import { useEffect, useState } from "react";
import axios from "axios";

const MessageAll = () => {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null); // State for selected message
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get("https://amar-savings-loan.onrender.com/api/message");
                setMessages(response.data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, []);

    const handleRead = async (id) => {
        try {
            await axios.put(`https://amar-savings-loan.onrender.com/api/message/${id}`, { status: "read" });
            setMessages(
                messages.map((message) =>
                    message._id === id ? { ...message, status: "read" } : message
                )
            );
        } catch (error) {
            console.error("Error updating message status:", error);
        }
    };

    const openModal = (message) => {
        setSelectedMessage(message);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMessage(null);
    };

    const handleReadAndClose = (id) => {
        handleRead(id);
        closeModal();
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://amar-savings-loan.onrender.com/api/message/${id}`);
        } catch (error) {
            console.error("There was an error deleting the expense!", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Messages</h1>
            <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
    <thead className="bg-blue-500 text-white">
        <tr>
            <th className="py-4 px-6 text-left font-semibold uppercase tracking-wider">Name</th>
            <th className="py-4 px-6 text-left font-semibold uppercase tracking-wider">Email</th>
            <th className="py-4 px-6 text-left font-semibold uppercase tracking-wider">Message</th>
            <th className="py-4 px-6 text-left font-semibold uppercase tracking-wider">Status</th>
            <th className="py-4 px-6 text-left font-semibold uppercase tracking-wider">Actions</th>
        </tr>
    </thead>
    <tbody>
        {messages.length ? (
            messages.map((message) => (
                <tr
                    key={message._id}
                    className="odd:bg-gray-50 even:bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                >
                    <td className="py-4 px-6 border-b border-gray-200">{message.name}</td>
                    <td className="py-4 px-6 border-b border-gray-200">{message.email}</td>
                    <td className="py-4 px-6 border-b border-gray-200">{message.message}</td>
                    <td className="py-4 px-6 border-b border-gray-200">
                        <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                message.status === "read"
                                    ? "bg-green-100 text-green-600"
                                    : "bg-yellow-100 text-yellow-600"
                            }`}
                        >
                            {message.status}
                        </span>
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200">
                        {message.status !== "read" ? (
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                onClick={() => openModal(message)}
                            >
                                Mark as Read
                            </button>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-600">Done</span>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                    onClick={() => handleDelete(message._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </td>
                </tr>
            ))
        ) : (
            <tr>
                <td
                    colSpan="5"
                    className="py-6 px-6 border-b border-gray-200 text-center text-gray-500"
                >
                    No messages yet
                </td>
            </tr>
        )}
    </tbody>
</table>


            {/* Modal */}
            {isModalOpen && selectedMessage && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Message Details</h2>
                        <p><strong>Name:</strong> {selectedMessage.name}</p>
                        <p><strong>Email:</strong> {selectedMessage.email}</p>
                        <p><strong>Message:</strong> {selectedMessage.message}</p>
                        <div className="mt-4 flex justify-end gap-4">
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={() => handleReadAndClose(selectedMessage._id)}
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessageAll;
