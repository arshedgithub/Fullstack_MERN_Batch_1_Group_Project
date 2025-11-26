import User, { type IUser } from '../models/user.model';

export class UserDao {
    public static instance: UserDao;

    static getInstance = (): UserDao => {
        if (!this.instance) {
            this.instance = new UserDao();
        }
        return this.instance;
    };

    public async createUser(userData: Partial<IUser>) {
        try {
            const user = new User(userData);
            return await user.save();
        } catch (error) {
            console.log("Error", error);
            throw error;
        }
    }

    public async findUserByEmailAndPassword(email: string, password: string) {
        try {
            return await User.findOne({ email, password });
        } catch (error) {
            console.log("Error", error);
            throw error;
        }
    }
} 
