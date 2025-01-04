

const LoanDetails = ({ loan }) => {
  console.log(loan)
  
    return (
      <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Payment History for {loan.name}</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Amount Paid</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Interest Added</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Remaining Loan</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Remaining Interest</th>
          </tr>
        </thead>
        <tbody>
          {loan.history.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No payment history available.
              </td>
            </tr>
          ) : (
            loan.history.map((entry, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-50`}
              >
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(entry.date).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {entry.amountPaid.toLocaleString()} Taka
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {entry.interestAdded.toLocaleString()} Taka
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {entry.remainingLoan.toLocaleString()} Taka
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {entry.remainingInterest.toLocaleString()} Taka
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    );
};
  
export default LoanDetails;
  