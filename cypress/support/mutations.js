export const ADD_NOTE = `mutation {
	createNote(sender:"TestSender", receiver:"TestReceiver", status:"RECORDED", url:"TEST"){
		status
		url
	}
}`;
