class APIFeatures {
    constructor(query, queryString) {
        this.query = query; // The Mongoose query (e.g., Product.find())
        this.queryString = queryString; // The URL params (req.query)
    }

    filter() {
        // 1) Simple Filtering
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
        excludedFields.forEach(el => delete queryObj[el]);

        // 2) Advanced Filtering (Greater than, Less than)
        // Converts { price: { gte: '50' } } -> { price: { $gte: '50' } }
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));

        // 3) Keyword Search (The "Search" feature)
        if (this.queryString.search) {
            const keyword = {
                name: {
                    $regex: this.queryString.search,
                    $options: 'i', // Case-insensitive
                }
            };
            this.query = this.query.find({ ...keyword });
        }

        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt'); // Default: newest first
        }
        return this;
    }

    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 10;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

module.exports = APIFeatures;