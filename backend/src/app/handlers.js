/**
 * Handle the not found request by sending a 404 status and a JSON response with an error message.
 *
 * @param {import("http").IncomingMessage} req - The request object
 * @param {import("http").ServerResponse} res - The response object
 * @param {Function} next - The next middleware function
 * @return {Object} JSON response with error message
 */
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({ error: true, message: '404 URL Not found 🤔🧐' })
}

/**
 * Handles errors that occur on the server.
 *
 * @param {ReferenceError} err - the error object
 * @param {import("http").IncomingMessage} req - the request object
 * @param {import("http").ServerResponse} res - the response object
 * @param {Function} next - the next function in the middleware chain
 * @return {Object} an object with error and message properties
 */
export const serverErrorHandler = (err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: true, message: 'Something broke! 💥🔥' })
}
