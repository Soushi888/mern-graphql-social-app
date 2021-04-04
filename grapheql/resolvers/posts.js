const Post = require("../../models/Post");

module.exports = {
  Query: {
    async getPosts() {
      try {
        console.log("hello");
        return await Post.find();
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
