import { useEffect, useState } from "react";
import axios from "axios";

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
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


    return (
        <div className="container mx-auto p-5">
            
            <div className="py-10">
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
                                {expen.note }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default Expenses;
