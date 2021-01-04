require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
})

// knexInstance.from('amazong_products').select('*')
//     .then(result => {
//         console.log(result)
//     })

// const searchTerm = 'holo'

function searchByProduceName(searchTerm) {
    knexInstance
        .select('product_id', 'name', 'price', 'category')
        .from('amazong_products')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log(result)
        })
}

searchByProduceName('holo')

    //console.log(qry)

