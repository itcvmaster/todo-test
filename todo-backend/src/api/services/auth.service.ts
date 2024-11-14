import { IUserModel } from '@/models/user.model';

class AuthService {

    private _user: IUserModel = {
        id: "",
        name: "",
        email: "",
        password: "",
    };
    
    /**
     * Sign in.
     * 
     * @param {*} user A task object.
     * @returns The signed user.
     */
    async signIn(user: IUserModel): Promise<IUserModel> {
        try {
            // TODO: Implement Sign in
            return this._user;
        } catch (error) {
            throw Error('Internal Server Error');
        }
    }

    /**
     * Returns fetched tasks coming from mongodb.
     * 
     * @returns The new user
     */
    async signUp(newUser: IUserModel): Promise<IUserModel> {
        try {
            // TODO: Implement Sign up
            return this._user;
        } catch (error) {
            throw Error('Internal Server Error');
        }
    }
}

export default new AuthService();