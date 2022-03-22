
const models  = require('../models');
const Post = models.posts
const Comment = models.comments
const fs = require('fs');

exports.createPost = async (req, res) => {
    try { 
		await Post.create({ 
			...req.body,
		 })
	res.status(201).send({ message: 'Post has been created'})
} catch (err) {
	res.status(500).send(err)
}}

exports.getPosts = async (req, res, next) => {
	try {
    const posts = await Post.findAll({order: [
		['createdAt', 'DESC'],
	]})
    res.status(200).send(posts);}
	catch (error) {
		res.status(400).json({ error: error.message });
}}

exports.deletePost = async (req, res) => {
	try {
		const post = await Post.findOne({
			where: { id: req.params.id },
		});
		if (post.pictureUrl !== null) {
			const filename = post.attachment.split('/images')[1];
			fs.unlink(`images/${filename}`, (error) => {
				error ? console.log(error) : console.log('file has been deleted');
			});
		}
		if (!post) {
			throw new Error("Sorry,your post doesn't exist ");
		}
		const destroyedPost = await Post.destroy({
			where: { id: req.params.id },
		});
		const destroyedComment = await Comment.findAll({
			where: { postId: req.params.id },
		});
		if(destroyedComment){
			Comment.destroy({
				where: { postId: req.params.id },
			});
		}
		if (!destroyedPost) {
			throw new Error('Sorry,something gone wrong,please try again later');
		} else {
			res.status(200).json({ message: 'Post has been deleted ' });
		}
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};

