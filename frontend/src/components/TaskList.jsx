import { AnimatePresence } from 'framer-motion';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onUpdate, onDelete, onEdit }) => {
    if (tasks.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No tasks found. Create one to get started!</p>
            </div>
        );
    }

    return (
        <div className="mt-4">
            <AnimatePresence mode="popLayout">
                {tasks.map((task) => (
                    <TaskItem
                        key={task._id}
                        task={task}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default TaskList;
