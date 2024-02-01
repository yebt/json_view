import { randomUUID } from 'node:crypto'
export default class UUID {
  /**
   * Constructor for creating a new instance of the class.
   *
   * @param {string} uuidString - the UUID string to initialize the instance with
   */
  constructor (uuidString) {
    if (!uuidString) {
      this.uuidString = UUID.generate()
    } else if (!UUID.isValidUUID(uuidString)) {
      throw new Error('Invalid UUID format')
    }
    this.uuidString = uuidString
  }

  /**
   * Checks if the input string is a valid UUID.
   *
   * @param {string} uuidString - The string to be checked for UUID format.
   * @return {boolean} Whether the input string is a valid UUID.
   */
  static isValidUUID (uuidString) {
    const uuidRegex =
          /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    return uuidRegex.test(uuidString)
  }

  get value () {
    return this.uuidString
  }

  /**
   * Generate a new UUID.
   *
   * @return {UUID} a new UUID
   */
  static generate () {
    return new UUID(randomUUID())
  }
}
