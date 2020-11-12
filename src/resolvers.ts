import { Note, INote } from './models/note'
import { User, IUser } from './models/user'
import { response } from 'express'

function createNote(sender: IUser[], receiver: IUser[], status: string, url: string){
  if(sender[0]._id != null && receiver[0]._id != null){
    return new Note({sender: sender[0]._id, receiver: receiver[0]._id, status, url}).save()
  }
} 

export default {
  Query: {
    notes: () => Note.find(),
    users: () => User.find(),
    test: () => "Hello Slack",
  },

  Mutation: {
    createNote: async(_:string, args:INote) => {
      const {sender, receiver, status, url} = args
      console.log("sender")
      console.log("Receiver")
  
      const dbSender= await User.find({slackID: sender})
      const dbReceiver = await User.find({slackID: receiver})

      const note = createNote(dbSender, dbReceiver, status, url)

      return note
    },
    createUser: (_:string, {slackID}:IUser) => {
      const senderNotes: Array<string> = [] 
      const receiverNotes: Array<string> = []
      const user = new User({slackID, senderNotes, receiverNotes});
      return user.save()
    }
  }
}

// senderNotes: [ID]
// receiverNotes: [ID]


// 
