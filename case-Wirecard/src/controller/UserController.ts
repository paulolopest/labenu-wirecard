import { Request, Response } from "express";
import { UserBussiness } from "../bussiness/UserBussiness";

const userBussiness = new UserBussiness();

export class UserController {
  insertUser = async (req: Request, res: Response) => {
    try {
      const { name, email, cpf, password } = req.body;
      const response = await userBussiness.insertUser(name, email, cpf, password);

      res.status(201).send("User successfully created");

    } catch (error: any) {
      res.status(400).send(error.sqlMessage || error.message);
    }
  }

  login = async (req: Request, res: Response) => {
      try {
        const {email, password} =  req.body
        const response = await userBussiness.login(email, password)

        res.send(`Token de permissão: ${response}`)

      } catch (error: any) {
      res.status(400).send(error.sqlMessage || error.message);
    }
  }
}
