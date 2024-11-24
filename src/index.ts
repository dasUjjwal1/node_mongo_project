import "dotenv/config";
import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import { connect } from "mongoose";
import companyRouter from "./routes/companyRoute";
import userRouter from "./routes/userRoute";
async function main() {
  try {
    const dbUrl = process.env.MONGODB_DATABASE_URL;

    if (!dbUrl) {
      throw new Error("Unable to load env");
    }
    const port = process.env.PORT || 6001;
    const app = express();
    app.use(express.json());
    app.use(
      (
        err: ErrorRequestHandler,
        _req: Request,
        res: Response,
        next: NextFunction
      ) => {
        if (err instanceof SyntaxError && "body" in err) {
          res.status(400).json({ error: err.message });
          return;
        }
        next();
      }
    );
    app.use("/company", companyRouter);
    app.use("/user", userRouter);
    app.get("/health", async function (_request: Request, response: Response) {
      response.status(200).json({ message: "OK" });
    });
    await connect(dbUrl);
    console.log("db connected");
    app.listen(port, () => console.log("application running on port " + port));
  } catch (error) {
    console.log(error);
  }
}
main();
