const nodemail = require("nodemailer")
require('dotenv').config()

const html = `
    <h1>Hello There</h1>
    <p>You have been invited to join a workspace</p>
`;

async function main() {
    const transporter = nodemailer.createTransporter({
        host: 'mail.open.javascript.info',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.APP_Pwd
        }
    })
}