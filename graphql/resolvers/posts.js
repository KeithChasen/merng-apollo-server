const Post = require('../../models/Post');

module.exports = {
  Query: {
    async getPosts() {
      try {
        return  await Post.find();
      } catch (e) {
        throw new Error(e)
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error('Post not found');
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};
