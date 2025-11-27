import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTasks, FaSignOutAlt, FaUserCircle, FaCog } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="glass sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition">
                    <FaTasks />
                    <span>TaskFlow</span>
                </Link>
                <div>
                    {user ? (
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-2 text-gray-600">
                                <FaUserCircle className="text-xl" />
                                <span className="font-medium">Welcome</span>
                            </div>
                            <Link
                                to="/settings"
                                className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition font-medium"
                                title="Settings"
                            >
                                <FaCog className="text-xl" />
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 text-red-500 hover:text-red-700 transition font-medium"
                            >
                                <FaSignOutAlt />
                                <span>Logout</span>
                            </button>
                        </div>
                    ) : (
                        <div className="space-x-4">
                            <Link to="/login" className="text-gray-600 hover:text-indigo-600 font-medium transition">Login</Link>
                            <Link to="/signup" className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition shadow-md hover:shadow-lg">Signup</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
