const axios = require('axios')
const faker = require('faker')

const createNewUser = async name => {
  try {
    await axios({
      url: `http://localhost:8000/api/users`,
      method: 'post',
      data: {
        "name": name
      },
    }).then(res => console.log(res.data))
  } 
  catch (err) {
    console.error(err)
  }
}

const createUsersArray = () => {
  let arr = []
  for (let i = 0; i <= 1000; i++) {
    console.log("Iteration #", i)
    arr = [ ...arr, faker.name.findName() ]
  }
  return arr
}

const Users = createUsersArray()

Promise.all(
  Users.map(async newUser => {
    console.log("TCL: newUser", newUser)
    await createNewUser(newUser)
  })
)
