import { createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'
import { posts } from './datas/post.js'
import { users } from './datas/user.js'
import { roles } from './datas/role.js'


const typeDefs = `
  type Post {
    id: ID!
    title: String!
    content: String!
    user:User!
  }

  type User {
    id: ID!
    name: String!
    posts:[Post]
    role:Role
  }

  type Role {
    id: ID!
    name: String!
  }

  type Query {
    posts: [Post!]
    users: [User!]
  }
`;


const resolvers = {
  Query: {
    posts: () => posts,
    users: () => users,
  },
  Post: {
    user: async (parent, args, context, info) => {
      const user = await users.find(x => x.id == parent.userId);
      return user;
    },
  },
  User: {
    role: async (parent, args, context, info) => {
      const role = await roles.find(x => x.id == parent.roleId);
      return role;
    },
    posts: async (parent, args, context, info) => {
      const p =await posts.filter(x => x.userId == parent.id);
      return p;
    },
  }
  ,
};

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  })
})

const server = createServer(yoga)

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})