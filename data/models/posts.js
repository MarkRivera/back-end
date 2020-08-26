const db = require("../db-config");

const getPosts = async () => {
  return await db("posts");
};

const getPostBy = async (filters) => {
  return await db("posts").where(filters).first();
};

const addPost = async (data) => {
  const postID = await db("posts").returning("id").insert(data);
  return await getPostBy({ id: postID[0] });
};

const updatePost = async (id, changes) => {
  const postUpdate = await db("posts")
    .where({ id })
    .update(changes, [
      "id",
      "issue",
      "description",
      "photo",
      "user_id",
      "zip_id",
    ]);

  return await postUpdate;
};

const remove = async (id) => {
  const post = await findOneBy({ id });
  const deleted = await db("posts").where({ id }).del();
  return post;
};

module.exports = {
  getPosts,
  getPostBy,
  addPost,
  updatePost,
  remove,
};
