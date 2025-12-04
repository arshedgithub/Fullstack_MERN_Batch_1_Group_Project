import type { Request, Response } from "express";
import { UserService } from '../services/user.service';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = UserService.getInstance();
  }

  register = async (req: Request, res: Response) => {

      if (!user) {
        return res.status(400).json({
          message: "User not created",
        });
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes("duplicate key error")){
        
        return res.status(400).json({
          message: `Duplicate data: ${(error as any)?.errorResponse?.keyValue?.email || (error as any)?.errorResponse?.keyValue?.username}`,
          error:
            error instanceof Error ? error.message : "Unable to create user",
        });
      }
      return res.status(500).json({
        message: "Internal server error",
        error:
          error instanceof Error ? error.message : "Unable to create user",
      });
    }
  };

  getUserProfile = async (req: Request, res: Response) => {
    try {
      //   const userId = (req as unknown as Request)?.user._id;
      const userId = req.params.id;
      const user = await this.userService.getUserById(String(userId));

      if (userId) {
        return { res, status: 404, message: 'User not found' };
      }

      return { user, status: 200, message: 'User profile fetched successfully' };
    } catch (error) {
      return { res, status: 500, message: 'Internal server error: ' + error };
    }
  };

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.getAllUsers();
      return { users, status: 200, message: 'Users fetched successfully' };
    } catch (error) {
      return { res, status: 500, message: 'Internal server error: ' + error };
    }
  };
}
