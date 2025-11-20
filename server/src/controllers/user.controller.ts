import type { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = UserService.getInstance();
  }

  register = async (req: Request, res: Response) => {

    try {
      const { username, email, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({
          message: "Username and password are required",
        });
      }

      const user = await this.userService.createUser(username, email, password);

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
      const userId = req.params.id;
      const user = await this.userService.getUserById(String(userId));

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      return res.status(200).json({
        message: "User profile fetched successfully",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        error:
          error instanceof Error ? error.message : "Unable to fetch user profile",
      });
    }
  };

  getAllUsers = async (_req: Request, res: Response) => {
    try {
      const users = await this.userService.getAllUsers();

      return res.status(200).json({
        message: "Users fetched successfully",
        data: users,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        error:
          error instanceof Error ? error.message : "Unable to fetch users",
      });
    }
  };
}
