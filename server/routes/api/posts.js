const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

// Add post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        title: req.body.title,
        created: new Date(),
        content: req.body.content
    });
    res.status(201).send();
});

//Delete post
router.delete('/:id', async(req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
    res.status(200).send();
});

const uri = `mongodb+srv://xxx:xxx@cluster0.ymzgf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect(uri, {
        useNewUrlParser: true
    });

    return client.db('vue').collection('posts');
}

module.exports = router;
