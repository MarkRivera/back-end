exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("posts").then(function () {
    // Inserts seed entries
    return knex("posts").insert([
      {
        issue: "Pot Hole",
        description: "There's a big hole in the middle of main street",
        zip_id: 1,
        user_id: 1,
      },
      {
        id: 2,
        issue: "Broken Sign",
        description: "Stop sign fallen over on the street",
        user_id: 2,
        zip_id: 2,
      },
      {
        id: 3,
        issue: "Pot Hole",
        description: "I made the hole digging for gold.",
        user_id: 1,
        zip_id: 1,
      },
    ]);
  });
};
