const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();


// Get Posts 
router.get('/', async (req, res) => {  // send browser
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray())
})


// Add Post 
router.post('/', async (req, res) => {
  const posts = await loadPostsCollection(); //同步获取collection
  await posts.insertOne({                     // 同步插入数据
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
})


// Delete Post 
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({
    _id: new mongodb.ObjectID(req.params.id)
  })
  res.status(201).send();
})

router.get('/test', (req, res) => {
  res.status(201).send('鼓楼-图书馆')
})


async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect
  ('mongodb://localhost:27017/',{
      useUnifiedTopology: true
  });

  return client.db().collection('posts')
}


module.exports = router;