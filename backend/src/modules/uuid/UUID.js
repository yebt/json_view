import { randomUUID } from 'node:crypto'
export class UUID {
  /**
   * The UUID string.
   *
   * @type {string}
   * @private
   * @property
   */
  _uuidString = null
  /**
   * Constructor for creating a new instance of the class.
   *
   * @param {string} uuidString - the UUID string to initialize the instance with
   */
  constructor (uuidString) {
    if (!uuidString) {
      throw new Error('Missing UUID string')
    }
    if (!UUID.isValidUUID(uuidString)) {
      throw new Error('Invalid UUID format')
    }
    this._uuidString = uuidString
  }

  /**
   * A getter function to retrieve the value.
   *
   * @return {string} the value of the _uuidString property
   */
  get value () {
    return this._uuidString
  }

  /**
   * Checks if the input string is a valid UUID.
   *
   * @method
   * @static
   * @param {string} uuidString - The string to be checked for UUID format.
   * @return {boolean} Whether the input string is a valid UUID.
   */
  static isValidUUID (uuidString) {
    const uuidRegex =
          /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    return uuidRegex.test(uuidString)
  }

  /**
   * Generate a new UUID.
   *
   * @method
   * @static
   * @return {UUID} a new UUID
   */
  static generate () {
    return new UUID(randomUUID())
  }
}
