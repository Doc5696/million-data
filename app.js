const mongoose = require('mongoose')
const express = require('express')
const Schema = mongoose.Schema
const cors = require('cors')
const http = require('http')

const app = express()

const server = http.createServer(app)

const jsonParser = express.json()

app.use(cors())


const userSchema = new Schema({
  name: String,
}, { versionKey: false })

const User = mongoose.model('User', userSchema)

mongoose.connect('mongodb://localhost:27017/million', { useNewUrlParser: true }, function(err){
	if(err) return console.log(err)
    server.listen(8000, function(){
      console.log(`Server is running on port 8000`)
    })
})

app.get('/api/users', function(req, res){

	User.find({}, function(err, users){

    if(err) return console.log(err)
    console.log(`GET request | ${users.length} users were returned`)
    res.send(users)
    
  })
  
})

app.post('/api/users', jsonParser, async (req, res) => {

  if(!req.body) return res.sendStatus(400)

  const usersName = req.body.name
  
  const user = new User({name: usersName})

  const saver = async obj => {
    await obj.save(function(err){
      if(err) return console.log(err)
      res.send(user)
      console.log(`User ${user.name} was created`)
    })
  }

  await saver(user)
})

app.delete('/api/posts/:id', function(req, res){
        
  const id = req.params.id;
  User.findByIdAndDelete(id, function(err, post){
               
    if(err) return console.log(err)
    res.send(user)
    console.log('DELETE request | the post was deleted')
  })
})

app.put('/api/posts/:id', jsonParser, function(req, res){
        
  if(!req.body) return res.sendStatus(400)
  const id = req.params.id
  const newName = req.params.name
	const newUser = {name: newName}

	User.findOneAndUpdate({_id: id}, newUser, {new: true}, function(err, post){
    if(err) return console.log(err)
    res.send(user)
    console.log('PUT request | the user was updated')
  })
})
