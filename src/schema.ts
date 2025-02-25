import { buildSchema } from 'graphql';

// Define your schema
const schema = buildSchema(`
  type Query {
    hello: String
    getUser(id: ID!): User
    getTodos: [Todo]
  }

  type User {
    id: ID
    name: String
    email: String
  }

  type Todo {
    id: ID
    title: String
    completed: Boolean
  }
`);

export { schema };