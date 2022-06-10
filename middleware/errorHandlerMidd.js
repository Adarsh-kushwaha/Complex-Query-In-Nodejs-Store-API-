const errorHandlerMidd = (err, req, res, next) => {
    console.log(err);
    res.status(500).json({ msg: "something went wrong" })
}

module.exports = errorHandlerMidd;