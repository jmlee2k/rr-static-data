import "react-router";
import { createRequestHandler } from "@react-router/express";
import express from "express";

declare module "react-router" {
  interface AppLoadContext {
    VALUE_FROM_EXPRESS: string;
  }
}

declare global
{
	var __ENV:{IMG_URL:string};
}

//in "real life", this will come from process.env
globalThis["__ENV"] = {IMG_URL: "https://upload.wikimedia.org/wikipedia/en/c/cb/Marvin_%28HHGG%29.jpg"}

export const app = express();

app.use(
  createRequestHandler({
    build: () => import("virtual:react-router/server-build"),
    getLoadContext() {
      return {
        VALUE_FROM_EXPRESS: "Hello from Express",
      };
    },
  }),
);
