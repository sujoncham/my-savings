import { useEffect, useState } from "react";
import axios from "axios";

const MessageAll = () => {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null); // State for selected message
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/message");
                setMessages(response.data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, []);

    const handleRead = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/message/${id}`, { status: "read" });
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

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Messages</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Message</th>
                        <th className="py-2 px-4 border-b">Status</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {messages.map((message) => (
                        <tr key={message._id}>
                            <td className="py-2 px-4 border-b">{message.name}</td>
                            <td className="py-2 px-4 border-b">{message.email}</td>
                            <td className="py-2 px-4 border-b">{message.message}</td>
                            <td className="py-2 px-4 border-b">{message.status}</td>
                            <td className="py-2 px-4 border-b">
                                {message.status !== "read" ? (
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                        onClick={() => openModal(message)}
                                    >
                                        Mark as Read
                                    </button>
                                ) : (
                                    "Done"
                                )}
                            </td>
                        </tr>
                    ))}
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
