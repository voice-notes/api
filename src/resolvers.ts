import data from "./data";

export default {
  Query: {
    notes: () => data.notes,
    users: () => data.users,
  }
}
