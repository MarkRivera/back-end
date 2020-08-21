const hashedPassword =
  "$2a$12$3tkn15IgKBdrGEgEalEZVeBIgerSmWbQ1iO9YAT0H128MlGPH/vlW";

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        {
          email: "Joker@Phantom.com",
          password: hashedPassword,
          isGovernmentOfficial: false,
          zip_id: 1,
        },
      ]);
    });
};
