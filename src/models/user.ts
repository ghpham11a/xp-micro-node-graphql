import mongoose, { Schema, Document } from 'mongoose';
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

interface IUser extends Document {
  name: string;
  email: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const User = mongoose.model<IUser>('User', UserSchema);

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id:    { type: new GraphQLNonNull(GraphQLID) },
    name:  { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) }
  }),
});

export { User, IUser, UserType };