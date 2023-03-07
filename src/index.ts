import "./lib/db";
import express from "express";
import proxy from 'express-http-proxy'
import countryRoutes from "./routes/country";

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));
app.use(proxy('/proxy', {
  proxyReqPathResolver: (req: Request) => {
    if (/^https?:\/\/[^/]+\/proxy\/(\w+)\/(.*)$/.test(req.url)) {
      const proxy = RegExp.$1
      const rest = RegExp.$2
      if (proxy === 'openai') {
        return `https://api.openai.com/${rest}`
      }
    }

    return ''
  }
}))

app.get("/", async (req, res) => {
  res.json({ message: "Please visit /countries to view all the countries" });
});

app.use("/countries", countryRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
