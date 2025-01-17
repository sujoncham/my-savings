import { useState } from "react";
import { addExpense } from "../redux/features/expensesSlice";
import { useDispatch } from "react-redux";


const AddExpense = () => {
    const [currentExpense, setCurrentExpense] = useState({ title: "", expense: "", note: "" });
    const dispatch = useDispatch();

      // Add Expense Handler
      const handleAddExpense = async (e) => {
        e.preventDefault();
    
        // Validate fields
        if (!currentExpense?.title?.trim() || isNaN(parseFloat(currentExpense?.expense))) {
            alert("Title and a valid Expense Amount are required.");
            return;
        }
    
        const newExpense = {
            title: currentExpense.title.trim(),
            expense: parseFloat(currentExpense.expense), // Ensure it's a number
            note: currentExpense.note?.trim() || "",
        };
    
        try {
            await dispatch(addExpense(newExpense));
            setCurrentExpense(null); // Reset the form after adding
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };
    
    return (
        <div className="container mx-auto p-5">
            <div className="mb-10 border-2 border-blue-500 p-5 rounded">
                <h3 className="text-lg font-semibold mb-3">Add Expense</h3>
                <form onSubmit={handleAddExpense}>
                    <input
                        type="text"
                        value={currentExpense?.title || ""}
                        onChange={(e) =>
                            setCurrentExpense({ ...currentExpense, title: e.target.value })
                        }
                        placeholder="Title"
                        className="w-full p-2 border border-gray-300 rounded mb-3"
                        required
                    />
                    <input
                        type="number"
                        value={currentExpense?.expense || ""}
                        onChange={(e) =>
                            setCurrentExpense({ ...currentExpense, expense: e.target.value })
                        }
                        placeholder="Expense Amount"
                        className="w-full p-2 border border-gray-300 rounded mb-3"
                        required
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
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                        Add Expense
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddExpense;