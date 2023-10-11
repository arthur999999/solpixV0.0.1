import express from "express";
import cors from "cors";
import routes from "./routers/routes";
import ShowTransaction from "./controllers/decodeTransaction";
import { TestParseURL } from "./controllers/parseURLTransaction";

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)


app.listen(4000, ()=> console.log('online'))

TestParseURL()

ShowTransaction()
