import React, { useState } from 'react';

const Attendance = () => {
  // Sample student attendance data
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', present: true, date: '2024-03-27' },
    { id: 2, name: 'Jane Smith', present: false, date: '2024-03-27' },
    { id: 3, name: 'Mike Johnson', present: true, date: '2024-03-27' },
    { id: 4, name: 'Emily Brown', present: true, date: '2024-03-27' },
    { id: 5, name: 'David Wilson', present: false, date: '2024-03-27' }
  ]);

  // Toggle attendance for a student
  const toggleAttendance = (id) => {
    setStudents(students.map(student => 
      student.id === id 
        ? {...student, present: !student.present} 
        : student
    ));
  };

  // Calculate attendance statistics
  const totalStudents = students.length;
  const presentStudents = students.filter(student => student.present).length;
  const attendancePercentage = ((presentStudents / totalStudents) * 100).toFixed(2);

  return (
    <div className="w-full h-screen text-gray-700 bg-background-primary bg-gray-100 rounded-3xl p-8">
      <div className="bg-white shadow-md rounded-2xl h-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b">
          <h1 className="text-3xl font-bold text-gray-800">Attendance Management</h1>
          <div className="mt-2 text-gray-600">
            Total Students: {totalStudents} | 
            Present: {presentStudents} | 
            Attendance: {attendancePercentage}%
          </div>
        </div>

        {/* Student List */}
        <div className="flex-grow overflow-y-auto">
          {students.map((student) => (
            <div 
              key={student.id} 
              className={`flex items-center justify-between p-4 border-b ${
                student.present ? 'bg-green-50' : 'bg-red-50'
              }`}
            >
              <div>
                <span className="font-medium">{student.name}</span>
                <span className="ml-4 text-sm text-gray-500">{student.date}</span>
              </div>
              <button 
                onClick={() => toggleAttendance(student.id)}
                className={`px-4 py-2 rounded-lg ${
                  student.present 
                    ? 'bg-red-500 text-white' 
                    : 'bg-green-500 text-white'
                }`}
              >
                {student.present ? 'Mark Absent' : 'Mark Present'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Attendance;