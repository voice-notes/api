export const ADD_NOTE = `mutation {
	createNote(slackID:"TestSender", audioUrl:"Hello, World!", responseUrl:"TEST"){
		slackID
		audioUrl
	}
}`;
