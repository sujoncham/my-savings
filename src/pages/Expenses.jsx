import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses } from "../redux/features/expensesSlice";

const Expenses = () => {
    const dispatch = useDispatch();
    const { expenses, loading, error } = useSelector((state) => state.expenses);
    console.log(expenses)

    useEffect(() => {
        
            dispatch(fetchExpenses());
    
    }, [ dispatch]);

    const totalExpense = expenses?.reduce((total, expen) => total + expen.expense, 0);

    if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto p-5">
            
            <div className="py-10">
            <h2 className="text-xl font-bold mb-4">Expense History - { totalExpense}tk</h2>
            <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white">
                    <tr>
                        <th className="py-4 px-6 text-left font-semibold uppercase tracking-wider">Sl</th>
                        <th className="py-4 px-6 text-left font-semibold uppercase tracking-wider">Date</th>
                        <th className="py-4 px-6 text-left font-semibold uppercase tracking-wider">Title</th>
                        <th className="py-4 px-6 text-left font-semibold uppercase tracking-wider">Amount</th>
                        <th className="py-4 px-6 text-left font-semibold uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses?.length ? expenses.map((expen, index) => (
                        <tr key={expen._id} className="bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">
                                {index +1}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {new Date(expen.createdAt).toDateString()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{expen.title}</td>
                            <td className="border border-gray-300 px-4 py-2">{expen.expense}tk</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {expen.note }
                            </td>
                        </tr>
                    )) : (<tr className="bg-gray-50">
                        
                        <td className="border border-gray-300 px-4 py-2">No expense yet</td>
                        
                    </tr>)}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default Expenses;
