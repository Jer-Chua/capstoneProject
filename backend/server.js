const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const cors = require('cors')
const { default: axios } = require('axios')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

mongoose.connect('mongodb://localhost:27017/capstone')
  .then(() => console.log('Connected!'))
  .catch((err) => {
    console.log(err)
  })

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is Mandatory']
  },
  email: {
    type: String,
    required: [true, 'Email is Mandatory']
  },
  password: {
    type: String,
    required: [true, 'Password is Mandatory']
  },
  favouriteList: {
    type: [String]
  },
  recommendedBooks: {
    type: [String]
  }
}, { timestamps: true })

const bookSchema = mongoose.Schema({
  globalRecommendation: {
    type: [
      {
        bookId: String,
        numberOfPax: Number
      }
    ],
    required: [true, 'Global Recommendation is Mandatory']
  }
}, { timestamps: true })

const userModel = mongoose.model('users', userSchema)
const bookModel = mongoose.model('books', bookSchema)

app.post('/createUser', async (req, res) => {
  try {
    const userInfo = req.body
    console.log(userInfo)
    const existingUser = await userModel.findOne({ email: userInfo.email })
    if (!existingUser) {
      const hashedPassword = await hashPassword(userInfo.password)
      userInfo.password = hashedPassword
      const newUser = await userModel.create(userInfo)
      res.status(201).json({ userId: newUser._id })
    } else {
      res.status(409).send('Exist user')
    }
  } catch (error) {
    console.error(`Error creating user: ${error}`)
    res.status(500).send('Error creating user')
  }
})

app.post('/login', async (req, res) => {
  try {
    const userInfo = req.body
    const existingUser = await userModel.findOne({ email: userInfo.email })
    if (!existingUser) {
      res.status(404).json({ error: 'User not found' })
    } else {
      console.log(existingUser.password)
      bcrypt.compare(userInfo.password, existingUser.password, (_, result) => {
        console.log(result)
        if (result === true) {
          res.status(200).json({ userId: existingUser._id, name: existingUser.name, favouriteList: existingUser.favouriteList, recommendedBooks: existingUser.recommendedBooks })
        } else {
          res.status(401).json({ error: 'Incorrect password' })
        }
      })
    }
  } catch (error) {
    console.error(`Error creating user: ${error}`)
    res.status(500).send('Error creating user')
  }
})

app.put('/addFavourite', async (req, res) => {
  try {
    const bodyContent = req.body
    console.log(bodyContent)
    const existingUser = await userModel.findById(bodyContent.id)
    if (!existingUser) {
      res.status(404).json({ error: 'User not found' })
    } else {
      const data = { ...existingUser._doc }
      console.log(data)
      data.favouriteList.push(bodyContent.bookId)
      userModel.findByIdAndUpdate(bodyContent.id, { $set: data }, { returnOriginal: false }).then(result => {
        console.log(result)
        res.send(result)
      }).catch(err => {
        console.log(err)
        res.status('500').send('somthing went wrong adding')
      })
    }
  } catch (error) {
    console.error(`Error creating user: ${error}`)
    res.status(500).send('Error creating user')
  }
})

app.put('/removeFavourite', async (req, res) => {
  try {
    const bodyContent = req.body
    console.log(bodyContent)
    const existingUser = await userModel.findById(bodyContent.id)
    if (!existingUser) {
      res.status(404).json({ error: 'User not found' })
    } else {
      const data = { ...existingUser._doc }
      console.log(data)
      const index = data.favouriteList.findIndex(indivData => indivData === bodyContent.bookId)
      console.log(index)
      data.favouriteList.splice(index, 1)
      userModel.findByIdAndUpdate(bodyContent.id, { $set: data }, { returnOriginal: false }).then(result => {
        console.log(result)
        res.send(result)
      }).catch(err => {
        console.log(err)
        res.status(500).send('somthing went wrong adding')
      })
    }
  } catch (error) {
    console.error(`Error creating user: ${error}`)
    res.status(500).send('Error creating user')
  }
})

app.get('/getGlobal', async (req, res) => {
  try {
    const bookExist = await bookModel.find({})
    res.send(bookExist)
  } catch (err) {
    res.status(500).send(err)
  }
})

