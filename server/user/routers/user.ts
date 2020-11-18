import express, { Request, Response, NextFunction } from "express";
import UserModel from "../models/user.model";
import TokenModel from "../../token/models/token.model";

import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/token",

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;

      const user = await UserModel.findOne({
        username,
        password,
      });

      if (user) {
        const token = jwt.sign({ userId: user?._id }, "RANDOM_TOKEN_SECRET", {
          expiresIn: "24h",
        });

        const newToken = new TokenModel({
          userId: user?._id,
          token: token,
        });

        const response = await newToken.save();

        res.status(200).json(token);
      } else {
        res.sendStatus(404);
      }
    } catch (e) {
      next(e);
    }
  }
);

export default router;
