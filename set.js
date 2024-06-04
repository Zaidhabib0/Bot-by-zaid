const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUxlYWN6ZnZZN1YrSzRJblcxV1FXdFdNSjdKNzNPdEFkOVpYNStENU9HZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUWovQzU0bVMybEo5NmU2WGtIcU1CcG82ek9ZaGlDUDk0R01ZdVM2MCtqZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRR2d3UUlMbjE3aVlrbGlDVmNGa3JWNUhCUHIyMDRucEhzVFFCeXZFVVZZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrQm94QlhxYjVGdFVJOG1USUVGZ3djU0N5VzB5WnR2QXJhQS9TR05VOXc4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFOMEF4dnFQTlBRdDVKcW5YRll5dzNrMnJMRnh2OUwxc25NeUxCaTRMV3M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktzZWkrU3BpbTNPSGVERlJWS2VTSzNlSkZKTTdBVkZvYlJGZnhXSkQ4dzA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUVWNm0vd3pkUXJuV3E0azBiVFUwLzJjT1gvZmpYSmtUZDZrVG9pOUwyND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidWMvOVFtZFFzbkl4dHlGSWNLRjZqUGdncXZxTXpFcEdBL1pNZ0VPRDZsND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRRYVVUbzlTamo4U0d4dHpCZ3RUMjhmby9ZUllOeXdtbXd0SnFkdVJjeHdUWmNqR09tUnJCSDdvVnFBWDY3TFdWRUFUVlBaVHQxbzFLWDI0TnowT0RRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTY2LCJhZHZTZWNyZXRLZXkiOiJaakQrV1RyS01lMWpNeWptUWY4bk15V2Z2T3EzUFlrWXBreE8zSGcrdzFZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkyMzMwNTM0ODcyOEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIyM0I0MDBFOThERDk4RjY0RUU3QjcyN0Q5QjNCMzdDNCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzE3NTMyNzMzfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJQZzlZUjdsZVRYS0JUU2pRM3BTVUVBIiwicGhvbmVJZCI6IjY3OWU1OWI5LWZkNGYtNGFlMi05YmIyLWFlMmFkMjAzZjg1ZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYaFl2cGd0YmRIV09WcENvZy9sNkZlM2l2dFE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK05RblUwc3duSzB1N3lKYWlGUFlWODFWblVnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkRYNUdGVkwzIiwibWUiOnsiaWQiOiI5MjMzMDUzNDg3Mjg6MThAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQk9UIEJZIFpBSUTwn6aFIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMTzYrWUVCRUszdy9iSUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJsOVpDWUtUN2FhREZMdmFUSGJxaWpRSDdYbkhpSC8xVTd3NmwvbnR4bjJ3PSIsImFjY291bnRTaWduYXR1cmUiOiI3d2JxaEErMnJvRkR3bWY0bStPM3p6RWdBUXFNZ1ZieTk1SmpPdmxkR3M3cmZOeTloRWh6dHhaNEZocnJDVlZ4YnRMNHpvbFU2ZG5qVlZ6NXN0TnFDUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoicml5VTJxblo0NXFWTWliYTA4MjgzZy9XZzhFeTJwUUhhQ3JuMTBobkJndFpPR2xRR085ZnRKZldXbnpuL0Jpa0ZaYWZuOFA4V21NakFUVFhPWVFMQnc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MjMzMDUzNDg3Mjg6MThAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWmZXUW1DaysybWd4Uzcya3gyNm9vMEIrMTV4NGgvOVZPOE9wZjU3Y1o5cyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxNzUzMjczMCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFQVm4ifQ==',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Zaid Habib🦅",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "923498279596", 
             
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
CHATBOT: process.env.CHAT_BOT || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