app.put('/addRecommend', async (req, res) => {
  try {
    const bodyContent = req.body
    console.log(bodyContent)
    const existingBook = await bookModel.findOne({})
    const userResponse = await axios.put('http://localhost:3001/addRecommendUser/', bodyContent)
    console.log(userResponse.data)
    if (userResponse.status === 200) {
      if (!existingBook) {
        res.status(400).send('error in fetching global book')
      } else {
        const index = existingBook.globalRecommendation.findIndex(indivBookObj => indivBookObj.bookId === bodyContent.bookId)
        console.log('index', index)
        if (index === -1) {
          const data = {
            bookId: bodyContent.bookId,
            numberOfPax: 1
          }
          const updatedGlobal = { ...existingBook._doc }
          console.log('line 173', updatedGlobal)
          updatedGlobal.globalRecommendation.push(data)
          bookModel.findByIdAndUpdate(updatedGlobal._id, { $set: updatedGlobal }, { returnOriginal: false }).then((result) => {
            res.send({ global: result, user: userResponse.data })
          })
        } else {
          const updatedGlobal = { ...existingBook._doc }
          console.log('line 182', updatedGlobal)
          updatedGlobal.globalRecommendation[index].numberOfPax += 1
          bookModel.findByIdAndUpdate(updatedGlobal._id, { $set: updatedGlobal }, { returnOriginal: false }).then(result => {
            res.send({ global: result, user: userResponse.data })
          }).catch(err => {
            console.log(err)
            res.status(500).send('somthing went wrong adding')
          })
        }
      }
    }
  } catch (error) {
    console.error(`Error creating add recommended: ${error}`)
    res.status(500).send('Error creating add recommended')
  }
})

app.put('/addRecommendUser', async (req, res) => {
  try {
    const bodyContent = req.body
    console.log(bodyContent)
    const existingUser = await userModel.findById(bodyContent.id)
    if (!existingUser) {
      res.status(404).json({ error: 'User not found' })
    } else {
      const data = { ...existingUser._doc }
      console.log(data)
      data.recommendedBooks.push(bodyContent.bookId)
      userModel.findByIdAndUpdate(bodyContent.id, { $set: data }, { returnOriginal: false }).then(result => {
        console.log(result)
        res.send(result)
      }).catch(err => {
        console.log(err)
        res.status(500).send('somthing went wrong adding')
      })
    }
  } catch (error) {
    console.error(`Error creating user recommended: ${error}`)
    res.status(500).send('Error creating user recommended')
  }
})

app.put('/removeRecommend', async (req, res) => {
  try {
    const bodyContent = req.body
    console.log(bodyContent)
    const existingBook = await bookModel.findOne({})
    const userResponse = await axios.put('http://localhost:3001/removeRecommendUser/', bodyContent)
    console.log(userResponse.data)
    if (userResponse.status === 200) {
      if (!existingBook) {
        res.status(400).send('error in fetching global book')
      } else {
        const index = existingBook.globalRecommendation.findIndex((indivBookObj) => indivBookObj.bookId === bodyContent.bookId)
        console.log('index', index)
        if (index === -1) {
          res.status(500).send('no book record in global')
        } else {
          const updatedGlobal = { ...existingBook._doc }
          console.log('line 182', updatedGlobal)
          if (updatedGlobal.globalRecommendation[index].numberOfPax - 1 === 0) {
            updatedGlobal.globalRecommendation.splice(index, 1)
          } else {
            updatedGlobal.globalRecommendation[index].numberOfPax -= 1
          }
          bookModel.findByIdAndUpdate(updatedGlobal._id, { $set: updatedGlobal }, { returnOriginal: false }).then(result => {
            res.send({ global: result, user: userResponse.data })
          }).catch(err => {
            console.log(err)
            res.status(500).send('somthing went wrong removing')
          })
        }
      }
    }
  } catch (error) {
    console.error(`Error creating add recommended: ${error}`)
    res.status(500).send('Error creating add recommended')
  }
})

app.put('/removeRecommendUser', async (req, res) => {
  try {
    const bodyContent = req.body
    console.log(bodyContent)
    const existingUser = await userModel.findById(bodyContent.id)
    if (!existingUser) {
      res.status(404).json({ error: 'User not found' })
    } else {
      const data = { ...existingUser._doc }
      console.log(data)
      const index = data.recommendedBooks.findIndex(indivBookId => indivBookId === bodyContent.bookId)
      data.recommendedBooks.splice(index, 1)
      userModel.findByIdAndUpdate(bodyContent.id, { $set: data }, { returnOriginal: false }).then(result => {
        console.log(result)
        res.send(result)
      }).catch(err => {
        console.log(err)
        res.status(500).send('somthing went wrong remove')
      })
    }
  } catch (error) {
    console.error(`Error remove user recommended: ${error}`)
    res.status(500).send('Error remove user recommended')
  }
})

async function hashPassword (password) {
  const saltRounds = 10
  return bcrypt.hash(password, saltRounds)
}

app.listen(3001, () => {
  console.log(`Example app listening on port ${3001}`)
})
