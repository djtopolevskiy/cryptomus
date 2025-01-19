export default () => ({
  secret: process.env.SECRET_JWT,
  expireJwt: process.env.JWT_EXPIRE,
});
