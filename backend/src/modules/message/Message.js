// eslint-disable-next-line no-unused-vars
import UUID from '../uuid/UUID'

export default class Message {
  /**
   * Constructor for creating a new instance of the class.
   *
   * @param {UUID} UUID - description of parameter
   * @param {string} author - description of parameter
   * @param {string[]} tags - description of parameter
   * @param {string} content - description of parameter
   * @param {string} createAt - description of parameter
   * @param {string} updateAt - description of parameter
   */
  constructor (UUID, author, tags, content, createAt, updateAt) {
    this.UUID = UUID
    this.author = author
    this.tags = tags
    this.content = content
    this.createAt = createAt
    this.updateAt = updateAt
  }
}
