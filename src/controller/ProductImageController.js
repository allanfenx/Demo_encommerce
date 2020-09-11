const ProductImage = require('../models/ProductImage');
const Product = require('../models/Product');
const connection = require('../database/connection');
const fs_unlink = require('../config/fs_unlink');


class ProductImageController {

    async store(req, res) {

        const { name } = req.body;

        const { originalname: name_image, filename: key_name } = req.file;

        var product = await Product.findOne({
            where: { name },
            include: { association: "productimage", attributes: ["product_id"] }
        });

        if (!product) {
            fs_unlink(key_name);
            return res.status(400).send({ erro: "Produto não encontrado" });
        }

        if (product.productimage.length > 3) {
            fs_unlink(key_name);
            return res.status(405).send({ erro: "Permitido apenas quatro imagem por produto" });
        }

        const trx = await connection.transaction();

        try {

            product = await ProductImage.create({ name_image, key_name, product_id: product.id });

            await trx.commit();

            return res.send({ product });
        } catch (error) {

            await trx.rollback();

            return res.status(400).send({ erro: "Houve um erro ao fazer upload" });
        }
    }

    async destroy(req, res) {

        const { id } = req.body;

        const image = await ProductImage.findByPk(id);

        if (!image) return res.status(400).send({ erro: "Imagem não encontrada" });

        const trx = await connection.transaction();

        try {

            await image.destroy();

            await trx.commit();

            fs_unlink(image.key_name);

            return res.send();
        } catch (error) {

            await trx.rollback();

            return res.status(400).send({ erro: "Houve um erro ao excluir imagem" })
        }
    }

}

module.exports = new ProductImageController();