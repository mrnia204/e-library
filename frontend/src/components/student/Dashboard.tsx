import { Card, CardContent, CardHeader, CardTitle} from '../ui/card';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

import { studentData, data, events } from "@/data/student";
import { Button } from '../ui/button';




const Dashboard = () => {
  const quickActions = [
    { title: "Access eLibrary", content: "Browse digital resources", icon: "ri-book-open text-teal-600", bgClass: "bg-teal-50 hover:bg-teal-100", link: "#calendar"},
    { title: "View Shedule", content: "Check your Timetable", icon: "ri-calendar-check-open text-blue-600", bgClass: "bg-blue-50 hover:bg-blue-100", link: "#calendar"},
    { title: "Check Announcements", content: "Stay up to date", icon: "ri-file-text-line text-purple-600", bgClass: "bg-purple-50 hover:bg-purple-100",link: "#calendar"},
  ];

  return (
    <div className="wrapper py-8">
      <div className="space-y-6">
        {/** Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {studentData.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`${item.iconbgcolor} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <i className={`${item.icon} text-lg`}></i>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{item.title}</p>
                  <p className="text-xl font-bold text-gray-900">{item.content}</p>
                </div>
              </div>
            </div>
          ))}

        </div>

        {/** layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/** Chart*/}
          <Card className="bg-white rounded-lg shadow p-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity Breakdown</CardTitle>
            </CardHeader>
            <CardContent className='p-2'>
              <ResponsiveContainer width={400} height={400}>
                <PieChart>
                  <Pie
                    data={data}
                    cx={200}
                    labelLine={false}
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value}) => `${name}: ${value}%`}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke='#fff'/>
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className='bg-white rounded-lg shadow'>
            <CardHeader>
              <CardTitle className='text-lg font-semibold text-gray-900'>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3 max-h-80 overflow-y-auto'>
              {events.map((event, index) => (
                <div key={index} className="flex items-center p-3 border-b-gray-50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full mr-3 ${event.color}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{event.title}</p>
                    <p className="text-xs text-gray-600">{event.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>  
        </div>

         {/** Quick action */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {quickActions.map((item, index) => (
                <button key={index} className={`${item.bgClass} px-4 py-2 flex items-center p-4 rounded-lg transition-colors cursor-pointer`}>
                  <a href={item.link}>
                    <i className={`${item.icon} text-2xl mr-3`}></i>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.content}</p>
                    </div>
                  </a>
                </button>
              ))}
            </div>
          </div>
      </div>
    </div>
  );
}
 
export default Dashboard;