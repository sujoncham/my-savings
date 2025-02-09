import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCollection, deductOther, fetchOthers} from "../redux/features/donationSlice";
import DonatedHistoryTable from "../componants/DonatedHistoryTable";
import CollectionAmountTable from "../componants/CollectionAmountTable";

const DonationDonate = () => {
  
  const [donateTitle, setDonateTitle] = useState("");
  const [donateAmount, setDonateAmount] = useState("");
  const [donateNote, setDonateNote] = useState("");
  const [collectionAmount, setCollectionAmount] = useState("");
  const [collectionTitle, setCollectionTitle] = useState("");
  const [collectionNote, setCollectionNote] = useState("");     

 

  const dispatch = useDispatch();
  const { totalCollectionAmount, totalDonatedAmount, donationHistory, collectionHistory} = useSelector((state) => state.donations);
  const currentBalance = totalCollectionAmount - totalDonatedAmount;
 

  useEffect(() => {
    dispatch(fetchOthers());
  }, [dispatch]);

  const handleAddCollection = () => {
    dispatch(addCollection({ title: collectionTitle, amount: parseFloat(collectionAmount), note: collectionNote }));
    setCollectionAmount("");
    setCollectionTitle("");
    setCollectionNote("");
    dispatch(fetchOthers());
  };

  const handleDonate = () => {
    dispatch(deductOther({ title: donateTitle, amount: parseFloat(donateAmount), note: donateNote }));
    setDonateTitle("");
    setDonateAmount("");
    setDonateNote("");
  };


  return (
    <div className="container mx-auto">
      <div className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Donation Management</h1>

        {/* Total Summary */}
        <div className="grid md:grid-cols-3 gap-3 mb-10">
          <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700">Total Collected</h2>
            <p className="text-3xl font-bold text-green-600">${totalCollectionAmount}</p>
          </div>

          <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700">Total Donated</h2>
            <p className="text-3xl font-bold text-red-600">${totalDonatedAmount}</p>
          </div>

          <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700">Current Balance</h2>
            <p className="text-3xl font-bold text-green-600">${currentBalance}</p>
          </div>
        </div>

        {/* Add Collection */}
        <div className="p-6 bg-white shadow rounded-lg mb-10">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Add to Collection</h3>
          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <input
              type="text"
              value={collectionTitle}
              onChange={(e) => setCollectionTitle(e.target.value)}
              placeholder="Enter title"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="number"
              value={collectionAmount}
              onChange={(e) => setCollectionAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              value={collectionNote}
              onChange={(e) => setCollectionNote(e.target.value)}
              placeholder="Note (Optional)"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleAddCollection}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Add Collection
            </button>
          </div>
        </div>

        <CollectionAmountTable collectionHistory={collectionHistory} />

        {/* Make a Donation */}
        <div className="p-6 bg-white shadow rounded-lg mb-10">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Make a Donation</h3>
          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <input
              type="text"
              value={donateTitle}
              onChange={(e) => setDonateTitle(e.target.value)}
              placeholder="Donation Title"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              value={donateAmount}
              onChange={(e) => setDonateAmount(e.target.value)}
              placeholder="Donation Amount"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={donateNote}
              onChange={(e) => setDonateNote(e.target.value)}
              placeholder="Note (Optional)"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          <button
            onClick={handleDonate}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
            Donate
          </button>
            </div>
        </div>

        <DonatedHistoryTable
          donationHistory={donationHistory}
        />
      </div>
    </div>
  );
};

export default DonationDonate;
