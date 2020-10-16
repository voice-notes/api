import { Note, INote } from './models/note'
import { User, IUser } from './models/user'
import { response } from 'express'


export default {
  Query: {
    notes: () => Note.find(),
    users: () => User.find(),
    test: () => "Hello Slack",
  },

  Mutation: {
    createNote: (_:string, {sender, receiver, status, url}:INote) => {
      const slackTempID: Array<string> = [sender, receiver]

      User.find().where('slackID').in(slackTempID).exec((err, records) => {

        let senderMongoID = records[0]._id
        let receiverMongoID = records[1]._id

        console.log(`unicorn = ${records}`)
        //  "id": "5f89c01a5d0132364dc29e9c",
        console.log(`senderID = ${senderMongoID}`)
        console.log(`length = ${records.length}`)
        //  "id": "5f89c0275d0132364dc29e9d",
        console.log(`receiver = ${receiverMongoID}`)

        const note = new Note({sender: senderMongoID, receiver: receiverMongoID, status, url});
        return note.save()
      });
    },
    createUser: (_: string, { slackID }: IUser) => {
      const senderNotes: Array<string> = [];
      const receiverNotes: Array<string> = [];
      const user = new User({ slackID, senderNotes, receiverNotes });
      return user.save();
    },
  },
};

//We think for this to work, on createNote, the sender and receiver would need to be fished out of the
//DB before we create a new note, as the sender + receiver are mapped to MongoID not SlackID
