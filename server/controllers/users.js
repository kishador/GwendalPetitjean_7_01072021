const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../models");
const User = models.users
const maxAge = 3 * 24 * 60 * 60 * 1000;

exports.signup = async (req, res) =>{
    try {

        const hashedPassword = await bcrypt.hash(req.body.password, 8);

         const emailExist = await User.findOne({
			 attributes: ["email"],
			  where : { email: req.body.email }
			})
        if ( emailExist ) {
            return res.status(401).send({ error: "Adresse email deja existante !"})
        } 

        await User.create({
            ...req.body,
            password: hashedPassword
        })
        res.status(201).send({ user: User.id })
        
    } catch (err) {
        res.status(500).send('Something went wrong')
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

           const token = jwt.sign({id}, "jwtSecret",{
               expiresIn: maxAge,
           })
               res.status(200).json({ user: user.id, userToken: token})
            }
            else {
                res.status(200).json({ passwordErrors: "Mot de passe incorrect !"})
            }
        }
        else {
            res.status(200).json({ emailErrors: "Utilisateur introuvable avec cette adresse email !"}) 
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

		// post
		const destroyedProfil = await User.destroy({
			where: { id: req.params.id },
		});

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
	console.log(req.data)
	console.log(req.params.id)
	try {
		const userToFind = await User.findOne({

			where: { id: req.params.id }
		});

		if (!userToFind) {
			throw new Error("Sorry,we can't find your account");
		}

		const userToUpdate = await User.update(
			{

			},
			{
				where: { id: req.user.id }
			}
		);

		if (!userToUpdate) {
			throw new Error("Sorry,something gone wrong,please try again later");
		}
		res.status(200).json({
			user: userToUpdate.isAdmin,
			message: "Your account has been update"
		});

		if (!userToUpdate) {
			throw new Error("Sorry,we can't update your account");
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
