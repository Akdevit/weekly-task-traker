import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // For hamburger and close icons

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const DaySelector = ({ selectedDay, setSelectedDay ,todos}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const today = new Date(); // Get the current date
    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const currentDay = daysOfWeek[today.getDay()];
    return (
        <div className="lg:w-[20%] w-0 relative">
            {/* Hamburger Icon */}
            <button
                onClick={toggleMenu}
                className="md:hidden p-2 bg-[#D7B26D] text-black rounded-lg fixed top-4 right-4 z-50"
            >
                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            {/* Sidebar Menu */}
            <div
                className={`fixed top-0 left-0 h-full w-[70%] bg-[#D7B26D] transform transition-transform duration-300 ease-in-out z-40 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    } md:relative md:translate-x-0 lg:w-[100%] md:w-[20%]`}
            >
                <div className="flex flex-col gap-4 p-4">
                    {days.map((day) => (
                        <button
                            key={day}
                            onClick={() => {
                                setSelectedDay(day);
                                setIsMenuOpen(false); // Close menu on selection
                            }}
                            className={`px-4 py-2 rounded-lg ${selectedDay === day
                                ? "bg-black text-white"
                                : "hover:bg-gray-200 text-black"
                                }
                              ${currentDay === day ?
                                    "bg-gray-200 text-black" :
                                    ""}
                               `}
                        >
                            {day} ({todos[day]?.length || 0})
                        </button>
                    ))}
                </div>
            </div>

            {/* Overlay for Mobile (Close on Click) */}
            {isMenuOpen && (
                <div
                    onClick={toggleMenu}
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                ></div>
            )}
        </div>
    );
};

export default DaySelector;
