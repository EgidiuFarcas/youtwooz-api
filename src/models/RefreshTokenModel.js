import RefreshToken from '../database/RefreshToken.js';

export default class RefreshTokenModel {

    static async create(token){
        let refreshToken = new RefreshToken({
            token: token,
        });
        return await refreshToken.save();
    }

    static async exists(token){
        let refreshToken = await RefreshToken.findOne({token: token});
        if(!refreshToken) return false;
        return true;
    }

    static async delete(token){
        return await RefreshToken.findOneAndDelete({token: token});
    }

}