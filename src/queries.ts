import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLList,
    GraphQLInt
} from 'graphql';
import { User, UserType } from './models/user';

interface GetUserArgs {
    id?: string; // Because it's optional in the Query
}

interface GetUsersArgs {
    limit?: number;
    skip?: number;
}

export const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        // Get a single user by ID
        user: {
            type: UserType,  // returns a single UserType
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            async resolve(_parent, args: GetUserArgs) {
                return User.findById(args.id);
            },
        },

        // Get all users (with optional limit/skip pagination)
        users: {
            // returns an array (list) of UserType
            type: new GraphQLList(UserType),
            args: {
                limit: { type: GraphQLInt },
                skip: { type: GraphQLInt },
            },
            async resolve(_parent, { limit, skip }: GetUsersArgs) {
                // Provide default pagination values if none are passed
                const queryLimit = limit ?? 10; // default limit to 10
                const querySkip = skip ?? 0;    // default skip to 0
                return User.find().skip(querySkip).limit(queryLimit);
            },
        },
    },
});
