const { UserInputError, AuthenticationError } = require('apollo-server');

const checkAuth = require('../../utils/check-auth');
const Post = require('../../models/Post');

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const user = checkAuth(context);
      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          error: {
            body: 'Comment body must not be empty'
          }
        });
      }
      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString()
        });
        await post.save();
        return post;
      }

      throw new UserInputError('Post not found');
    },
    async deleteComment(_, { postId, commentId }, context) {
      const { username } = checkAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        const commentIndex = post.comments.findIndex(c => c.id === commentId);
        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        }
        return new AuthenticationError('Action not allowed');
      }
      return new UserInputError('Post not found');
    }
  }
};
