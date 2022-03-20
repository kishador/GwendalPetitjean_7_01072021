const models = require("../models");
const Comment = models.comments
const fs = require("fs");

exports.createComment = async (req, res) => {
	try { console.log(req.body)
		await Comment.create({ 
			...req.body
		 })

	res.status(201).send({ message: 'Post has been created'})
} catch (err) {
	res.status(500).send(err)
}
}
exports.getComments = async (req, res) => {
	
	try {
		const posts = await Comment.findAll({order: [
			['createdAt', 'DESC'],
		]})
		if (posts){
		res.status(200).send(posts);}
		else {
			res.status(200).send("not yet posts")
		}
	}
		catch (error) {
			res.status(400).json({ error: error.message });
	}
	}

exports.deleteComment = async (req, res) => {
	console.log(req.params.id)
	try {
		const comment = await Comment.findOne({
			where: { id: req.params.id },
		});
		if (!comment) {
			throw new Error("Sorry,your comment doesn't exist ");
		}
		const destroyedComment = await Comment.destroy({
			where: { id: req.params.id },
		});
		if (!destroyedComment) {
			throw new Error('Sorry,something gone wrong,please try again later');
		} else {
			res.status(200).json({ message: 'Comment has been deleted ' });
		}
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};

