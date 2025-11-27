import { useState } from 'react';
import { FaEdit, FaTrash, FaCalendarAlt, FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const priorityColors = {
  Low: 'from-green-400 to-emerald-500',
  Medium: 'from-yellow-400 to-orange-500',
  High: 'from-red-400 to-pink-500',
};

const TaskItem = ({ task, onUpdate, onDelete, onEdit }) => {
  const [loading, setLoading] = useState(false);

  const handleToggleComplete = async () => {
    setLoading(true);
    await onUpdate(task._id, { completed: !task.completed });
    setLoading(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setLoading(true);
      await onDelete(task._id);
      setLoading(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.02 }}
      className="group relative"
    >
      <div className={`glass p-6 rounded-2xl mb-4 transition-all duration-300 hover:shadow-2xl border-2 ${task.completed ? 'border-green-400/30 bg-green-50/10' : 'border-white/20'
        }`}>
        <div className="flex items-start gap-4">
          {/* Custom Checkbox */}
          <button
            onClick={handleToggleComplete}
            disabled={loading}
            className={`flex-shrink-0 w-7 h-7 rounded-lg border-2 transition-all duration-300 flex items-center justify-center ${task.completed
                ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-green-400 shadow-lg shadow-green-500/50'
                : 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-50/20'
              } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-110'}`}
          >
            {task.completed && <FaCheck className="text-white text-sm" />}
          </button>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex-1">
                <h3 className={`task-title text-lg font-semibold mb-1 transition-all ${task.completed ? 'line-through opacity-50' : ''
                  }`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className="task-description text-sm line-clamp-2">{task.description}</p>
                )}
              </div>

              {/* Priority Badge */}
              <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${priorityColors[task.priority] || priorityColors.Medium
                } shadow-lg flex-shrink-0`}>
                {task.priority || 'Medium'}
              </span>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-3">
              {task.dueDate && (
                <div className="flex items-center gap-1.5 text-xs text-secondary bg-white/50 px-3 py-1.5 rounded-full">
                  <FaCalendarAlt />
                  <span className="font-medium">{format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 ml-auto">
                <button
                  onClick={() => onEdit(task)}
                  disabled={loading}
                  className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500 hover:text-white transition-all duration-200 hover:scale-110 disabled:opacity-50"
                  title="Edit task"
                >
                  <FaEdit className="text-sm" />
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="p-2.5 rounded-xl bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white transition-all duration-200 hover:scale-110 disabled:opacity-50"
                  title="Delete task"
                >
                  <FaTrash className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;
