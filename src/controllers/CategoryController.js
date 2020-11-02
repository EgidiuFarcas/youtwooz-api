import CategoryModel from '../models/CategoryModel.js';


class CategoryController {

    static async get(req, res){
        if(!req.body.categoryID) return res.status(400).send("Missing category ID");
        let category = await CategoryModel.existsID(req.body.categoryID);
        if(category === false) return res.status(400).send("Category ID doesnt match any value.");
        res.send({id: category._id, name: category.name});
    }

    static async getAll(req, res){
        let categories = await CategoryModel.getAll();
        let formattedCategories = [];
        for(let i = 0; i < categories.length; i++){
            formattedCategories[i] = {
                id: categories[i]._id,
                name: categories[i].name
            }
        }
        res.send(formattedCategories);
    }

    static async new(req, res){
        if(!req.body.categoryName) return res.status(400).send("Missing category name");
        let category = await CategoryModel.create(req.body.categoryName);
        res.send({id: category._id, name: category.name});
    }

    static async delete(req, res){
        if(!req.body.categoryID) return res.status(400).send("Missing category ID");
        let category = await CategoryModel.existsID(req.body.categoryID);
        if(category === false) return res.status(400).send("Category ID doesnt match any value.");
        await CategoryModel.delete(category._id);
        res.send("Category deleted");
    }

}

export default CategoryController;