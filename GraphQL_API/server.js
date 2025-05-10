const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require('graphql');

const app = express();

// Sample data
const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

// Define the UserType GraphQL Object
const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'This represents a user in our system',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

// Root Query to get a list of users
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: () => users,  // Return the users data
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLInt } },
      resolve: (parent, args) => users.find(user => user.id === args.id), // Find a user by ID
    },
  },
});

// Mutations to add, update, and delete users
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Add User 
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        const newUser = { id: users.length + 1, name: args.name, email: args.email };
        users.push(newUser);
        return newUser;
      },
    },

    // Update User
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        const user = users.find(user => user.id === args.id);
        if (!user) {
          throw new Error('User not found');
        }
        if (args.name) user.name = args.name;
        if (args.email) user.email = args.email;
        return user;
      },
    },
    // Delete User
    deleteUser: {
      type: UserType,
      args: { id: { type: GraphQLInt } },
      resolve: (parent, args) => {
        const index = users.findIndex(user => user.id === args.id);
        if (index === -1) {
          throw new Error('User not found');
        }
        const deletedUser = users.splice(index, 1);
        return deletedUser[0];
      },
    },
  },
});

// Define the schema
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

// Set up the Express server with GraphQL
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,  // Allows you to use GraphiQL interface (a graphical interface to test GraphQL queries)
}));

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`GraphQL server running on http://localhost:${PORT}/graphql`);
});
