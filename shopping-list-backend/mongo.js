const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const item = process.argv[3]

const url =
  `mongodb+srv://ruuskvivi:${password}@cluster0.nl1xg.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url).then(() => {
  const itemSchema = new mongoose.Schema({
    item: String,
  })

  const Item = mongoose.model('Item', itemSchema)

  if (process.argv.length === 2) {
    Person.find({}).then(result => {
      console.log('shopping-list:')
      result.forEach(item => {
        console.log(`${item.item}`)
      })
      mongoose.connection.close()
    })
  } else {
    const item = new Item({
      item: item,
    })
    item.save().then(() => {
      console.log(`added ${item.item} to shopping-list`)
      mongoose.connection.close()
    })
  }
}
)