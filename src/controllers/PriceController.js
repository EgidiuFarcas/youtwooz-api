import PriceModel from '../models/PriceModel.js';


class PriceController {

    static async get(req, res){
        if(!req.body.priceID) return res.status(400).send("Missing price ID");
        let price = await PriceModel.existsID(req.body.priceID);
        if(price === false) return res.status(400).send("Price ID doesnt match any value.");
        res.send({id: price._id, value: price.amount});
    }

    static async getAll(req, res){
        let prices = await PriceModel.getAll();
        let formattedPrices = [];
        for(let i = 0; i < prices.length; i++){
            formattedPrices[i] = {
                id: prices[i]._id,
                amount: prices[i].amount
            }
        }
        res.send(formattedPrices);
    }

    static async new(req, res){
        if(!req.body.priceAmount) return res.status(400).send("Missing price Amount");
        let price = await PriceModel.create(req.body.priceAmount);
        res.send({id: price._id, amount: price.amount});
    }

    static async delete(req, res){
        if(!req.body.priceID) return res.status(400).send("Missing price ID");
        let price = await PriceModel.existsID(req.body.priceID);
        if(price === false) return res.status(400).send("Price ID doesnt match any value.");
        await PriceModel.delete(price._id);
        res.send("Price deleted");
    }

}

export default PriceController;