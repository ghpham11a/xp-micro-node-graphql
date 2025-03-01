// schema.ts
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
} from 'graphql';
import { User, UserType } from './models/user';

// Argument interfaces
interface CreateUserArgs {
    name: string;
    email: string;
}

interface UpdateUserArgs {
    id: string;
    name?: string;
    email?: string;
}

interface DeleteUserArgs {
    id: string;
}


// Mutation
export const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // 1) Create User
        createUser: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
            },
            async resolve(_parent, args: any) {
                try {
                    const userArgs = args as CreateUserArgs;
                    const user = new User({
                        name: userArgs.name,
                        email: userArgs.email,
                    });
                    return await user.save();
                } catch (error: any) {
                    throw new Error(error);
                }
            },
        },

        // 2) Update User
        updateUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                email: { type: GraphQLString },
            },
            async resolve(_parent, args: any) {
                const { id, ...updates } = args as UpdateUserArgs;
                try {
                    const updatedUser = await User.findByIdAndUpdate(
                        id,
                        { $set: updates },
                        { new: true } // Return the updated document
                    );
                    if (!updatedUser) {
                        throw new Error('User not found');
                    }
                    return updatedUser;
                } catch (error: any) {
                    throw new Error(error);
                }
            },
        },

        // 3) Delete User
        deleteUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            async resolve(_parent, args: any) {
                try {
                    const deleteArgs = args as DeleteUserArgs;
                    const deletedUser = await User.findByIdAndDelete(deleteArgs.id);
                    if (!deletedUser) {
                        throw new Error('User not found');
                    }
                    return deletedUser;
                } catch (error: any) {
                    throw new Error(error);
                }
            },
        },
    },
});
