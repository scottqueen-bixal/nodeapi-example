/**
 * @fileoverview API Key validation middleware
 * @description Middleware to validate API keys for protected routes
 * @version 1.0.0
 */

/**
 * Middleware to validate API key
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 * @returns {void}
 */
export function validateApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  const expectedApiKey = process.env.API_KEY;

  if (!expectedApiKey) {
    console.error('API_KEY environment variable is not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  if (!apiKey) {
    return res.status(401).json({ 
      error: 'Please provide an API key in the X-API-Key header' 
    });
  }

  if (apiKey !== expectedApiKey) {
    return res.status(401).json({ 
      error: 'Invalid API key' 
    });
  }

  next();
}
