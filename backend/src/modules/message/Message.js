// eslint-disable-next-line no-unused-vars
import { UUID } from '../uuid/UUID.js'

export class Message {
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
  constructor (UUID, author, tags, content, createdAt, updatedAt) {
    this.UUID = UUID
    this.author = author
    this.tags = tags
    this.content = content
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  /**
   * description
   *
   * @param {UUID} UUID - description
   * @param {string} author - description
   * @param {string[]} tags - description
   * @param {string} content - description
   * @param {string} createAt - description
   * @param {string} updateAt - description
   * @return {Message} description
   */
  static create ({ UUID, author, tags, content, createAt, updateAt }) {
    return new Message(UUID, author, tags, content, createAt, updateAt)
  }
}
