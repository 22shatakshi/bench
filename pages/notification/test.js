var nodemailer = require('nodemailer')

let mailTransporter = nodemailer.createTransporter({
    service: "gmail",
    auth:{
        user: "team23project@gmail.com",
        pass: "cs307team23"
    }
})

let details = {
    from: "team23project@gmail.com",
    to: "team23project@gmail.com",
    subject: "Notification",
    text:"testing"
}

mailTransporter.sendMail(details, function(err,info) {
    if (err){
        console.log("has an error", err)
        return;
    } else {
        console.log("email sent")
        console.log(info.response)
    }
    console.log("done")
});