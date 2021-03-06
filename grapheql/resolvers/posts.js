const Post = require("../../models/Post");
const checkAuth = require("../../utils/check-auth");
const { AuthenticationError, UserInputError } = require("apollo-server");

module.exports = {
  Query: {
    async getPosts() {
      try {
        return await Post.find().sort({ createdAt: -1 });
      } catch (e) {
        throw new Error(e);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);

      if (body.trim() === "") {
        throw new Error("Post body must not be empty");
      }

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();

      await context.pubsub.publish("NEW_POST", {
        newPost: post,
      });

      return post;
    },

    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (post.username === user.username) {
          await post.delete();
          return "Post Deleted successfully !";
        } else {
          throw new AuthenticationError("Action not allowed !");
        }
      } catch (e) {
        throw new Error(e);
      }
    },

    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context);
      const post = await Post.findById(postId);

      if (post) {
        if (post.likes.find((l) => l.username === username)) {
          // Post already liked
          post.likes = post.likes.filter((l) => l.username !== username);
        } else {
          // Post not liked yet
          post.likes.push({ username, createdAt: new Date().toISOString() });
        }
        await post.save();
        return post;
      } else {
        throw new UserInputError("Post not found");
      }
    },
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => {
        return pubsub.asyncIterator("NEW_POST");
      },
    },
  },
};
