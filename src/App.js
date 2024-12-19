import React from 'react';
import AddStudentForm from './components/AddStudentsForm';
import StudentList from './components/StudentList';
import SearchStudent from './components/SearchStudent';

function App() {
  return (
    <div className="bg-gradient-to-r from-gray-100 via-white to-gray-100 min-h-screen flex flex-col items-center py-10">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 animate-bounce-slow">
        Student Database System
      </h1>
      <AddStudentForm />
      <SearchStudent />
      <StudentList />
    </div>
  );
}

export default App;