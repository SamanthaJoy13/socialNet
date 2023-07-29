const connection = require('../config/connection');
const { getPost, generateIndex } = require('./data');


console.time('seeding');

connection.once('open', async () => {

  await Post.deleteMany({});
  await Tags.deleteMany({});

  const tags = [];
  const posts = [];

  const makePost = (text) => {
    posts.push({
      published: Math.random() < 0.5,
      text,
      tags: [tags[generateIndex(tags)]._id],
    });
  };
  
});
