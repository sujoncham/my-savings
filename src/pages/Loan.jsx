import  { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateLoan , fetchLoans, addLoan} from "../redux/features/loanSlice";
import LoanDetails from "../componants/LoanDetails";
import { fetchPersons } from "../redux/features/personSlice";
import moment from "moment";
import AddLoan from "./AddLoan";

const Loan = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loanModalOpen, setLoanModalOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [currentLoan, setCurrentLoan] = useState(null);
  const [partialPayment, setPartialPayment] = useState("");
  const [interestPayment, setInterestPayment] = useState("");
  const [name, setName] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [referName, setReferName] = useState("");
  const [recieveDate, setRecieveDate] = useState("");


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
      
      <div className="mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
        {loans.length ? loans?.map((loan) => (
          <div
            key={loan._id}
            className="mb-10 border-2 border-blue-500 p-5 rounded bg-green-800"
          >
           
            <div>
              <h2 className="text-4xl font-semibold">{loan.name}</h2>
              <hr className="mb-5"/>
                <div className="flex justify-between items-center ">
                  <div>
                  <p>Total Loan: {loan.totalLoan} Taka</p>
                  <p>Total Interest: {loan.totalInterest} Taka</p>
                  </div>
                  <div> <p>Remaining Loan: {loan.remainingLoan} Taka</p>
                    <p>Remaining Interest: {loan.remainingInterest} Taka</p>
                  </div>
                  <div>
                  <p>Loan Recieved: {moment(loan.createdAt).format("ll")}</p>
                  </div>
                  <div>
                  <p>Loan Refer: {loan.referName}</p>
                  </div>
                  <div>
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
                </div>
            </div>
            
          </div>
        )) : (<div
        className="bg-white p-4 shadow-md rounded-md border border-gray-200"
        > <h1>No Loans Found</h1>
        </div>)}
      </div>
      </div>

      {loanModalOpen && (
        <AddLoan
          setLoanAmount={setLoanAmount}
          loanAmount={loanAmount}
          closeModal={closeModal}
          setName={setName}
          handleAddLoan={handleAddLoan}
          name={name}
          setRecieveDate={setRecieveDate}
          setReferName={setReferName}
          recieveDate={recieveDate}
          referName={referName}
        />
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
