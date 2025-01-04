import { useState } from "react";
import { useDispatch } from "react-redux";
import { deductPartialPayment } from "../redux/features/loanSlice"; // Redux action

// const PartialPaymentModal = ({ loan, isOpen, onClose }) => {
//   const dispatch = useDispatch();
//   const [loanPayment, setLoanPayment] = useState("");
//   const [interestPayment, setInterestPayment] = useState("");

//   const handlePartialPayment = () => {
//     dispatch(
//       deductPartialPayment({
//         id: loan._id,
//         loanPayment: parseFloat(loanPayment) || 0,
//         interestPayment: parseFloat(interestPayment) || 0,
//       })
//     );
//     onClose(); // Close the modal after submission
//   };

//   if (!isOpen) return null;
//   const PartialPaymentModal = ({ loan, isOpen, onClose }) => {
//     const dispatch = useDispatch();
//     const [loanPayment, setLoanPayment] = useState("");
//     const [interestPayment, setInterestPayment] = useState("");
  
const PartialPaymentModal = ({ loan, isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [loanPayment, setLoanPayment] = useState("");
    const [interestPayment, setInterestPayment] = useState("");
  
    const handlePartialPayment = () => {
      if (loanPayment || interestPayment) {
        dispatch(
          deductPartialPayment({
            id: loan._id,
            loanPayment: parseFloat(loanPayment) || 0,
            interestPayment: parseFloat(interestPayment) || 0,
          })
        );
        onClose();
      }
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-5 rounded-md shadow-lg w-80">
          <h3 className="text-lg font-semibold mb-3">
            Partial Payment for {loan.name}
          </h3>
          <p>
            Remaining Loan: <strong>{loan.remainingLoan} Taka</strong>
          </p>
          <p>
            Remaining Interest: <strong>{loan.totalInterest} Taka</strong>
          </p>
          <input
            type="number"
            value={loanPayment}
            onChange={(e) => setLoanPayment(e.target.value)}
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
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handlePartialPayment}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default PartialPaymentModal;
  
  
