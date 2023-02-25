import { Express, Router } from "express";
import { readdirSync } from "fs";

export default (app: Express): void => {
  const router = Router();
  app.use("/api", router);

  const routesDirectory = `${__dirname}/../routes`;
  readdirSync(routesDirectory).map(async (file) => {
    if (!file.includes(".test.")) {
      (await import(`${routesDirectory}/${file}`)).default(router);
    }
  });
};
