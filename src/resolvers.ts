
  
import { User } from './models/user';

// Define resolvers
const root = {
    hello: () => {
        return 'Hello world!';
    },
    getUser: async ({ id }: { id: string }) => {
        try {
            const user = await User.findById(id);
            return user;
        } catch (err) {
            console.error(err);
            return null;
        }
    },
    getTodos: async () => {
        // Assuming you have a Todo model similar to the User model
        // const todos = await Todo.find();
        // return todos;
        return []; // Placeholder
    },
};
  
export { root };