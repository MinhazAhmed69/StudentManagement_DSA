import React, { useState } from 'react';

function SearchStudent() {
  const [searchId, setSearchId] = useState('');
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5001/api/students/${searchId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Student not found');
        }
        return response.json();
      })
      .then((data) => {
        setStudent(data.student);
        setError('');
      })
      .catch((err) => {
        setStudent(null);
        setError(err.message);
      });
  };

  return (
    <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 shadow-lg rounded-xl mt-6 animate-fade-in">
      <h3 className="text-xl font-semibold text-green-800 mb-4">Search Student</h3>
      <form onSubmit={handleSearch} className="space-y-4">
        <input
          type="text"
          placeholder="Enter Student ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-300 transition"
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition transform hover:scale-105"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-500 mt-3">{error}</p>}
      {student && (
        <div className="mt-4 p-4 bg-white border border-green-200 rounded shadow">
          <h4 className="text-lg font-bold text-green-700">Student Found:</h4>
          <p>Name: {student.name}</p>
          <p>ID: {student.id}</p>
        </div>
      )}
    </div>
  );
}

export default SearchStudent;