import { Request, Response } from "express";
import TaskService from "@/api/services/task.service";

class TaskController {

    /**
      * GET /tasks
      * 
      * @param {*} req A request 
      * @param {*} res A response to send
      * @returns [{id, name, isCompleted}]
    */
    getTasks(req: Request, res: Response) {
        const { page, size } = req.query;

        TaskService.getTasks(Number(page), Number(size))
            .then(tasks => {
                res.status(200).json(tasks);
            })
            .catch(error => {
                res.status(500).json({ error: error.message });
            })

    }

    /**
      * POST /tasks
      * 
      * @param {*} req A request 
      * @param {*} res A response to send
      * @returns {id, name, isCompleted}
    */
    addTask(req: Request, res: Response) {
        const task = req.body;

        TaskService.addTask(task)
            .then(_task => {
                res.status(200).json(_task);
            })
            .catch(error => {
                res.status(500).json({ error: error.message });
            })

    }

    /**
      * PUT /tasks/:id
      * 
      * @param {*} req A request 
      * @param {*} res A response to send
      * @returns {id, name, isCompleted}
    */
    updateTask(req: Request, res: Response) {
        const task = req.body;
        const taskId = req.params.id;

        TaskService.updateTask(taskId, task)
            .then(_task => {
                res.status(200).json(_task);
            })
            .catch(error => {
                res.status(500).json({ error: error.message });
            })

    }

    /**
      * DELETE /tasks/:id
      * 
      * @param {*} req A request 
      * @param {*} res A response to send
      * @returns {id, name, isCompleted}
    */
    deleteTask(req: Request, res: Response) {
        const taskId = req.params.id;

        TaskService.deleteTask(taskId)
            .then(_task => {
                res.status(200).json(_task);
            })
            .catch(error => {
                res.status(500).json({ error: error.message });
            })

    }

}

export default new TaskController;
