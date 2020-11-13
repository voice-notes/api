export const USERS_QUERY = 
`{
	users{
		slackID
		senderNotes
		receiverNotes
	}
}`;

export const ADD_NOTE_MUTATION = 
`mutation {
	createNote(sender:"TestSender", receiver:"TestReceiver", status:"RECORDED", url:"TEST"){
		receiverSlackID
		senderSlackID
		status
		url
	}
}`;