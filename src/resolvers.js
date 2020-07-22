const data = require("./data");

module.exports = {
  Query: {
    notes: () => data.notes,
    users: () => data.users,
  }
}
