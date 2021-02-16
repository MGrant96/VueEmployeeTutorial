const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    // Find everything {} and return in an array
    res.send(await posts.find({}).toArray());
})


// Add Posts, can use the same url as it is a different method!
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    // Mongodb method, insert one record to db
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
})

// Delete Posts
router.delete('/:id', async (req, res) => {
    // Get the id from the parameter sent into the method!
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send();
});

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://MyMongoDBUser:test@cluster0.bmhgf.mongodb.net/cluster0?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db('cluster0').collection('posts');
}

module.exports = router;

