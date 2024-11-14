import { ErrorCode } from '@/constants/errors';
import TaskCollection, { ITaskModel } from '@/models/task.model';

class TaskService {

    // This will be used if database is not connected.
    private _tasks: ITaskModel[] = [];

    /**
     * Returns fetched tasks coming from mongodb.
     * TODO: Implement pagination.
     * 
     * @param {*} page A page number
     * @param {*} size A size to be fetched. default is 0
     * @returns Fetched tasks
     */
    async getTasks(page: number = 0, size: number = 0): Promise<ITaskModel[]> {
        try {
            // if DB is not connected.
            if (!process.env.USING_DB) return this._tasks;

            const tasks = await TaskCollection.find();
            console.log("Fetched Tasks:", tasks);

            return tasks;

        } catch (error) {
            throw Error(ErrorCode.DB_FETCHING_FAILED.code);
        }
    }

    /**
     * Add a new task.
     * 
     * @param {*} payload A task object.
     * @returns The added task
     */
    async addTask(payload: ITaskModel): Promise<ITaskModel> {
        try {
            // if DB is not connected.
            if (!process.env.USING_DB) {
                this._tasks.push(payload);
                return payload;
            };

            const _newTask = new TaskCollection({
                ...payload
            });

            await _newTask.save();
            console.log("Added Task:", _newTask);

            return _newTask as ITaskModel;

        } catch (error) {
            console.log("addTask failed:", payload, error);
            throw Error(ErrorCode.DB_ADD_FAILED.code);
        }
    }

    /**
     * Returns fetched tasks coming from mongodb.
     * TODO: Implement pagination.
     * 
     * @param {*} id An id of the task to be updated
     * @param {*} payload A task data
     * @returns Fetched tasks
     */
    async updateTask(id: string, payload: ITaskModel): Promise<ITaskModel> {
        try {
            // if DB is not connected.
            if (!process.env.USING_DB) {
                this._tasks = this._tasks.map((task) => task.id === id ? { ...task, ...payload } : task);
                const founds = this._tasks.find((task) => task.id === id);

                return founds[0];
            }
            console.log(id, payload);
            const updatedTask = await TaskCollection.findByIdAndUpdate(
                id,
                { name: payload.name, isCompleted: payload.isCompleted },
                { new: true }
            );
            console.log('Updated Task:', updatedTask);

            return updatedTask;

        } catch (error) {
            console.log("update failed:", error);
            throw Error(ErrorCode.DB_UPDATE_FAILED.code);
        }
    }

    /**
     * Find and delete a task.
     * 
     * @param {*} id An id of task to be deleted
     * @returns The deleted task
     */
    async deleteTask(id: string): Promise<ITaskModel> {
        try {
            // if DB is not connected.
            if (!process.env.USING_DB) {
                const founds = this._tasks.find((task) => task.id === id);
                this._tasks = this._tasks.filter((task) => task.id !== id);

                return founds[0];
            }

            const deletedTask = await TaskCollection.findByIdAndDelete(id);
            if (deletedTask) {
                console.log('Deleted Task:', deletedTask);
                return deletedTask;
            } else {
                throw Error(ErrorCode.TASK_NOT_FOUND.code);
            }

        } catch (error) {
            console.log("deleteTask failed:", id);
            throw Error(ErrorCode.DB_DELETE_FAILED.code);
        }
    }
}

export default new TaskService();