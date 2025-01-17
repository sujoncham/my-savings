import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDonation, fetchDonations } from "../redux/features/donationSlice";


const AddDonation = () => {
  const [donationAmount, setDonationAmount] = useState("");
  const dispatch = useDispatch();

  const { totalCollectionAmount, totalDonatedAmount } = useSelector((state) => state.donations);
  console.log(totalCollectionAmount, totalDonatedAmount)
  const remainingTotal = totalCollectionAmount - totalDonatedAmount

  useEffect(() => {
    dispatch(fetchDonations());
  }, [dispatch]);

  const handleAddDonation = async (e) => {
    e.preventDefault();
    const amount = parseFloat(donationAmount);
    
      dispatch(addDonation(amount));
      setDonationAmount("");
    
  };

  return (
    <div>
      <div className="my-4">
        <h2 className="text-lg font-bold">Total Collection Amount: ${totalCollectionAmount}</h2>
        <h2 className="text-lg font-bold">Remaining Total Collection Amount: ${remainingTotal}</h2>

      </div>
      <div className="mb-10 border-2 border-blue-500 p-5 rounded">
        <h2 className="text-lg font-bold mb-4">Add to Collection</h2>
        <form onSubmit={handleAddDonation}>
          <input
            type="number"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            placeholder="Donation Amount"
            className="w-full p-2 border rounded mb-4"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};


export default AddDonation;