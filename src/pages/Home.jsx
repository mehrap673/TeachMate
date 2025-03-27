import React, { useState, useEffect } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import {
    Bell, 
    Calendar as CalendarIcon, 
    LayoutDashboard,
    MessageCircle,
    CheckSquare,
    Calendar,
    LogOut
} from 'lucide-react';

const Home = () => {
    const navigate = useNavigate()
    const [currentDate, setCurrentDate] = useState(new Date());
    const [calendar, setCalendar] = useState([]);

    const navigationItems = [
        {
            label: 'Dashboard',
            icon: LayoutDashboard,
            to: '/dashboard',
        },
        {
            label: 'AI Chat',
            icon: MessageCircle,
            to: '/ai-chat',
        },
        {
            label: 'Auto Grade',
            icon: Calendar,
            to: '/grading',
        },
        {
            label: 'Tasks',
            icon: CheckSquare,
            to: '/tasks',
        }
    ];

    const notifications = [
        {
            id: 1,
            title: "Meeting Reminder",
            description: "Faculty meeting at 3 PM",
            time: "2h ago"
        },
        {
            id: 2,
            title: "Assignment Submission",
            description: "Deadline for AI Project",
            time: "1d ago"
        },
        {
            id: 3,
            title: "New Message",
            description: "Unread message from Admin",
            time: "3h ago"
        },
        {
            id: 4,
            title: "Performance Review",
            description: "Scheduled for next week",
            time: "5h ago"
        },
        {
            id: 5,
            title: "System Update",
            description: "New features available",
            time: "1w ago"
        },
        {
            id: 6,
            title: "Upcoming Event",
            description: "Department workshop",
            time: "2d ago"
        }
    ];

    useEffect(() => {
        const generateCalendar = () => {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);

            const calendarDays = [];

            // Add previous month's days
            for (let i = 0; i < firstDay.getDay(); i++) {
                calendarDays.push(null);
            }

            // Add current month's days
            for (let i = 1; i <= lastDay.getDate(); i++) {
                calendarDays.push(new Date(year, month, i));
            }

            setCalendar(calendarDays);
        };

        generateCalendar();
    }, [currentDate]);

    const monthYearDisplay = currentDate.toLocaleString('default', {
        month: 'long',
        year: 'numeric'
    });

    const changeMonth = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + direction);
        setCurrentDate(newDate);
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated')
        navigate('/login')
    }

    return (
        <div className="flex gap-5 h-screen  m-10 w-full">
            {/* Left Sidebar */}
            <div className="w-1/5 min-w-xs h-full bg-white shadow-xl border border-gray-100 rounded-3xl flex flex-col overflow-hidden">
                {/* Top Header */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-4">
                        <img
                            className="h-12 w-12 rounded-full ring-2 ring-blue-500"
                            src="/Teachmate-logo.png"
                            alt="TeachMate Logo"
                        />
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">TeachMate</h2>
                            <p className="text-xs text-gray-500">Educational Management System</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <nav className="flex-grow px-4 py-6 space-y-2">
                    {navigationItems.map((item) => (
                        <NavLink
                            key={item.label}
                            to={item.to}
                            className={({ isActive }) => `
                                w-full flex items-center space-x-3 px-4 py-3 rounded-lg 
                                transition-all duration-300 ease-in-out
                                ${isActive
                                    ? 'bg-blue-500 text-white shadow-md'
                                    : 'text-gray-600 bg-gray-50 hover:bg-blue-50 hover:text-blue-600'}
                            `}
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon
                                        className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-500'}`}
                                    />
                                    <span className="font-medium">{item.label}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* User Profile */}
                <div className="px-6 py-6 border-t text-center items-center justify-center border-gray-200 bg-gray-50">
                    <div className="flex flex-col gap-4 items-center ">
                        <img
                            className="h-40 w-40 p-2 rounded-full object-cover ring-2 ring-blue-300"
                            src="/profile-icon-9.png"
                            alt="Teacher Profile"
                        />
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">Rakesh Jain</h3>
                            <p className="text-sm text-gray-500">CSEfac101</p>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="
                            mt-4 w-full flex items-center justify-center 
                            space-x-2 bg-red-50 text-red-600 
                            py-2 rounded-lg hover:bg-red-100
                            transition-colors duration-300 border border-red-100
                        "
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Middle Content */}
            <div className='w-3/5 h-full flex'>
                <div className="w-full h-full overflow-auto">
                    <Outlet />
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-1/5 min-w-xs h-full bg-white shadow-lg rounded-3xl border border-gray-100 flex flex-col overflow-hidden">
                {/* Calendar Section */}
                <div className="p-7 border-b border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center">
                            <CalendarIcon className="mr-2 text-blue-500 w-5 h-5" />
                            Calendar
                        </h2>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => changeMonth(-1)}
                                className="text-gray-500 hover:bg-gray-100 p-1 rounded"
                            >
                                ←
                            </button>
                            <button
                                onClick={() => changeMonth(1)}
                                className="text-gray-500 hover:bg-gray-100 p-1 rounded"
                            >
                                →
                            </button>
                        </div>
                    </div>

                    <div className="text-center text-sm font-semibold text-gray-600 mb-2">
                        {monthYearDisplay}
                    </div>

                    <table className="w-full text-center">
                        <thead>
                            <tr className="text-xs text-gray-500">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                    <th key={day} className="p-1">{day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: Math.ceil(calendar.length / 7) }).map((_, weekIndex) => (
                                <tr key={weekIndex} className="text-sm">
                                    {calendar.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => (
                                        <td
                                            key={dayIndex}
                                            className={`p-1 ${day && day.getMonth() === currentDate.getMonth()
                                                ? 'text-gray-800 hover:bg-blue-100'
                                                : 'text-gray-300'
                                                } ${day && day.toDateString() === new Date().toDateString()
                                                    ? 'bg-blue-500 text-white rounded-full'
                                                    : ''
                                                }`}
                                        >
                                            {day ? day.getDate() : ''}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Notifications Section */}
                <div className="flex-grow overflow-auto p-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center sticky top-0 bg-white z-10">
                        <Bell className="mr-2 text-blue-500 w-5 h-5" />
                        Notifications
                    </h3>
                    <div className="space-y-4">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className="bg-gray-50 p-4 rounded-lg hover:bg-blue-50 transition-colors"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-sm">{notification.title}</h4>
                                        <p className="text-xs text-gray-600">{notification.description}</p>
                                    </div>
                                    <span className="text-xs text-gray-500">{notification.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
