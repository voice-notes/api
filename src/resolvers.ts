import { Note, INote } from './models/note'
import { User, IUser } from './models/user'
import { response } from 'express'

function createNote(sender: IUser, receiver: IUser, status: string, url: string){
  if(sender._id != null && receiver._id != null){
    return new Note({
      sender: sender._id,
      receiver: receiver._id,
      senderSlackID: sender.slackID,
      receiverSlackID: receiver.slackID,
      status,
      url
    }).save()
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
  
      const dbSender = await User.findOne({slackID: sender})
      const dbReceiver = await User.findOne({slackID: receiver})

      if (dbSender != null && dbReceiver != null) {
        const note = await createNote(dbSender, dbReceiver, status, url)
        if (note != undefined) {
          dbSender.senderNotes.push(note._id)
          dbReceiver.receiverNotes.push(note._id)
          await dbSender.save()
          await dbReceiver.save()
        }
        return note
      }

    },
    createUser: (_:string, {slackID}:IUser) => {
      const senderNotes: Array<string> = [] 
      const receiverNotes: Array<string> = []
      const user = new User({slackID, senderNotes, receiverNotes});
      return user.save()
    }
  }
}
