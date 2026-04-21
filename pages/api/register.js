export default async function handler(req, res) {
  return res.status(410).json({
    error: 'This endpoint is disabled. Use Better Auth sign-in instead.',
  });
}
