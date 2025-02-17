

const AddLoan = ({
  handleAddLoan,
  setName,
  loanAmount,
  setLoanAmount,
  closeModal,
  name,
  setReferName,
  referName,
  setRecieveDate,
  recieveDate
}) => {
    return (
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
              <input
                type="text"
                placeholder="refer name"
                value={referName}
                onChange={(e) => setReferName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-3"
              />
              <input
                type="date"
                placeholder="Loan Recieve date"
                value={recieveDate}
                onChange={(e) => setRecieveDate(e.target.value)}
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
    );
};

export default AddLoan;