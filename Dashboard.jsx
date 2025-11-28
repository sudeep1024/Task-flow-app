import { useState, useEffect, useContext } from 'react';
import { FaPlus, FaSearch, FaFilter, FaCheckCircle, FaClock, FaExclamationCircle } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import AuthContext from '../context/AuthContext';
import api from '../services/api';
import Navbar from '../components/Navbar';
import TaskList from '../components/TaskList';
import AddTaskModal from '../components/AddTaskModal';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, highPriority: 0 });

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        let result = tasks;

        if (filter !== 'All') {
            if (filter === 'Completed') result = result.filter(t => t.completed);
            if (filter === 'Pending') result = result.filter(t => !t.completed);
            if (filter === 'High Priority') result = result.filter(t => t.priority === 'High');
        }

        if (search) {
            result = result.filter(t =>
                t.title.toLowerCase().includes(search.toLowerCase()) ||
                (t.description && t.description.toLowerCase().includes(search.toLowerCase()))
            );
        }

        setFilteredTasks(result);
    }, [tasks, filter, search]);

    useEffect(() => {
        setStats({
            total: tasks.length,
            completed: tasks.filter(t => t.completed).length,
            pending: tasks.filter(t => !t.completed).length,
            highPriority: tasks.filter(t => t.priority === 'High' && !t.completed).length,
        });
    }, [tasks]);

    const fetchTasks = async () => {
        try {
            const res = await api.get('/tasks');
            setTasks(res.data);
        } catch (err) {
            console.error('Error fetching tasks:', err);
        }
    };

    const handleAddTask = async (taskData) => {
        try {
            if (taskToEdit) {
                const res = await api.put(`/tasks/${taskToEdit._id}`, taskData);
                setTasks(tasks.map((t) => (t._id === taskToEdit._id ? res.data : t)));
            } else {
                const res = await api.post('/tasks', taskData);
                setTasks([res.data, ...tasks]);
            }
            setTaskToEdit(null);
        } catch (err) {
            console.error('Error saving task:', err);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
            setTasks(tasks.filter((t) => t._id !== id));
        } catch (err) {
            console.error('Error deleting task:', err);
        }
    };

    const handleUpdateTask = async (id, updates) => {
        try {
            const res = await api.put(`/tasks/${id}`, updates);
            setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
        } catch (err) {
            console.error('Error updating task:', err);
        }
    };

    const openEditModal = (task) => {
        setTaskToEdit(task);
        setIsModalOpen(true);
    };

    const openAddModal = () => {
        setTaskToEdit(null);
        setIsModalOpen(true);
    };

    const filterButtons = [
        { name: 'All', icon: FaFilter },
        { name: 'Pending', icon: FaClock },
        { name: 'Completed', icon: FaCheckCircle },
        { name: 'High Priority', icon: FaExclamationCircle },
    ];

    return (
        <div className="min-h-screen pb-12">
            <Navbar />

            <div className="container mx-auto px-6 py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-5xl font-bold mb-2 gradient-text">My Tasks</h1>
                    <p className="text-secondary">Organize your work and life, finally.</p>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Total Tasks', value: stats.total, color: 'from-blue-500 to-cyan-500', icon: '📊' },
                        { label: 'Completed', value: stats.completed, color: 'from-green-500 to-emerald-500', icon: '✅' },
                        { label: 'Pending', value: stats.pending, color: 'from-orange-500 to-amber-500', icon: '⏳' },
                        { label: 'High Priority', value: stats.highPriority, color: 'from-red-500 to-pink-500', icon: '🔥' },
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-6 rounded-2xl card-hover"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="stat-label text-sm mb-1">{stat.label}</p>
                                    <p className="stat-value text-3xl font-bold">{stat.value}</p>
                                </div>
                                <div className={`text-4xl bg-gradient-to-br ${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg`}>
                                    {stat.icon}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Search and Actions */}
                <div className="glass p-6 rounded-2xl mb-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative w-full md:w-96">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-tertiary" />
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                className="input-field pl-12 w-full"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {/* Add Task Button */}
                        <button
                            onClick={openAddModal}
                            className="btn-primary flex items-center gap-2 whitespace-nowrap px-6 py-3 text-base"
                        >
                            <FaPlus />
                            <span>New Task</span>
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-3 mt-4">
                        {filterButtons.map(({ name, icon: Icon }) => (
                            <button
                                key={name}
                                onClick={() => setFilter(name)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${filter === name
                                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-105'
                                        : 'bg-white/60 text-primary hover:bg-white hover:scale-105'
                                    }`}
                            >
                                <Icon />
                                {name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tasks List */}
                <TaskList
                    tasks={filteredTasks}
                    onUpdate={handleUpdateTask}
                    onDelete={handleDeleteTask}
                    onEdit={openEditModal}
                />
            </div>

            <AddTaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleAddTask}
                taskToEdit={taskToEdit}
            />
        </div>
    );
};

export default Dashboard;
