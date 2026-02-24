import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import helmet from "helmet";
import errorHandler from "./routes/errorHandler.js";
import userRouter from "./routes/userRoutes.js";
import applicantRouter from "./routes/applicantRoutes.js";

const app = express();

// __dirname is not available in modules scope, so we define it
const __dirname = import.meta.dirname;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.disable('x-powered-by');  // Hide the fact that we are using express.

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(helmet())
app.use(cookieParser());
app.use("/api/users/", userRouter);
app.use("/api/form/", applicantRouter);
app.use(errorHandler);

export default app;
