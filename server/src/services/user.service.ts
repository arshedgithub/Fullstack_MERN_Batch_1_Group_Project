import { promiseHooks } from "v8";
import { UserDao } from "../dao/user.dao";
import { AuthDao } from "../dao/auth.dao";
import type { IUser } from "../models/user.model";

export class UserService {
    private static instance: UserService;
    private userDao: UserDao;
    private authDao: AuthDao;

    private constructor() {
        this.userDao = UserDao.getInstance();
        this.authDao = AuthDao.getInstance();
    }

    public static getInstance(): UserService {
        if (!this.instance) {
            this.instance = new UserService();
        }
        return this.instance;
    }

    public async getAllUsers(): Promise<IUser[]> {
        try {
            return await this.userDao.getAllActiveUsers();
        } catch (error) {
            throw error;
        }
    }

    public async createUser(
        username: string,
        email: string,
        password: string,
    ): Promise<IUser | null> {
        try {
            const userData = {
                username,
                email,
                password
            };

            return await this.authDao.createUser(userData);
        } catch (error) {
            throw error;
        }
    }

    public async userValidate(email: string, password: string) {
        try {
            return await this.authDao.findUserByEmailAndPassword(email, password);
        } catch (e) {
            console.log("Error in user validating: ", e);
            throw e;
        }
    }

    public async getUserById(id: string): Promise<IUser | null> {
        try {
            return await this.userDao.findUserById(id);
        } catch (error) {
            throw error;
        }
    }
}
