const { Permission, UserPermission } = require('../db/db');


class PermissionService {

    getAssignedPermissions(req, res) {
        const userId = req.params.user;
        UserPermission.findAll({
            where: {
                id: userId
            }
        }).then(permissions => {
            res.status(200).json(permissions)
        }).catch(err => {
            res.status(500).json(err)
        })
    }

    getAllPermissions(req, res) {
        Permission.findAll()
            .then(permissions => {
                res.status(200).json(permissions)
            }).catch(err => {
                res.status(500).json(err)
            })
    }

    assignePermission(req, res) {
        const permissionData = req.body;
        UserPermission.create(permissionData).then(() => {
            res.status(200).json(true)
        }).catch(err =>
            res.status(500).json(err)
        );
    }

    unassignePermission(req, res) {
        const userId = req.params.user;
        const permission = req.params.permission;
        UserPermission.destroy({
            where: {
                id: userId,
                code: permission
            }
        }).then(() => {
            res.status(200).json(true)
        }).catch(err =>
            res.status(500).json(err)
        );
    }

}

module.exports = PermissionService;