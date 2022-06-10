const product = require('../models/products');

/////////////////////////////////////////////////
const productsTestRoute = (req, res) => {
    // throw new Error("testing async error")
    res.status(200).json({ msg: "testing route" })
}
//////////////////////////////////////////////////


//All quey logic here
const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, createdAt, fields, numericFilter } = req.query;
    const queryObject = {};

    if (featured) {
        queryObject.featured = featured === "true" ? true : false;
    }

    if (company) {
        queryObject.company = company;
    }

    if (name) {
        queryObject.name = { $regex: name, $options: "i" }
    }

    //numeric Filter
    if (numericFilter) {
        const operatorMap = {
            ">": "$gt",
            ">=": "$gte",
            "=": "$eq",
            "<": "$lt",
            "<=": "$lte"
        }

        const regEx = /\b(>|>=|=|<|<=)\b/g
        let filters = numericFilter.replace(regEx, (match) => `-${operatorMap[match]}-`);

        const options = ["price", "rating"]
        filters = filters.split(",").forEach((item) => {
            const [field, operator, value] = item.split("-")
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) }
            }
        })
    }

    let results = product.find(queryObject);

    //sorting
    if (sort) {
        const sortList = sort.split(",").join();
        results = results.sort(sortList)
    } else {
        results = results.sort(createdAt);
    }

    //selecting
    if (fields) {
        const fieldList = fields.split(",").join();
        results = results.select(fieldList);
    }

    //skipping and setting up limits
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    results = results.skip(skip).limit(limit);


    const products = await results;

    res.status(200).json({ products, hits: products.length })
}

module.exports = {
    productsTestRoute,
    getAllProducts
}