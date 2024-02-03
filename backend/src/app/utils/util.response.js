/**
 * Check if the specified parameter is present in the request parameters.
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {string} param - The parameter to be checked
 * @return {boolean} true if the parameter is present, false otherwise
 */
export function requireParam (req, res, param) {
  if (!req.params[param]) {
    res.status(400).json({
      error: true,
      message: `${param} is required`
    })
    return false
  }
  return true
}

/**
 * Checks if the specified parameter exists in the request body and returns a boolean value.
 *
 * @param {object} req - the request object
 * @param {object} res - the response object
 * @param {string} param - the parameter to be checked in the request body
 * @return {boolean} true if the parameter exists in the request body, false otherwise
 */
export function requireBody (req, res, param) {
  if (!req.body[param]) {
    res.status(400).json({
      error: true,
      message: `${param} is required`
    })
    return false
  }
  return true
}

/**
 * Check if a query parameter is present in the request.
 *
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @param {string} param - the name of the query parameter to be checked
 * @return {boolean} true if the query parameter is present, false otherwise
 */
export function requireQuery (req, res, param) {
  if (!req.query[param]) {
    res.status(400).json({
      error: true,
      message: `${param} is required`
    })
    return false
  }
  return true
}
