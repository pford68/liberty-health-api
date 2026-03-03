import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import errorHandler from "./routes/errorHandler.js";
import userRouter from "./routes/userRoutes.js";
import applicantRouter from "./routes/applicantRoutes.js";
import referenceRouter from "./routes/referenceRoutes.js";
import jobRouter from "./routes/jobHistoryRoutes.js";
import educationRouter from "./routes/educationRoutes.js";
import licenseRouter from "./routes/licenseRoutes.js";

const app = express();

// __dirname is not available in modules scope, so we define it
const __dirname = import.meta.dirname;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(helmet())
app.use(cookieParser());
app.use("/api/users/", userRouter);
app.use("/api/form/", applicantRouter);
app.use("/api/form/references/", referenceRouter);
app.use("/api/form/jobs/", jobRouter);
app.use("/api/form/schools/", educationRouter);
app.use("/api/form/licenses/", licenseRouter)
app.use(errorHandler);

export default app;
