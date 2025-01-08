import  { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateLoan , fetchLoans, addLoan} from "../redux/features/loanSlice";
import LoanDetails from "../componants/LoanDetails";
import { fetchPersons } from "../redux/features/personSlice";

const Loan = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loanModalOpen, setLoanModalOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [currentLoan, setCurrentLoan] = useState(null);
  const [partialPayment, setPartialPayment] = useState("");
  const [interestPayment, setInterestPayment] = useState("");
  const [name, setName] = useState("");
  const [loanAmount, setLoanAmount] = useState("");


  const { loans, loading, error } = useSelector((state) => state.loans);
  const { persons} = useSelector((state) => state.persons);
  const dispatch = useDispatch();

  const totalBalance = persons?.reduce((total, person) => {
    // console.log("Person Savings:", person?.savings); 
    return total + (person?.savings || 0);
  }, 0);
  // console.log("Total Balance:", totalBalance);

  // Total loans issued
  const totalLoan = loans?.reduce((total, loan) => total + loan.totalLoan, 0);

  // Current total balance (total savings - total loans)
  const currentTotalBalance = totalBalance - totalLoan;

  useEffect(() => {
    dispatch(fetchLoans());
    dispatch(fetchPersons());
  }, [dispatch]);

  const openModal = (loan) => {
    setCurrentLoan(loan);
    setPartialPayment("");
    setInterestPayment("");
    setIsModalOpen(true);
  };

  const openHistoryModal = (loan) => {
    setCurrentLoan(loan);
    setHistoryModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentLoan(null);
    setName("");
    setLoanAmount("");
    setIsModalOpen(false);
    setLoanModalOpen(false)
    setHistoryModalOpen(false);
  };

  

  const handleDeductPayment = () => {
    if (!partialPayment && !interestPayment) {
      alert("Please enter payment amounts.");
      return;
    }

    const updatedLoan = {
      id: currentLoan._id,
      partialPayment: parseFloat(partialPayment) || 0,
      interestPayment: parseFloat(interestPayment) || 0,
    };

    dispatch(updateLoan(updatedLoan));
    closeModal();
  };


  const handleAddLoan = async (e) => {
    e.preventDefault();
    if (!name || !loanAmount) {
      alert("Please fill in all fields.");
      return;
    }
    const newLoan = { name, totalLoan: Number(loanAmount) };
    await dispatch(addLoan(newLoan));
    closeModal();
    dispatch(fetchLoans()); // Refresh the loan list after adding a new loan
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

 

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-4xl font-bold mb-5 text-center">Loan Management </h1>
      <hr />
      <div className="flex justify-between items-center bg-green-500 p-5">
        <div>
          <h2 className="text-lg font-semibold">Total Balance: {totalBalance || 0} Taka</h2>
          <h2 className="text-lg font-semibold">Total Loan: {totalLoan || 0} Taka</h2>
          <h2 className="text-lg font-semibold">Total Current Balance: {currentTotalBalance} Taka</h2>
        </div>
        <div className="">
        <button
          onClick={() => setLoanModalOpen(true)}
          disabled={currentTotalBalance === 0} // Disable only when loans.length is 0
          className={
            currentTotalBalance === 0
              ? "bg-red-500 text-white px-4 py-2 rounded cursor-not-allowed" // Red and disabled styling
              : "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" // Blue and enabled styling
          }
        >
          Add Loan
        </button>
      </div>
      </div>
      <hr className="m-10"/>
      {/* Add Loan Button */}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loans?.map((loan) => (
          <div
            key={loan._id}
            className="bg-white p-4 shadow-md rounded-md border border-gray-200"
          >
           
            <div>
            <h2 className="text-lg font-semibold">{loan.name}</h2>
              <p>Total Loan: {loan.totalLoan} Taka</p>
              <p>Total Interest: {loan.totalInterest} Taka</p>
              <p>Remaining Loan: {loan.remainingLoan} Taka</p>
              <p>Remaining Interest: {loan.remainingInterest} Taka</p>
            </div>
            <button
              onClick={() => openModal(loan)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mt-3"
            >
              Deduct Payment
            </button>
            <button
              onClick={() => openHistoryModal(loan)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mt-3"
            >
              Show History
            </button>
          </div>
        ))}
      </div>

      {loanModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-md shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-3">Add Loan</h3>
            <form onSubmit={handleAddLoan}>
              <input
                type="text"
                placeholder="Receiver Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-3"
              />
              <input
                type="number"
                placeholder="Loan Amount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-3"
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Add Loan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-md shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-3">
              Deduct Payment for {currentLoan?.name}
            </h3>
            <input
              type="number"
              value={partialPayment}
              onChange={(e) => setPartialPayment(e.target.value)}
              placeholder="Loan Payment"
              className="w-full p-2 border border-gray-300 rounded mb-3"
            />
            <input
              type="number"
              value={interestPayment}
              onChange={(e) => setInterestPayment(e.target.value)}
              placeholder="Interest Payment"
              className="w-full p-2 border border-gray-300 rounded mb-3"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeductPayment}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Deduct
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {historyModalOpen && currentLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-md shadow-lg w-full max-w-3xl">
            
            <LoanDetails loan={currentLoan} />
            <button
              onClick={closeModal}
              className="mt-4 bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loan;
