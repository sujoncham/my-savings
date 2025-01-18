import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense, fetchExpenses, updateExpense } from "../redux/features/expensesSlice";


const ExpenseEdit = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentExpense, setCurrentExpense] = useState({ title: "", expense: "", note: "" });


    const { expenses, loading, error } = useSelector((state) => state.expenses);
    const dispatch = useDispatch();

    const totalExpense = expenses?.reduce((total, expen) => total + expen.expense, 0);

    useEffect(() => {
        dispatch(fetchExpenses());
    }, [dispatch]);

  

    // Open Edit Modal
    const openEditModal = (expense) => {
        setCurrentExpense({ ...expense });
        setIsOpen(true);
    };

    // Save Edited Expense
    const handleSave = async () => {
        if (!currentExpense?.title?.trim() || isNaN(parseFloat(currentExpense?.expense))) {
            alert("Title and a valid Expense Amount are required.");
            return;
        }
    
        const updatedExpense = {
            id: currentExpense._id,
            title: currentExpense.title.trim(),
            expense: parseFloat(currentExpense.expense),
            note: currentExpense.note?.trim() || "",
        };
    
        try {
            await dispatch(updateExpense(updatedExpense));
            setIsOpen(false);
            setCurrentExpense(null);
        } catch (error) {
            console.error("Error updating expense:", error);
        }
    };
    

    // Delete Expense Handler
    const handleDelete = (id) => {
        dispatch(deleteExpense(id));
    };

    // const handleDelete = async (id) => {
    //     try {
    //         await axios.delete(`http://localhost:5000/api/expenses/${id}`);
      
    //     } catch (error) {
    //         console.error("There was an error deleting the expense!", error);
    //     }
    // };

    return (
        <div className="container mx-auto p-5">
            

            <h2 className="text-xl font-bold mb-4">Expense History - {totalExpense}tk</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
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
                        {expenses?.map((expen, index) => (
                            <tr key={expen._id} className="bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
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
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Del
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Edit Modal */}
            {isOpen && currentExpense && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded shadow-lg">
                        <h3 className="text-lg font-semibold mb-3">Edit Expense</h3>
                        <input
                            type="text"
                            value={currentExpense?.title || ""}
                            onChange={(e) =>
                                setCurrentExpense({ ...currentExpense, title: e.target.value })
                            }
                            placeholder="Title"
                            className="w-full p-2 border border-gray-300 rounded mb-3"
                        />
                        <input
                            type="number"
                            value={currentExpense?.expense || ""}
                            onChange={(e) =>
                                setCurrentExpense({ ...currentExpense, expense: e.target.value })
                            }
                            placeholder="Expense Amount"
                            className="w-full p-2 border border-gray-300 rounded mb-3"
                        />
                        <input
                            type="text"
                            value={currentExpense?.note || ""}
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
