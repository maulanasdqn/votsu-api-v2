import express, { Request, Response } from "express";
import { auth as AuthRoute } from "../routes/auth.route";
import cors from "cors";
import { api as ApiRoute } from "../routes/api.route";
import * as bodyParser from "body-parser";
import { PORT, DEFAULT_MESSAGE } from "./constant";

export class Server {
  public app: express.Application;

  public constructor() {
    this.app = express();
  }

  public start() {
    this.setConfig();
    this.setRoutes();
    this.app.listen(PORT, () => {
      console.log(`${DEFAULT_MESSAGE}`);
    });
  }

  private setConfig() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors());
  }

  private setRoutes() {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("hallo");
    });

    this.app.use("/auth", AuthRoute);

    this.app.use("/api", ApiRoute);
  }
}
