const db = require("../db-config");

const getPosts = async () => {
    return await db("posts")
}

module.exports = {
    getPosts
}