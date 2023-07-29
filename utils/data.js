const phrases = [

    "Here's a thought!",
    "This is cool!",
    "Check this out!",
    "Something interesting!",
    "Just a random idea!",
    "You'll love this!",
    "Random phrase incoming!",
    "How about this?",

  ];
  
  const generateIndex = (arr) => Math.floor(Math.random() * arr.length);
  
  const getPhrase = () => `${phrases[genRandomIndex(phrases)]}`;
  
  const getPost = (phrase) => {
    let post = '';
    for (let i = 0; i < phrase; i++) {
      post += ` ${getPhrase()}`;
    }
    return post;
  };

  module.exports = {
    getPhrase,
    getPost,
    generateIndex,
  };
  