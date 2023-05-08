const nodemailer = require('nodemailer');

async function sendMail(email, link, title) {
    var mailTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "biopythonemail@gmail.com",
            pass: "sgxxvufmpbzekoxq"
        }
    })

    var details = {
        from: "TaskMate <biopythonemail@gmail.com>",
        to: email,
        subject: "Welcome to TaskMate",
        text: "Testing first Sender",
        html: `<h2>Welcome To TaskMate</h1> 
        <p>You have been invited to join the <i>${title}</i> workspace</p> 
        <p><a href = "${link}" >Click Here to Join</a></p>`
    }
    
    mailTransport.sendMail(details, (err)=>{
        if(err){
            console.log("It has an error", err)
        } else {
            console.log("email has been sent!")
        }
    })
}

module.exports = sendMail

// sendMail(email, "https://github.com/Okafor-Ifeanyi/TaskMate", "Scrum Week")