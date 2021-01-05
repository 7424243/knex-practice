require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
})

//Drill #1
function searchToContainText(searchTerm) {
    knexInstance
        .select('id', 'name', 'price', 'date_added', 'checked', 'category')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(results => {
            console.log(results)
        })
}
//searchToContainText('dog')

//Drill #2
function searchItemsPaginated(pageNumber) {
    const limit = 6
    const offset = limit * (pageNumber - 1)
    knexInstance
        .select('id', 'name', 'price', 'date_added', 'checked', 'category')
        .from('shopping_list')
        .limit(limit)
        .offset(offset)
        .then(results => {
            console.log(results)
        })
}
//searchItemsPaginated(3)

//Drill #3
function searchItemsAfterDate(daysAgo) {
    knexInstance
        .select('id', 'name', 'price', 'date_added', 'checked', 'category')
        .from('shopping_list')
        .where(
            'date_added',
            '>',
            knexInstance.raw(`now() - '?? days':: INTERVAL`, daysAgo)
        )
        .then(results => {
            console.log(results)
        })
}
//searchItemsAfterDate(2)

//Drill #4
function getCostPerCategory() {
    knexInstance
        .select('category')
        .sum('price as total')
        .from('shopping_list')
        .groupBy('category')
        .then(result => {
            console.log(result)
        })
}
getCostPerCategory()