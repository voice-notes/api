  export const notes = [
    {
      id: 0,
      sender: 0,
      receiver: 1,
      status: 'DRAFT',
      url: 'https://freesound.org/people/PaintingAir/sounds/527601/',
    },
    {
      id: 1,
      sender: 1,
      receiver: 2,
      status: 'RECORDED',
      url: 'https://freesound.org/people/sholden/sounds/525062/',
    },
    {
      id: 2,
      sender: 2,
      receiver: 0,
      status: 'LISTENED',
      url: 'https://freesound.org/people/Robinhood76/sounds/527203/',
    },
  ];

  export const users = [
    {
      id: 0,
      slackID: 'karla',
      senderNotes: [0],
      receiverNotes: [2],
    },
    {
      id: 1,
      slackID: 'alexa',
      senderNotes: [1],
      receiverNotes: [0],
    },
    {
      id: 2,
      slackID: 'ben',
      senderNotes: [2],
      receiverNotes: [1],
    }
  ];


