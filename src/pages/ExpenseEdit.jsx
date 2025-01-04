import { useEffect, useState } from "react";
import axios from "axios";

const ExpenseEdit = () => {
    const [title, setTitle] = useState("");
    const [expense, setExpense] = useState("");
    const [note, setNote] = useState("");
    const [expenses, setExpenses] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [currentExpense, setCurrentExpense] = useState(null); // Track the expense being edited

    const totalExpense = expenses?.reduce((total, expen) => total + expen.expense, 0);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get("https://amar-savings-loan.onrender.com/api/expenses");
                setExpenses(response.data.data.expenses);
            } catch (error) {
                console.error("There was an error fetching the expenses!", error);
            }
        };
        fetchExpenses();
    }, []);

    const handleAddExpense = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://amar-savings-loan.onrender.com/api/expenses", { title, expense, note });
            setExpenses((prevExpenses) => [...prevExpenses, response.data.data.expense]); // Add new expense to the list
            setTitle("");
            setExpense("");
            setNote("")
        } catch (error) {
            console.error("There was an error adding the expense!", error);
        }
    };

    const openEditModal = (expense) => {
        setCurrentExpense({
            title: expense.title,
            expense: expense.expense,
            note: expense.note,
            _id: expense._id,
        });
        setIsOpen(true);
    };

    const handleSave = async () => {
        if (!currentExpense) return;

        try {
            const updatedExpense = {
                title: currentExpense.title,
                expense: currentExpense.expense,
                note: currentExpense.note,
            };

             await axios.put(`https://amar-savings-loan.onrender.com/api/expenses/${currentExpense._id}`, updatedExpense);

            // Update the local state with the updated expense
            const updatedExpenses = expenses.map((item) =>
                item._id === expense._id ? updatedExpense : item
            );
            setExpenses(updatedExpenses);
            

            setIsOpen(false);
            setCurrentExpense(null);
        } catch (error) {
            console.error("There was an error updating the expense!", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://amar-savings-loan.onrender.com/api/expenses/${id}`);
            // Remove the deleted expense from local state
            setExpenses(expenses.filter((expense) => expense._id !== id));
        } catch (error) {
            console.error("There was an error deleting the expense!", error);
        }
    };

    return (
        <div className="container mx-auto p-5">
            <div className="mb-10 border-2 border-blue-500 p-5 rounded">
                <h3 className="text-lg font-semibold mb-3">Add Expense</h3>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="w-full p-2 border border-gray-300 rounded mb-3"
                />
                <input
                    type="number"
                    value={expense}
                    onChange={(e) => setExpense(e.target.value)}
                    placeholder="Expense Amount"
                    className="w-full p-2 border border-gray-300 rounded mb-3"
                />
                <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Note"
                    className="w-full p-2 border border-gray-300 rounded mb-3"
                />
                <button
                    onClick={handleAddExpense}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                    Add Expense
                </button>
            </div>

            <h2 className="text-xl font-bold mb-4">Expense History - { totalExpense}tk</h2>
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">Sl</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Amount</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expen, index) => (
                        <tr key={expen._id} className="bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">
                                {index +1}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {new Date(expen.createdAt).toDateString()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{expen.title}</td>
                            <td className="border border-gray-300 px-4 py-2">{expen.expense}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button
                                    onClick={() => openEditModal(expen)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                >
                                    Edit
                                </button>{" "}
                                
                                <button
                                    onClick={() => handleDelete(expen._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                >
                                    Del
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isOpen && currentExpense && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded shadow-lg">
                        <h3 className="text-lg font-semibold mb-3">Edit Expense</h3>
                        <input
                            type="text"
                            value={currentExpense?.title || ""} // Use optional chaining to avoid errors
                            onChange={(e) =>
                                setCurrentExpense({ ...currentExpense, title: e.target.value })
                            }
                            placeholder="Title"
                            className="w-full p-2 border border-gray-300 rounded mb-3"
                        />
                        <input
                            type="number"
                            value={currentExpense?.expense || ""} // Use optional chaining to avoid errors
                            onChange={(e) =>
                                setCurrentExpense({ ...currentExpense, expense: e.target.value })
                            }
                            placeholder="Expense Amount"
                            className="w-full p-2 border border-gray-300 rounded mb-3"
                        />
                        <input
                            type="text"
                            value={currentExpense?.note || ""} // Use optional chaining to avoid errors
                            onChange={(e) =>
                                setCurrentExpense({ ...currentExpense, note: e.target.value })
                            }
                            placeholder="Note"
                            className="w-full p-2 border border-gray-300 rounded mb-3"
                        />
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    setCurrentExpense(null);
                                }}
                                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExpenseEdit;
