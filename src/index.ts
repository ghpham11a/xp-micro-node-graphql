import express, { Express } from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import { RootQuery } from "./queries";
import { Mutation } from "./mutations";
import { GraphQLSchema } from "graphql/type/schema";

import './db';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Export the schema (default export is common, but adjust as needed)
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

// Add GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
  }),
  graphiql: true, // Enable GraphiQL UI
}));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});