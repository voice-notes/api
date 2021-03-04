## Taped It - API

_Taped It_ allows you to send voice notes to your colleagues on [Slack](https://slack.com)

This is _Taped It_'s back end API, deployed via Heroku. You can visit the front-end [here](https://github.com/voice-notes/web/tree/master).

## Getting started

```
git clone https://github.com/voice-notes/api.git
npm install
npm start
```

Visit http://localhost:4000/graphql in your browser to interact with your local database!

<img src="https://i.ibb.co/xmGD2Sx/Screenshot-2021-03-04-at-15-10-56.png">

## Testing

```
npm run cy:open
```

## Technologies

| Usage               | Technology             |
| ------------------- | ---------------------- |
| Languages:          | TypeScript, JavaScript |
| Server Environment: | Node.js                |
| Server:             | Apollo Server, Express |
| Database:           | MongoDB, Mongoose      |
| Query Language:     | GraphQL                |
| Testing:            | Cypress                |

## Flow diagram  

<img src="https://i.ibb.co/3dbCBsk/Taped-It-Frame-1.jpg">
