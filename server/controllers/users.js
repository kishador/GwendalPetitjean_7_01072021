const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../models");
const post = require("../models/post");
const User = models.users
const Post = models.posts
const Comment = models.comments
const maxAge = 3 * 24 * 60 * 60 * 1000;

exports.signup = async (req, res) =>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 8);
         const emailExist = await User.findOne({
			  where : { email: req.body.email }
			})
		const pseudoExist = await User.findOne({
			where : { pseudo: req.body.pseudo}
		})
		if ( pseudoExist ) {
            return res.status(200).send({ pseudoError: "Pseudo deja utilisé !"})
        } 
        if ( emailExist ) {
            return res.status(200).send({ emailError: "Adresse email deja existante !"})
        } 
        await User.create({
            ...req.body,
            password: hashedPassword,
			isAdmin: false
        })
        res.status(201).send({ user: User.id })        
    } catch (err) {
        res.status(200).send({globalError:'Réessayez plus tard !'})
    }
}

exports.login = async (req, res, next) =>{
    try {
        const user = await User.findOne({
			where : { email: req.body.email }
        })
        if (user) {
            const isMatch = await bcrypt.compare(req.body.password, user.password)
            if (isMatch) {              
           const id = user.id
           const token = jwt.sign({id}, `${process.env.JWT_KEY}`,{
               expiresIn: maxAge,
           })
               res.status(200).json({ user: user.id, userToken: token})
            }
            else {
                res.status(200).json({ passwordError: "Mot de passe incorrect !"})
            }
        }
        else {
            res.status(200).json({ emailError: "Utilisateur introuvable avec cette adresse email !"}) 
        }     
    } catch (err) {
        res.status(200).json({err:"utilisateur ou mot de passe erronné"})
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: {
            id: req.params.id
        }})
        res.status(200).json(user)
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getAllUsers = async (req, res) => {
    const users = await User.findAll()
    res.status(200).json(users);
  };

exports.deleteProfile = async (req, res) => {
	try {
		const user = await User.findOne({
			where: { id: req.params.id },
		});
		if (user.imageUrl !== null) {
			const filename = user.imageUrl.split('/images')[1];
			fs.unlink(`images/${filename}`, (error) => {
				error ? console.log(error) : console.log('file has been deleted');
			});
		}
		if (!user) {
			throw new Error("Sorry,this user doesn't exist ");
		}
		const destroyedProfil = await User.destroy({
			where: { id: req.params.id },
		});
		const destroyedPost = await Post.findAll({
			where: { userId: req.params.id },
		})
		if(destroyedPost){ Post.destroy({
			where: { userId: req.params.id },
		})}		
		const destroyedComment = await Comment.findAll({
			where: { userId: req.params.id },
		})
		if(destroyedComment){ Comment.destroy({
			where: { userId: req.params.id },
		})}
		if (!destroyedProfil) {
			throw new Error('Sorry,something gone wrong,please try again later');
		} else {
			res.status(200).json({ message: 'User has been deleted ' });
		}
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};

exports.updateProfile = async (req, res) => {
	try {
		const user = await User.update({imageUrl: `http://localhost:4200/${req.file.path}`},
				{where: { id: `${req.params.id}` }
			});
	
		res.status(200).json({id: req.params.id});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
