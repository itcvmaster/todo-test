import { apiGet, apiPost, apiPut, apiDelete } from './baseApi';

/**
 * Get all tasks
 * TODO:
 * - Implement validation logic
 * 
 * @return All tasks being returned.
 */
export const getTasks = async () => {
    try {
        const tasks = await apiGet({
            url: '/tasks',
        });

        return tasks;
    } catch (error) {
        // Handle any network or server errors
        console.log('[Error] getTasks failed.', error);
        throw error;
    }
}

/**
 * Add a new task
 * 
 * @param {string} task A new task to be added.
 * @return The added task
 */
export const addTask = async (task) => {
    try {
        const newTask = await apiPost({
            url: '/tasks',
            bodyParam: task,
        });

        return newTask;
    } catch (error) {
        // Handle any network or server errors
        console.log('[Error] addTask failed.', error);
        throw error;
    }
}

/**
 * Update a task
 * 
 * @param {number} id An id of the task to be updated,
 * @param {string} task A new task to be updated.
 * @return The updated task
 */
export const updateTask = async (task) => {
    try {
        const updatedTask = await apiPut({
            url: `/tasks/${task._id}`,
            bodyParam: task,
        });

        return updatedTask;
    } catch (error) {
        // Handle any network or server errors
        console.log('[Error] updateTask failed. ', error);
        throw error;
    }
}

/**
 * Delete a task
 * 
 * @param {number} id An id of the task to be deleted,
 * @return The deleted task
 */
export const deleteTask = async (id) => {
    try {
        const deletedTask = await apiDelete({
            url: `/tasks/${id}`,
        });

        return deletedTask;
    } catch (error) {
        // Handle any network or server errors
        console.log('[Error] deleteTask failed. ', error);
        throw error;
    }
}