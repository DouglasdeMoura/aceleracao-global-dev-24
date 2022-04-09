const crypto = require('crypto')
const { ApolloServer, gql } = require('apollo-server')

const tasks = []

const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    done: Boolean!
  }

  type Query {
    tasks: [Task]
  }

  type Mutation {
    createTask(title: String!): Task
    updateTask(id: ID!, done: Boolean!): Task
    deleteTask(id: ID!): Task
  }
`;

const resolvers = {
  Query: {
    tasks: () => tasks
  },
  Mutation: {
    createTask: (_parent, args) => {
      const task = {
        id: crypto.randomUUID(),
        title: args.title,
        done: false
      }
      tasks.push(task)
      return task
    },
    updateTask: (_parent, args) => {
      const task = tasks.find(task => task.id === args.id)
      task.done = args.done
      return task
    },
    deleteTask: (_parent, args) => {
      const task = tasks.find(task => task.id === args.id)
      tasks.splice(tasks.indexOf(task), 1)
      return task
    },
  }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
