

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  fetchLoans, editLoans, deleteLoan, updateLoanStatus, } from "../redux/features/loanSlice";

const LoanEdit = () => {
  const { loans, loading, error } = useSelector((state) => state.loans);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLoan, setCurrentLoan] = useState(null);
  const [newLoans, setNewLoan] = useState("");
  const [loanerName, setLoanerName] = useState("");
  const [loanNote, setLoanNote] = useState("");

   useEffect(() => {
      dispatch(fetchLoans());
      dispatch(editLoans());
    }, [dispatch]);

  const openModal = (loan) => {
    setCurrentLoan(loan);
    setNewLoan(loan.totalLoan);
    setLoanerName(loan.name);
    setLoanNote(loan.note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentLoan(null);
    setNewLoan("");
  };

  const handleSave =async () => {
    if (currentLoan && newLoans) {
        await dispatch(editLoans({ id: currentLoan._id, name:loanerName, note:loanNote, totalLoan: parseInt(newLoans) }));
        dispatch(fetchLoans());
      closeModal();
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Delete Expense Handler
      const handleDelete = (id) => {
        dispatch(deleteLoan(id));
        const updatedLoans = loans.filter((loan) => loan._id !== id);
  dispatch({ type: 'loans/setLoans', payload: updatedLoans });
      };

  const handleStatusChange = async (id) => {
    await dispatch(updateLoanStatus(id));
    setIsModalOpen(false);
    };

  return (
    <div>
      <div>
      <h2 className="text-2xl font-bold mb-4">Loan Edit</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
        {loans.length ? loans?.map((loan) => (
          <div
            key={loan._id}
            className="bg-white p-4 shadow-md rounded-md border border-gray-200 flex justify-between items-center"
          >
           
            <div className=''>
            <h2 className="text-lg font-semibold">{loan.name}</h2>
              <p>Total Loan: {loan.totalLoan} Taka</p>
            </div>
            <div>
            <button
              onClick={() => openModal(loan)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mt-3"
            >
              Edit loan
              </button>
              <button
              onClick={() => handleDelete(loan._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              del loan
            </button>
            </div>
            
          </div>
        )) : <div className="bg-white p-4 shadow-md rounded-md border border-gray-200">No loans found</div>}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-md shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-3">
              Edit Loan for {currentLoan?.name}
            </h3>
            <input
              type="text"
              value={loanerName}
              onChange={(e) => setLoanerName(e.target.value)}
              placeholder="Enter Name"
              className="w-full p-2 border border-gray-300 rounded mb-3"
            />
            <input
              type="number"
              value={newLoans}
              onChange={(e) => setNewLoan(e.target.value)}
              placeholder="Enter new savings"
              className="w-full p-2 border border-gray-300 rounded mb-3"
            />
            <input
              type="text"
              value={loanNote}
              onChange={(e) => setLoanNote(e.target.value)}
              placeholder="Enter note"
              className="w-full p-2 border border-gray-300 rounded mb-3"
            />
            <div className="flex justify-between items-center gap-2 mb-5">
                  <p>Status :</p>
                <button 
                  onClick={() => handleStatusChange(currentLoan._id)} 
                  className={`px-3 py-1 rounded
                    ${currentLoan.status === "pending" ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"}`}
                >
                  {currentLoan.status === "pending" ? "Pending" : "Completed"}
                </button>
                </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
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



export default LoanEdit;