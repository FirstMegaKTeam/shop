async function setHeader(req, res, next) {
  const { auth } = req.signedCookies;
  if (auth) {
    req.headers.authorization = `Bearer ${auth}`;
  }
  next();
}

module.exports = {
  setHeader,
};
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0ZjUwMjIxLTkyMTItNDA3Zi1hYTRmLTQ4YTlhNmI1NjA2YyIsInB1YmxpY0tleSI6IiQyYiQxMCR1SG42MDRPRDdJcDFhSUFIQldxSnBlaXN
// mZHN1R2EuUGkwZUtPVUE2ZC5aaVd5eFdzbS5HMiIsImlhdCI6MTYzOTkwODU4MiwiZXhwIjoxNjM5OTEyMTgyfQ._YsNlqLMehvNwT57CYH62j886h4wpzEgAkQoZe6sESk

// 000000000000000000000000000000000000
