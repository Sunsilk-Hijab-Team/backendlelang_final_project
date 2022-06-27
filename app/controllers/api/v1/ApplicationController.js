class ApplicationController{

    handleGetRoot = (req, res) => {
        res.status(200).json({
            status: "OK",
            message: "Lelang App API is up and running!",
        });
    }

}
module.exports = ApplicationController;