"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import AddNewStudentForm from "../constant/AddNewStudentForm";

interface Student {
  id: string;
  name: string;
  class: string;
  hours: string;
  grade: "A" | "B" | "C";
}

const gradeColors: Record<string, string> = {
  A: "bg-green-100 text-green-800",
  B: "bg-yellow-100 text-yellow-800",
  C: "bg-red-100 text-red-800",
};

const initialStudents: Student[] = [
  { id: "ST001", name: "Alice Johnson", class: "10A", hours: "45h", grade: "A" },
  { id: "ST002", name: "Bob Smith", class: "10A", hours: "38h", grade: "B" },
  { id: "ST003", name: "Carol Davis", class: "10B", hours: "52h", grade: "A" },
  { id: "ST004", name: "David Wilson", class: "10B", hours: "29h", grade: "C" },
  { id: "ST005", name: "Emma Brown", class: "11A", hours: "41h", grade: "B" },
  { id: "ST006", name: "Frank Miller", class: "11A", hours: "35h", grade: "B" },
  { id: "ST007", name: "Grace Lee", class: "11B", hours: "48h", grade: "A" },
  { id: "ST008", name: "Henry Taylor", class: "11B", hours: "33h", grade: "C" },
  { id: "ST009", name: "Ivy Chen", class: "12A", hours: "44h", grade: "B" },
  { id: "ST010", name: "Jack Anderson", class: "12A", hours: "39h", grade: "B" },
];

const StudentManagement = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [open, setOpen] = useState(false);

  const handleAdd = () => {
    setOpen(true);
  };

  const handleEdit = (id: string) => {
    alert(`Edit student with ID: ${id}`);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Student Management</h2>
          
        </div>
        <div className="">
          <Button
            className="bg-teal-600 text-white hover:bg-teal-700"
            onClick={handleAdd}
          >
            <i className="ri-add-line mr-2"></i> Add Student
          </Button>
          <AddNewStudentForm open={open} onClose={() => setOpen(false)}/>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Student", "ID", "Class", "Hours", "Grade", "Actions"].map((head) => (
                  <th
                    key={head}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id}>
                  {/* Student Info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <i className="ri-user-fill text-gray-600"></i>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {student.name}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* ID, Class, Hours */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.class}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.hours}</td>

                  {/* Grade */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${gradeColors[student.grade]}`}
                    >
                      {student.grade}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(student.id)}
                      className="text-teal-600 hover:text-teal-900 mr-3"
                    >
                      <i className="ri-edit-line"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;
