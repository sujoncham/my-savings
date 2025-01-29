import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  deductDonation, deleteDonated, editDonated, fetchDonations } from "../redux/features/donationSlice";

const Donation = () => {
  const [donateTitle, setDonateTitle] = useState("");
  const [donateAmount, setDonateAmount] = useState("");
  const [editMode, setEditMode] = useState(null); // Tracks the ID of the donation being edited
  const [editTitle, setEditTitle] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const dispatch = useDispatch();

  const { totalCollectionAmount, donationHistory, totalDonatedAmount } = useSelector((state) => state.donations);
  // console.log({donationHistory})
  // console.log(totalCollectionAmount)
  // console.log(totalDonatedAmount)

  const remainingTotal = totalCollectionAmount - totalDonatedAmount

  useEffect(() => {
    dispatch(fetchDonations());
    dispatch(deductDonation())
  }, [dispatch]);

  const handleDonate = async (e) => {
    e.preventDefault();
    const amount = parseFloat(donateAmount);
      await dispatch(deductDonation({ title: donateTitle, amount }));
      setDonateTitle("");
      setDonateAmount("");
     
  };

  const handleEditClick = (donation) => {
    setEditMode(donation._id);
    setEditTitle(donation.title);
    setEditAmount(donation.amount);
  };

  const handleDeleteClick = async (id) => {
  try {
    const response = await dispatch(deleteDonated(id)).unwrap();
    console.log("Delete Response:", response); // Ensure the response contains the correct ID
  } catch (error) {
    console.error("Error deleting donation:", error); // Log error details
  }
};

const handleSaveEdit = async () => {
  try {
    const updatedDonation = { id: editMode, title: editTitle, amount: parseFloat(editAmount) };
    const response = await dispatch(editDonated(updatedDonation)).unwrap();
    console.log("Edit Response:", response); // Ensure the response contains updated donation
    dispatch(fetchDonations());
    setEditMode(null); // Exit edit mode
  } catch (error) {
    console.error("Error editing donation:", error); // Log error details
  }
};

  return (
    <div className="p-4">
      <div className="mb-10 border-2 border-blue-500 p-5 rounded">
        <h2 className="text-lg font-bold mb-4">Make a Donate</h2>
        <form onSubmit={handleDonate}>
          <input
            type="text"
            value={donateTitle}
            onChange={(e) => setDonateTitle(e.target.value)}
            placeholder="Donation Title"
            className="w-full p-2 border rounded mb-4"
            required
          />
          <input
            type="number"
            value={donateAmount}
            onChange={(e) => setDonateAmount(e.target.value)}
            placeholder="Donate Amount"
            className="w-full p-2 border rounded mb-4"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Donate
          </button>
        </form>
      </div>
      <div className="bg-blue-500 p-5 rounded-md text-white">
      <h2 className="text-lg font-bold">Total Donated Amount: ${totalDonatedAmount}</h2>
      <h2 className="text-lg font-bold">Remaining Total Collection Amount: ${remainingTotal}</h2>
      </div>
      <div className="mt-10">
      <table className="w-full border-collapse border border-gray-300 rounded-md overflow-hidden">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="border px-6 py-3 text-left">#</th>
            <th className="border px-6 py-3 text-left">Donation Title</th>
            <th className="border px-6 py-3 text-left">Amount</th>
            <th className="border px-6 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
        {donationHistory.map((donation, index) => (
              <tr
                key={donation._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-blue-100 transition`}
              >
                <td className="border px-6 py-3">{index + 1}</td>
                <td className="border px-6 py-3">
                  {editMode === donation._id ? (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    `${donation.title}`
                  )}
                </td>
                <td className="border px-6 py-3 text-green-600 font-bold">
                  {editMode === donation._id ? (
                    <input
                      type="number"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    `${donation.amount}`
                  )}
                </td>
                <td>
                  {editMode === donation._id ? (
                    <button
                      onClick={handleSaveEdit}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                  ) : (
                  <>
                  <button
                      onClick={() => handleEditClick(donation)}
                      className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(donation._id)}
                      className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
                    >
                      Del
                    </button>
                  </>
                  )}
                </td>
              </tr>
            ))}

        </tbody>
        </table>
        </div>

    </div>
  );
};


export default Donation;
