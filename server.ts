import express from "express";
import { ApolloServer } from "apollo-server";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { allDataSources } from "./src/datasource";
import { resolvers, typeDefs } from "./src/schema";

config();

const PORT = 4000;
const dev = process.env.NODE_ENV === "development";

const startServer = async () => {
  const app = express();

  const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://172.24.144.1:3000",
    "http://172.24.144.1:3001",
    "https://studio.apollographql.com",
  ];
  const corsOptions = {
    credentials: true,
    origin: allowedOrigins,
  };

  app.set("trust proxy", process.env.NODE_ENV !== "production");
  app.use(cors(corsOptions));
  app.use(cookieParser());

  mongoose.set("strictQuery", true);
  const uri = "mongodb://localhost:27017/user_management";

  await mongoose
    .connect(uri)
    .then(() => console.log("connected to new mangoDB"));

  //rest routes
  app.get("/", (req, res) => {
    res.json({
      data: "API is working...",
    });
  });

  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers,
    // solved the cookie sent along with the request
    cors: corsOptions,
    debug: dev,
    context: async ({ req, res }) => {
      return {
        req,
        res,
        datasource: allDataSources,
      };
    },
  });

  const { url } = await server.listen({ port: PORT });
  console.log(` Server is running at ${url}graphql`);
};

startServer().catch((e) => console.log("error starting server======== ", e));
