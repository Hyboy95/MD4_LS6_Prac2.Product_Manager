import { Product } from "../models/schemas/product.model";

export class ProductController {
    static async getCreatepage(req:any, res: any) {
        res.render("createProduct");
    }

    static async addNewProduct(req:any, res:any) {
        try {
            const productNew = new Product(req.body);
            const product = await productNew.save();
            if (product) {
                res.redirect('/product/list');
            } else res.render("error");
        } catch(err) {
            res.render("error");
        }
    }

    static async getListProduct(req:any, res:any) {
        try {
            const products = await Product.find();
            res.render("listProduct", {products: products});
        } catch(err) {
            res.render('error');
        }
    }
}