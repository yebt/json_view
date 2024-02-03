/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  return knex.schema.createTable('notifications', function (table) {
    table.text('UUID').notNullable().primary()
    table.boolean('read').notNullable().defaultTo(false)
    table.text('table').notNullable()
    table.text('pk_tuple').notNullable()
    table.text('event').notNullable()
    table.timestamps(true, true, false)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  return knex.schema.dropTable('notifications')
}
