import { Request, Response } from "express";
import AuthService from "@/api/services/auth.service";

class AuthController {

    /**
      * GET /signin
      * 
      * @param {*} req A request 
      * @param {*} res A response to send
      * @returns {id, name, email}
    */
    signIn(req: Request, res: Response) {
        const user = req.body;

        AuthService.signIn(user)
            .then(_user => {
                res.status(200).json(_user);
            })
            .catch(error => {
                res.status(500).json({ error: error.message });
            })

    }

    /**
      * POST /signup
      * 
      * @param {*} req A request 
      * @param {*} res A response to send
      * @returns {id, name, email}
    */
    signUp(req: Request, res: Response) {
        const user = req.body;

        AuthService.signUp(user)
            .then(_user => {
                res.status(200).json(_user);
            })
            .catch(error => {
                res.status(500).json({ error: error.message });
            })

    }
}

export default new AuthController;
