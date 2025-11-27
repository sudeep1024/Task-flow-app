import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const AddTaskModal = ({ isOpen, onClose, onSave, taskToEdit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description || '');
            setPriority(taskToEdit.priority || 'Medium');
            setDueDate(taskToEdit.dueDate ? taskToEdit.dueDate.split('T')[0] : '');
        } else {
            setTitle('');
            setDescription('');
            setPriority('Medium');
            setDueDate('');
        }
    }, [taskToEdit, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ title, description, priority, dueDate });
        onClose();
    };

    const priorities = [
        { value: 'Low', color: 'from-green-400 to-emerald-500', emoji: '🟢' },
        { value: 'Medium', color: 'from-yellow-400 to-orange-500', emoji: '🟡' },
        { value: 'High', color: 'from-red-400 to-pink-500', emoji: '🔴' },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="glass bg-white/95 rounded-3xl shadow-2xl w-full max-w-lg p-8 relative z-10"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-3xl font-bold gradient-text">
                                {taskToEdit ? '✏️ Edit Task' : '✨ New Task'}
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                            >
                                <FaTimes className="text-secondary" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-bold text-secondary mb-2">
                                    Task Title *
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="input-field text-lg"
                                    placeholder="What needs to be done?"
                                    required
                                    autoFocus
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-bold text-secondary mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="input-field resize-none"
                                    rows="3"
                                    placeholder="Add more details..."
                                />
                            </div>

                            {/* Priority Selection */}
                            <div>
                                <label className="block text-sm font-bold text-secondary mb-3">
                                    Priority Level
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {priorities.map(({ value, color, emoji }) => (
                                        <button
                                            key={value}
                                            type="button"
                                            onClick={() => setPriority(value)}
                                            className={`p-4 rounded-xl font-semibold transition-all duration-200 ${priority === value
                                                    ? `bg-gradient-to-br ${color} text-white shadow-lg scale-105`
                                                    : 'bg-gray-100 text-primary hover:bg-gray-200'
                                                }`}
                                        >
                                            <div className="text-2xl mb-1">{emoji}</div>
                                            <div className="text-sm">{value}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Due Date */}
                            <div>
                                <label className="block text-sm font-bold text-secondary mb-2">
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className="input-field"
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-6 py-3 text-primary bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 btn-primary"
                                >
                                    {taskToEdit ? 'Save Changes' : 'Create Task'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AddTaskModal;
