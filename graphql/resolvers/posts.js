const Post = require('../../models/Post');
const checkAuth = require('../../utils/check-auth');

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
  },
  Mutation: {
    async createPost (_, { body }, context) {
      const user = checkAuth(context);
      console.log(user);
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });
      return await newPost.save();
    }
  }
};
