import  { useState } from "react";
import { useDispatch } from "react-redux";
import { addDonation } from "../redux/features/donationSlice";

const AddDonationModal = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const dispatch = useDispatch();

    const handleAddDonation = (e) => {
        e.preventDefault();
        dispatch(addDonation({ title, amount: parseFloat(amount) }));
        setTitle("");
        setAmount("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow">
                <h2 className="text-lg font-bold mb-4">Add Donation</h2>
                <form onSubmit={handleAddDonation}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        className="w-full p-2 border rounded mb-4"
                        required
                    />
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount"
                        className="w-full p-2 border rounded mb-4"
                        required
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Add Donation
                    </button>
                    <button
                        type="button"
                        className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddDonationModal;
