export default {
  secret: process.env.TOKEN_SECRET || 'secret',
  options: {
    expiresIn: '1d',
  },
};
