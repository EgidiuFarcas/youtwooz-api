import Role from '../database/Role.js';

export default class RoleModel {

    static async create(name, color){
        let roleModel = new Role({
            name: name,
            color: color
        });
        return await roleModel.save();
    }

    static async getAll(){
        return await Role.find();
    }

    static async existsName(name){
        let roleModel = await Role.findOne({name: name});
        if(!roleModel) return false;
        return roleModel;
    }

    static async existsID(id){
        let roleModel = await Role.findOne({_id: id});
        if(!roleModel) return false;
        return roleModel;
    }

    static async delete(id){
        return await Role.findOneAndDelete({_id: id});
    }

}