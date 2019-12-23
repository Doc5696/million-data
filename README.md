# Install dependencies
  npm install

# Run the server app (it uses 8000`s port)
  npm run start

# Populate the database (it add`s 1000 users)
  npm run generate


 # Use the routes (http://localhost:8000 - basic URL):

GET: /api/users - for getting list of all users

POST: /api/users - for creating new user (request`s body have including JSON-object like: {"name": "Some Name"})

DELETE: /api/users/:id - for deleting user by id

PUT: /api/users/:id - for updating user by id (request`s body have including JSON-object like: {"name": "Some NewName"})
