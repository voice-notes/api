import { notes, users } from "./data";

export default {
  Query: {
    notes: () => notes,
    users: () => users,
  }
}
