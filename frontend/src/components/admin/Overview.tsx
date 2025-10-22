import {LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, ResponsiveContainer, } from "recharts";
import { adminData } from "@/data/admin";

// Mock data for charts
const weeklyUsageData = [
  { week: "Week 1", users: 120 },
  { week: "Week 2", users: 200 },
  { week: "Week 3", users: 300 },
  { week: "Week 4", users: 280 },
  { week: "Week 5", users: 350 },
  { week: "Week 6", users: 420 },
];

const gradeData = [
  { name: "A", value: 30, color: "#14B8A6" },
  { name: "B", value: 40, color: "#F59E0B" },
  { name: "C", value: 30, color: "#EF4444" },
];


const Overview = () => {
  return ( 
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {adminData.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`${item.iconbgcolor} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <i className={`${item.icon} text-xl text-white`}></i>
               </div>
               <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{item.title}</p>
                <p className="text-2xl font-bold text-gray-900">{item.content}</p>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/** Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weekly Usage Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Weekly Usage Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyUsageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#14B8A6"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Grade Distribution Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Grade Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={gradeData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {gradeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>      
    </>
  );
}
 
export default Overview;