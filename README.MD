## Getting Started

### Installation

1. install the dependencies using `npm install` or `npm i`

2. Rename the file `.env.example` to `.env`, then you need to configure the file `config.js` located in `src/config`

3. Start the app using `npm start`

4. Tes the app using `npm run test`

### Directory Structure

```
├── src
│   ├── api
|   |   ├── documents
│   │   │   ├── controller.js
│   │   │   ├── controller.test.js
│   │   │   └── route.js
│   │   └── index.js
│   ├── config
│   │   ├── config.js
│   └── index.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
├── uploads
└── uploadsnew
```

### Available routes

| Method | Resource                                  | Description                                                |
| :----- | :---------------------------------------- | :--------------------------------------------------------- |
|        |
| `POST` | `/documents/upload`                       | Send file in formdata                                      |
| `GET`  | `/documents/download/:filename/:filetype` | It returns the file that you are requested in your format. |
