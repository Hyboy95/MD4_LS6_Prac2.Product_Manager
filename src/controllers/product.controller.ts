import { Product } from "../models/schemas/product.model";

export class ProductController {
    static async getCreatepage(req:any, res: any) {
        res.render("createProduct");
    }

    static async addNewProduct(req:any, res:any) {
        try {
            let {name, price, producer} = req.body;
            let avatarUrl = '/upload/avatar.jpg';
            if (req.files) {
                let avatar = req.files.avatar;
                avatar.mv('./public/upload/' + avatar.name);
                avatarUrl = '/upload/' + avatar.name;
            }
            const productNew = new Product({name: name, price: price, producer: producer, avatar: avatarUrl});
            const product = await productNew.save();
            if (product) {
                res.redirect('/');
            } else res.render("error");
        } catch(err) {
            res.render("error");
        }
    }

    static async getListProduct(req:any, res:any) {
        try {
            let size = 3;
            if (req.body.size) {
                size = +req.body.size;
            } else if (req.query.limit) {
                size = +req.query.limit;
            }
            let page = req.query.page ? +req.query.page : 1;
            const productList = await Product.find();
            let totalPage = Math.ceil(productList.length / size);
            let offset = (page - 1) * size;
            const products = await Product.find().limit(size).skip(offset);;
            res.render("listProduct", {products: products, totalPage: totalPage, pageCurrent: page, limit: size, totalItem: productList.length});
        } catch(err) {
            res.render('error');
        }
    }
}