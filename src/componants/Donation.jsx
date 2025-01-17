import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  deductDonation, fetchDonations } from "../redux/features/donationSlice";

const Donation = () => {
  const [donateTitle, setDonateTitle] = useState("");
  const [donateAmount, setDonateAmount] = useState("");
  const dispatch = useDispatch();

  const { totalCollectionAmount, donationHistory, totalDonatedAmount } = useSelector((state) => state.donations);
  console.log({donationHistory})
  console.log(totalCollectionAmount)
  console.log(totalDonatedAmount)

  const remainingTotal = totalCollectionAmount - totalDonatedAmount

  useEffect(() => {
    dispatch(fetchDonations());
    dispatch(deductDonation())
  }, [dispatch]);

  const handleDonate = async (e) => {
    e.preventDefault();
    const amount = parseFloat(donateAmount);
    
     
        dispatch(deductDonation({ title: donateTitle, amount }));
        setDonateTitle("");
        setDonateAmount("");
     
  };

  return (
    <div className="p-4">
      <div className="mb-10 border-2 border-blue-500 p-5 rounded">
        <h2 className="text-lg font-bold mb-4">Make a Donation</h2>
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
          </tr>
        </thead>
        <tbody>
          {donationHistory?.length > 0 ? (
            donationHistory.map((donation, index) => (
              <tr
                key={donation._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-blue-100 transition`}
              >
                <td className="border px-6 py-3">{index + 1}</td>
                <td className="border px-6 py-3">{donation.title}</td>
                <td className="border px-6 py-3 text-green-600 font-bold">
                  ${donation.amount}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                className="text-center py-6 text-gray-500 font-medium"
              >
                No donations made yet.
              </td>
            </tr>
          )}
        </tbody>
        </table>
        </div>

    </div>
  );
};


export default Donation;
