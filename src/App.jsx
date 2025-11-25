import React, { useState } from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import StudentDetails from './components/StudentDetails';
import { getAllStudents, createStudent, updateStudent, deleteStudent } from './services/studentService';
import './App.css';

function App() {
    const [students, setStudents] = useState([]);
    const [view, setView] = useState('list'); // list, form, details
    const [currentStudent, setCurrentStudent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadStudents = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllStudents();
            setStudents(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddStudent = () => {
        setCurrentStudent(null);
        setView('form');
    };

    const handleEditStudent = (student) => {
        setCurrentStudent(student);
        setView('form');
    };

    const handleDeleteStudent = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await deleteStudent(id);
                loadStudents(); // Reload list
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const handleSaveStudent = async (studentData) => {
        try {
            if (currentStudent) {
                await updateStudent(currentStudent.id, studentData);
            } else {
                await createStudent(studentData);
            }
            setView('list');
            loadStudents();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCancel = () => {
        setView('list');
    };

    const handleViewDetails = (student) => {
        // This function is not explicitly triggered by a button in the list as per requirements (only Edit/Delete),
        // but usually a details view is accessed by clicking the name or a view button.
        // I'll add a way to view details if needed, but for now sticking to requirements:
        // "Student Details Page" is required. I will assume clicking the name opens it.
        // I'll modify StudentList to allow clicking name to view details.
        setCurrentStudent(student);
        setView('details');
    };

    // Modifying StudentList to pass onRowClick or similar if I want to support details view from list.
    // For now, I will add a "View" button to StudentList actions or make the name clickable.
    // Let's make the name clickable in StudentList. I'll need to update StudentList.jsx.
    // Wait, I already wrote StudentList.jsx. I should probably update it to include a "View" button or make name clickable.
    // The requirements say "Student Details Page Shows: Name, Section, Marks, Grade".
    // And "View Students Load Students button... List all students... Edit... Delete".
    // It doesn't explicitly say how to get to Details page, but it is a required page.
    // I will add a "View" button to the actions in StudentList.

    return (
        <div className="app-container">
            <header>
                <h1>Student Result Management System</h1>
            </header>
            <main>
                {error && <div className="error-message">{error}</div>}
                {loading && <div className="loading">Loading...</div>}

                {view === 'list' && (
                    <>
                        <button className="btn-add" onClick={handleAddStudent}>Add Student</button>
                        <StudentList
                            students={students}
                            onEdit={handleEditStudent}
                            onDelete={handleDeleteStudent}
                            onLoad={loadStudents}
                            onView={(student) => { setCurrentStudent(student); setView('details'); }}
                        />
                    </>
                )}

                {view === 'form' && (
                    <StudentForm
                        currentStudent={currentStudent}
                        onSave={handleSaveStudent}
                        onCancel={handleCancel}
                    />
                )}

                {view === 'details' && (
                    <StudentDetails
                        student={currentStudent}
                        onBack={() => setView('list')}
                    />
                )}
            </main>
        </div>
    );
}

export default App;
