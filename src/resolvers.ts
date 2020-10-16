import { Note, INote } from './models/note'
import { User, IUser } from './models/user'
import { response } from 'express'


export default {
  Query: {
    notes: () => Note.find(),
    users: () => User.find(),
  },

  Mutation: {
    createNote: (_:string, {sender, receiver, status, url}:INote) => {

      let p = new Promise((resolve, reject) =>{

        const slackTempID: Array<string> = [sender]

        User.find().where('slackID').in(slackTempID).exec((err, records) => {
          
          if(err){
            reject(err)
          } else {
            if(records.length){
            
              let senderMongoID = records[0]._id
  
              console.log(`unicorn = ${records}`)
              console.log(`senderID = ${senderMongoID}`)

              const note = new Note({sender, receiver, status, url});
              return note.save()
            } else {
              resolve(null)
            }
          }



          // let receiverID = "5f3e92d4fc80444d56f7c562"
          // let senderMongoID = records._id
  
          // console.log(`unicorn = ${records}`)
          // console.log(`senderID = ${senderMongoID}`)
          

  
        });
      }) 
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
