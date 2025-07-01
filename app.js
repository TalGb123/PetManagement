import express from 'express'
import cors from 'cors'
import routes from "./routes/index.js"
import { createLogger } from "./utils/logger.js";
const app = express();

const logger = createLogger('APP');

app.use(cors())
app.use(express.json())


app.use((req, res, next) => {
    logger.http(`${req.method} request to ${req.url}`);

    res.on('finish', () => {
        const statusCode = res.statusCode;
        const logLevel = statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'http';
        logger[logLevel](`${req.method} ${req.url} - ${statusCode}`);
    });
    next();
})

app.use ('/uploads', express.static('uploads'))
app.use("/api", routes);

export default app;
