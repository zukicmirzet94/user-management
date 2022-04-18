module.exports = (app) => {
    const PermissionService = require('../services/permission.service');
    let permissionService = new PermissionService();
    var permissionRouter = require("express").Router();
  
    // Get All Permissions
    permissionRouter.get("/", permissionService.getAllPermissions);

    // Get Assigned Permissions
    permissionRouter.get("/assigned/:user", permissionService.getAssignedPermissions);
    
    // Assigne Permission
    permissionRouter.post("/assigne", permissionService.assignePermission);

    // Unassigne Permission
    permissionRouter.delete("/unassigne/:user/:permission", permissionService.unassignePermission);
  
    app.use('/api/v1/permission', permissionRouter);
  };