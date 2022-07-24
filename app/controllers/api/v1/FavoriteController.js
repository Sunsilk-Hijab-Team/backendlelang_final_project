const ApplicationController = require('./ApplicationController');
const { Users, Products, Categories, Images, Favorites } = require('../../../models');

class FavoriteController extends ApplicationController {
    // handleGetAllFavorite by user id login
    handleGetAllFavorite = async (req, res, next) => {
        // try {
        //     console.log("oiiiii", req.user)
        // }catch(error){
        //     console.log(error)
        // }
        try {
            // console.log("oiiiii"+req.user.id);
            const getFavorites = await Favorites.findAll({
                where: {
                    buyer_id: req.user.id
                },
                include: [
                    {
                        model: Products, as: 'favorite_product',
                        include: [
                            {
                                model: Categories, as: 'categories'
                            },
                            {
                                model: Images, as: 'images'
                            }
                        ]
                    },
                    {
                        model: Users, as: 'favorite_buyer',
                    },
                    {
                        model: Users, as: 'favorite_seller',
                    }
                ]
            });
            if(getFavorites == ""){
                res.status(204).json({
                    status: 'Success',
                    message: 'No content'
                });
                return;
            }
            res.status(200).json({
                status: 'Success',
                Favorites: getFavorites
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Something went wrong'
            })
        }
    }

    // handleAddFavorite insert to tabel favorite
    handleAddFavorite = async (req, res, next) => {
        try{
            const favorite_buyer=req.user.id;
            const favorite_product=req.body.product_id;
            const favorite_seller=req.body.seller_id;

            const addFavorite = await Favorites.create({
                buyer_id:favorite_buyer,
                id_product:favorite_product,
                seller_id:favorite_seller
            });
            res.status(201).json({
                status: 'Success',
                data: {
                    favorite: addFavorite
                }
            })

        }catch(error){
            res.status(500).json({
                error: error.message,
                message: 'Something went wrong'
            })
        }
    }

    // handleDeleteFavorite delete from tabel favorite
    handleDeleteFavorite = async (req, res, next) => {
        try{
            const id=req.params.id;
            const deleteFavorite = await Favorites.destroy({
                where: {
                    id: id,
                    buyer_id: req.user.id,
                }
            });
            res.status(200).json({
                status: 'Success',
                data: {
                    favorite: deleteFavorite
                }
            })
        }catch(error){
            res.status(500).json({
                error: error.message,
                message: 'Something went wrong'
            })
        }
    }
    // handleGetAllFavoriteByUserId get all favorite by user id
    handleGetAllFavoriteByUserId = async (req, res, next) => {
        try {
            const getFavorites = await Users.findAll({
                where: {
                    favorite_buyer: req.user.id
                },
                include: [
                    {
                        model: Products, as: 'favorite_product',
                        include: [
                            {
                                model: Categories, as: 'categories'
                            },
                            {
                                model: Images, as: 'images'
                            }
                        ]
                    },
                    {
                        model: Users, as: 'favorite_buyer',
                    },
                    {
                        model: Users, as: 'favorite_seller',
                    }
                ]
            });
            if(getFavorites == ""){
                res.status(204).json({
                    status: 'Success',
                    message: 'No content'
                });
                return;
            }
            res.status(200).json({
                status: 'Success',
                Favorites: getFavorites
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Something went wrong'
            })
        }
    } 
}
module.exports= FavoriteController;