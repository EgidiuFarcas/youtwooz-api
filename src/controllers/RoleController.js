import RoleModel from '../models/RoleModel.js';


class RoleController {

    static async get(req, res){
        if(!req.body.roleID) return res.status(400).send("Missing role ID");
        let role = await RoleModel.existsID(req.body.roleID);
        if(role === false) return res.status(400).send("Role ID doesnt match any value.");
        res.send({id: role._id, name: role.name, color: role.color});
    }

    static async getAll(req, res){
        let roles = await RoleModel.getAll();
        let formattedRoles = [];
        for(let i = 0; i < roles.length; i++){
            formattedRoles[i] = {
                id: roles[i]._id,
                name: roles[i].name,
                color: roles[i].color
            }
        }
        res.send(formattedRoles);
    }

    static async new(req, res){
        if(!req.body.roleName) return res.status(400).send("Missing role name");
        if(!req.body.roleColor) return res.status(400).send("Missing role color");
        let role = await RoleModel.create(req.body.roleName, req.body.roleColor);
        res.send({id: role._id, name: role.name, color: role.color});
    }

    static async delete(req, res){
        if(!req.body.roleID) return res.status(400).send("Missing role ID");
        let role = await RoleModel.existsID(req.body.roleID);
        if(role === false) return res.status(400).send("Role ID doesnt match any value.");
        await RoleModel.delete(role._id);
        res.send("Role deleted");
    }

}

export default RoleController;