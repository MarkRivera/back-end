exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("posts")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("posts").insert([
        {
          description: "There's a big hole in the middle of main street",
          id: 1,
          issue: "Pot Hole",
          user_id: 39,
          zip_id: 1,
        },
        // {
        //   id: 2,
        //   issue: "Broken Sign",
        //   description: "Stop sign fallen over on the street",
        //   user_id: 40,
        //   zip_id: 2,
        // },
        // {
        //   id: 3,
        //   issue: "Pot Hole",
        //   description: "I made the hole digging for gold.",
        //   user_id: 39,
        //   zip_id: 3,
        // },
      ]);
    });
};
