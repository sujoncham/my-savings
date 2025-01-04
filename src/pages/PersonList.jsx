import  { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPersons, addMoney } from "../redux/features/personSlice";
import axios from "axios";



const PersonList = () => {
  const { persons, loading, error } = useSelector((state) => state.persons);
  // console.log(persons.lenght)
  const dispatch = useDispatch();
  const [name, setName] = useState("")

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPerson, setCurrentPerson] = useState(null);
  // console.log(currentPerson)
  const [inputAmount, setInputAmount] = useState("");


  const handleSubmitNmae = async(e) => {
    e.preventDefault()
    const person = {name}
    
       await axios.post(`https://amar-savings-loan.onrender.com/api/persons/addOwner`, person)
        .then((data)=>{
            console.log('Post created successfully', data);
          // console.log(data);
          setName("")
          setIsOpen(false)
        })
        .catch((err)=>{
            console.log('Post is not created', err);
        })
}


  useEffect(() => {
    dispatch(fetchPersons());
  }, [dispatch]);

  const openModal = (person) => {
    setCurrentPerson(person);
    setInputAmount("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentPerson(null);
  };

  const handleAddMoney = () => {
    if (currentPerson && inputAmount) {
      dispatch(addMoney({ id: currentPerson._id, amount: parseInt(inputAmount) }));
    }
    
  };

  const totalBalance = !loading && persons?.length
  ? persons.reduce((total, person) => total + (person.savings || 0), 0)
  : 0;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  

  return (
    <div className="container mx-auto p-5 mb-16">
      <div className="flex justify-between items-center mb-5">
      <h1 className="text-2xl font-bold text-center">Person List</h1>
        <button onClick={() => setIsOpen(!isOpen)} disabled={persons.length >= 12}
                className={persons.length >= 12 ? "bg-gray-500 text-white px-3 pl-3 py-1 rounded-md" : "bg-blue-500 text-white px-3 pl-3 py-1 rounded hover:bg-blue-600"} 
              >
                Add
              </button>
      </div>
      <hr className="mb-5" />
               {/* Total Balance */}
      <div className="bg-green-100 p-3 mb-5 mt-5 text-center rounded-md shadow-md">
        <h2 className="text-lg font-semibold">
          Total Balance: {loading ? "Calculating..." : `${totalBalance || 0} Taka`}
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {persons.length === 0 ? "no create yet" : persons?.map((person, index) => (
          <div
            key={person._id || index}
            className="bg-white p-4 shadow-md rounded-md border border-gray-200"
          >
            <h2 className="text-lg font-semibold">{person.name}</h2>
            <p className="text-gray-600">Savings: {person.savings} Taka</p>
            <div className="mt-3">
              <button
                onClick={() => openModal(person)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-md shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-3">
              Add Money for {currentPerson?.name}
            </h3>
            <form onClick={handleAddMoney}>
            <input
              type="number"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
              placeholder="Enter amount"
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
                Add
              </button>
            </div>
            </form>
          </div>
        </div>
      )}


      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-md shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-3">
              Add Owner Name
            </h3>
            <form onSubmit={handleSubmitNmae}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="enter name"
              className="w-full p-2 border border-gray-300 rounded mb-3"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={()=>setIsOpen(!isOpen)}
                className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Add
              </button>
            </div>
              </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonList;
