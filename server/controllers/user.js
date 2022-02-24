import User from '../models/user.js'
import Post from '../models/post.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import fs from 'fs'

const signup = async (req, res) =>{
    try {
        const userObject = JSON.parse(req.body.user)
        const hashedPassword = await bcrypt.hash(userObject.password, 8);

         const emailExist = await User.findOne({ where : {
            email: userObject.email
        }})
        if ( emailExist ) {
            return res.status(401).send({ error: "Adresse email deja existante !"})
        } 

        await User.create({
            username: userObject.username,
            email: userObject.email,
            password: hashedPassword,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        })
        res.status(201).send({ message: 'L\'utilisateur à été créé' })
    } catch (err) {
        res.status(500).send('Something went wrong')
    }
}
const login = async (req, res) =>{
    try {
        const user = await User.findOne({ where: {
            email: req.body.email
        }})

        if (!user) {
            return res.status(404).send({ error: "Utilisateur introuvable avec cette adresse email !"})
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isMatch) {
            return res.status(401).send({ error: "Mot de passe incorrecte !"})
        }

        const token = jwt.sign({ id: user.id}, 'SECRET_KEY', { expiresIn: '24h' })
        res.status(200).send({ userId: user.id, token })
    } catch (err) {
        res.status(500).send(err)
    }
}
const getUser = async (req, res) =>{
    try {
        const user = await User.findOne({ where: {
            id: req.user.id
        }})
        res.status(200).send(user)
    } catch (err) {
        res.status(500).send(err)
    }
}
const updateUser = async (req, res) =>{
    try {
        if (req.file) {
            const user = await User.findOne({ where: {
                id: req.user.id
            }})
            const filename = user.imageUrl.split('/images/')[1]
            fs.unlink(`images/${filename}`, (err) => {
                if (err) throw err;
                console.log('Image has been deleted')
            })
        }
        
        const userObject = req.file ? {
            ...JSON.parse(req.body.user),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {
           ...JSON.parse(req.body.user) 
        }
        
        if (userObject.password != '') {
            userObject.password = await bcrypt.hash(userObject.password, 8);
        }
        else {
            const user = await User.findOne({ where: {
                id: req.user.id
            }})
            console.log(user.Password)

            userObject.password = user.hashedPassword 
        }
        console.log(userObject.password)

        await User.update({ 
            ...userObject
        }, {
            where: {
                id: req.user.id
            }
        })
        if (userObject.imageUrl) {
            await Post.update({ 
                avatar: userObject.imageUrl
            }, {
                where: {
                    userId: req.user.id
                }
            })
        }

        res.status(200).send({ message: 'Profile has been updated !'})
    } catch (err) {
        res.status(500).send(err)
    }
}
const deleteUser = async (req, res) =>{
    try {
        const user = await User.findOne({ where: {
            id: req.user.id
        }})
        const filename = user.imageUrl.split('/images/')[1]
        fs.unlink(`images/${filename}`, () => {
            user.destroy()
        })
        const posts = await Post.findAll({ where: {
            userId: req.user.id
        }})
        posts.forEach(post => {
            const postFilename = post.imageUrl.split('/images/')[1]
            fs.unlink(`images/${postFilename}`, () => {
                post.destroy()
            })
        })
        await Like.destroy({ where: {
            userIdLiked: req.user.id
        }})
        await Comment.destroy({ where: {
            userId: req.user.id
        }})
        res.status(200).send({ message: 'deleted!'})
    } catch (err) {
        res.status(500).send(err)
    }
}

export { signup, getUser, login, updateUser, deleteUser }