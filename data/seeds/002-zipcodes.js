exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("zipcodes")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("zipcodes").insert([
        { id: 1, zipCode: "24051" },
        { id: 2, zipCode: "51001" },
        { id: 3, zipCode: "94785" },
        { id: 4, zipCode: "50005" },
      ]);
    });
};
