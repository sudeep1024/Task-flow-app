import { useState, useContext } from 'react';
import { FaMoon, FaSun, FaUser, FaSignOutAlt, FaSave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AuthContext from '../context/AuthContext';
import ThemeContext from '../context/ThemeContext';

const Settings = () => {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [saved, setSaved] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSaveSettings = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="container mx-auto px-6 py-8">
                <h1 className="text-4xl font-bold mb-8 gradient-text">Settings</h1>

                <div className="grid gap-6 max-w-2xl">
                    {/* Appearance Settings */}
                    <div className="glass p-6 rounded-2xl card-hover">
                        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                            {theme === 'dark' ? <FaMoon /> : <FaSun />}
                            Appearance
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-700">Theme</p>
                                    <p className="text-sm text-gray-500">Choose your preferred theme</p>
                                </div>
                                <button
                                    onClick={toggleTheme}
                                    className="relative inline-flex h-12 w-24 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    style={{
                                        backgroundColor: theme === 'dark' ? '#4f46e5' : '#e5e7eb'
                                    }}
                                >
                                    <span
                                        className={`inline-block h-10 w-10 transform rounded-full bg-white shadow-lg transition-transform flex items-center justify-center ${theme === 'dark' ? 'translate-x-12' : 'translate-x-1'
                                            }`}
                                    >
                                        {theme === 'dark' ? <FaMoon className="text-indigo-600" /> : <FaSun className="text-yellow-500" />}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Account Settings */}
                    <div className="glass p-6 rounded-2xl card-hover">
                        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                            <FaUser />
                            Account
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    className="input-field"
                                    placeholder="user@example.com"
                                    disabled
                                />
                                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="Your Name"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <button
                            onClick={handleSaveSettings}
                            className="btn-primary flex items-center gap-2"
                        >
                            <FaSave />
                            {saved ? 'Saved!' : 'Save Changes'}
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition flex items-center gap-2 font-semibold"
                        >
                            <FaSignOutAlt />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
