import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPersons, updateSavings } from '../redux/features/personSlice';
import axios from 'axios';

const SavingsEdit = () => {
  const { persons, loading, error } = useSelector((state) => state.persons);
  // console.log(persons)
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPerson, setCurrentPerson] = useState(null);
  const [newSavings, setNewSavings] = useState("");
  const [personName, setPersonName] = useState("");

  useEffect(() => {
    dispatch(fetchPersons());
  }, [dispatch]);

  const openModal = (person) => {
    setCurrentPerson(person);
    setNewSavings(person.savings);
    setPersonName(person.name);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentPerson(null);
    setNewSavings("");
  };

  const handleSave =async () => {
    if (currentPerson && newSavings) {
        await dispatch(updateSavings({ id: currentPerson._id, name:personName, savings: parseInt(newSavings) }));
        dispatch(fetchPersons());
      closeModal();
    }
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:5000/api/persons/${id}`);
  
    } catch (error) {
        console.error("There was an error deleting the expense!", error);
    }
};

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {persons.length === 0
          ? "No persons created yet"
          : persons.map((person) => (
              <div
                key={person._id}
                className="flex justify-between items-center gap-3 bg-white p-4 shadow-md rounded-md border border-gray-200"
              >
                <div>
                  <h2 className="text-lg font-semibold">{person.name}</h2>
                  <p className="text-gray-600">Savings: {person.savings} Taka</p>
                </div>
                <button
                  onClick={() => openModal(person)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => handleDelete(person._id)}>del</button>
              </div>
            ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-md shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-3">
              Edit Savings for {currentPerson?.name}
            </h3>
            <input
              type="text"
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              placeholder="Enter Name"
              className="w-full p-2 border border-gray-300 rounded mb-3"
            />
            <input
              type="number"
              value={newSavings}
              onChange={(e) => setNewSavings(e.target.value)}
              placeholder="Enter new savings"
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

export default SavingsEdit;
