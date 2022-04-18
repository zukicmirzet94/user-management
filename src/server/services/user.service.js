const { User } = require('../db/db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


class UserService {

    getUsers(req, res) {
        const filteringData = req.body;
        User.findAndCountAll({
            offset: filteringData.offset,
            limit: filteringData.limit,
            where: {
                [Op.or]: [
                    { firstName: { [Op.like]: '%' + filteringData.like + '%' } },
                    { lastName: { [Op.like]: '%' + filteringData.like + '%' } },
                    { username: { [Op.like]: '%' + filteringData.like + '%' } },
                    { email: { [Op.like]: '%' + filteringData.like + '%' } }
                ]
            }
        }).then(users => {
            res.status(200).json(users);
        }).catch(err => {
            res.status(500).json(err);
        })
    }

    getUser(req, res) {
        const userId = req.params.user;
        User.findOne({
            where: {
                id: userId
            }
        }).then(user => {
            res.status(200).json(user);
        }).catch(err => {
            res.status(500).json(err);
        })
    }

    editUser(req, res) {
        const userData = req.body;
        User.update(
            {
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                status: userData.status
            },
            {
                where: {
                    id: userData.id
                },
            }).then(user => {
                res.status(200).json(true);
            }).catch(err => {
                res.status(500).json(err);
            })
    }

    deleteUser(req, res) {
        const userId = req.params.user;
        User.destroy({
            where: {
                id: userId
            }
        }).then(() => {
            res.status(200).json(true);
        }).catch(err => {
            res.status(500).json(err);
        })
    }

    createUser(req, res) {
        const userData = req.body;
        User.create(userData).then(() => {
            res.status(200).json(true);
        }).catch(err => {
            res.status(500).json(err);
        });
    }

}

module.exports = UserService;