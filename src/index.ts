import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema';
import { root } from './resolvers';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Add GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // Enable GraphiQL UI
}));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});