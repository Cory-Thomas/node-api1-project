const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ hello: "server is working... Hello World!"});
});

let users = [
    {
        id: Date.now() + Math.random(),
        name: "Jane Doe", 
        bio: "Not Tarzan's Wife, another Jane"
    },
    {
        id: Date.now() + Math.random(),
        name: "Cory Thomas", 
        bio: "Not the programmer coding this, another Cory Thomas"
    }
];

server.get('/users', (req, res) => {
    res.status(200).json({ data: users});
});

server.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);

    const found = users.filter(l => l.id === id);

    if ( found ){
        res.status(200).json({found})            
    } else {
        res.status(400).json({errorMessage: 'The user with the specified ID does not exist'})
    }
});

server.post('/users', (req, res) => {
    const data = req.body;
    const { name, bio } = data;

    if (!name || !bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user" });
    } else if (name && bio) {
        users.push({
            id: Date.now() + Math.random(), 
            ...data
        });

        res.status(201).json({ data, users });
    } else {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" });
    }
});

server.put('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const changes = req.body;
    const found = users.find(l => l.id === id);

    if (found) {
        Object.assign(found, changes);
        res.status(200).json({ data: users });
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
});

server.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);

    users = users.filter(l => l.id !== id);
    if (id) {
        res.status(200).json({ data: users });
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

const port = 5000;
server.listen(port, () => console.log('api running'));