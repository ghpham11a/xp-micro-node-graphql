
  
import { User } from './models/user';

// Define resolvers
const root = {
    getUsers: async () => {
        try {
            const users = await User.find()
            return users;
        } catch (err) {
            console.error(err);
            return null;
        }
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
};
  
export { root };