GraphQL Server

This is a simple GraphQL server built using graphql-yoga and node:http modules. The server provides a GraphQL API to fetch posts and users data.

Getting Started

To get started, clone this repository to your local machine and follow the steps below:

Install dependencies:
```
npm install
```
Start the server:
```
npm start
```
The GraphQL server will be running at http://localhost:4000/graphql. 
You can open this URL in your web browser or any other GraphQL client to test the API.
Available Queries

The following queries are available in this GraphQL server:



```
query MyQuery {
  posts {
    id
    title
    content
    user {
      id
      name
      role {
        id
        name
      }
    }
  }
  users {
    id
    name
    posts {
      id
      title
    }
  }
}

```

