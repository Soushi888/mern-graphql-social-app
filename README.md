# mern-graphql-social-app

Pratique de développement d'une application  générique de réseau social avec le stack NodeJS, ExpressJS, MongoDB, GraphQL et ReactJS.

## Fonctionnalités

- Afficher les posts
- Commenter un post
- Liker un post
- Se créer un compte
- Se connecter

## GraphQL

GraphQL est mis en place grâce à Apollo GraphQL.

### Schema

fichier : graphql/typeDefs.js

```
type Post {
    id: ID!
    body: String
    username: String!
    createdAt: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getPosts(chrono: Boolean): [Post]
    getPost(postId: ID): Post!
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Po!st!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
  type Subscription {
    newPost: Post!
  }
  ```
  ## Client
  
  Application cliente crée avec React JS et Semantic UI.
  
  ### Routes
  - `/` : Home Page
  - `/login` : Login Page
  - `/register` : Register Page
