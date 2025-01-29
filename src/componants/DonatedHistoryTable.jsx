import { useState } from "react";
import { deleteDonated, editDonated, fetchOthers } from "../redux/features/donationSlice";
import { useDispatch } from "react-redux";


const DonatedHistoryTable = ({ donationHistory }) => {
    const [editMode, setEditMode] = useState(null); // Tracks the ID of the donation being edited
    const [editTitle, setEditTitle] = useState("");
    const [editAmount, setEditAmount] = useState("");
    const [editNote, setEditNote] = useState("");
    const dispatch = useDispatch();
    
  const handleEditClick = (donation) => {
    setEditMode(donation._id);
    setEditTitle(donation.title);
    setEditAmount(donation.amount);
    setEditNote(donation.note);
  };

  const handleSaveEdit = async () => {
    try {
      const updatedDonation = { id: editMode, title: editTitle, note: editNote, amount: parseFloat(editAmount) };
      await dispatch(editDonated(updatedDonation)).unwrap();
      setEditMode(null); // Exit edit mode
    } catch (error) {
      console.error("Error editing donation:", error); // Log error details
    }
  };

  const handleDeleteDonation = (id) => {
    if (window.confirm("Are you sure you want to delete this donation?")) {
      dispatch(deleteDonated(id));
      dispatch(fetchOthers());
    }
  };
    return (
        
        <div className="mt-10">
          <table className="w-full border-collapse border border-gray-300 rounded-md overflow-hidden">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border px-6 py-3 text-left">#</th>
                <th className="border px-6 py-3 text-left">Donation Title</th>
                <th className="border px-6 py-3 text-left">Amount</th>
                <th className="border px-6 py-3 text-left">Note</th>
                <th className="border px-6 py-3 text-left">Actions</th>
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
                      donation.title
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
                      donation.amount
                    )}
                  </td>
                  <td className="border px-6 py-3 text-green-600 font-bold">
                    {editMode === donation._id ? (
                      <input
                        type="text"
                        value={editNote}
                        onChange={(e) => setEditNote(e.target.value)}
                        className="w-full p-1 border rounded"
                      />
                    ) : (
                      donation.note
                    )}
                  </td>
                  <td className="border px-6 py-3">
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
                          className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteDonation(donation._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    );
};

export default DonatedHistoryTable;