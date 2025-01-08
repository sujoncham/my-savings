import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoans } from "../redux/features/loanSlice";
import { fetchPersons } from "../redux/features/personSlice";
import { fetchExpenses } from "../redux/features/expensesSlice";

const WelcomePage = () => {
    const { persons } = useSelector((state) => state.persons);
    const { expenses } = useSelector((state) => state.expenses);
    const { loans } = useSelector((state) => state.loans);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLoans());
        dispatch(fetchPersons());
        dispatch(fetchExpenses());
    }, [dispatch]);

    const totalExpense = expenses?.reduce((total, expen) => total + expen.expense, 0);
    const totalBalance = persons?.reduce((total, person) => {
        return total + (person?.savings || 0);
    }, 0);
    const totalLoan = loans?.reduce((total, loan) => total + loan.totalLoan, 0);
    const currentTotalBalance = totalBalance - totalLoan - totalExpense;

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
                    Welcome to Your Dashboard
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Balance */}
                    <div className="bg-white shadow rounded-lg p-6 text-center">
                        <h2 className="text-lg font-semibold text-gray-600">Total Balance</h2>
                        <p className="text-2xl font-bold text-green-500 mt-2">
                            {totalBalance} tk
                        </p>
                    </div>

                    {/* Total Loan */}
                    <div className="bg-white shadow rounded-lg p-6 text-center">
                        <h2 className="text-lg font-semibold text-gray-600">Total Loan</h2>
                        <p className="text-2xl font-bold text-red-500 mt-2">
                            {totalLoan} tk
                        </p>
                    </div>

                    {/* Total Expense */}
                    <div className="bg-white shadow rounded-lg p-6 text-center">
                        <h2 className="text-lg font-semibold text-gray-600">Total Expense</h2>
                        <p className="text-2xl font-bold text-yellow-500 mt-2">
                            {totalExpense} tk
                        </p>
                    </div>

                    {/* Current Balance */}
                    <div className="bg-white shadow rounded-lg p-6 text-center">
                        <h2 className="text-lg font-semibold text-gray-600">Current Balance</h2>
                        <p className="text-2xl font-bold text-blue-500 mt-2">
                            {currentTotalBalance} tk
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
