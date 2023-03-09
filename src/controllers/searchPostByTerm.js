const { PostsService } = require('../services');

module.exports = async (req, res) => {
    const { q } = req.query;
    console.log(q, 'termo');
    let posts = [];
    if (q) {
        posts = await PostsService.getPostsByTerm(q);
    } else {
        posts = await PostsService.getPosts();
    }

    if (posts.length === 0) {
        return res.status(200).json([]);
    }
    res.status(200).json(posts);
};
