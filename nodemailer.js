// const nodemailer = require('nodemailer');
// const cron = require('cron');

const nodemailer = require('nodemailer');
const cron = require('node-cron');



    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "c3d9bd7abb3801",
          pass: "d5d27c2112a990"
        }
      });




    // host: "sandbox.smtp.mailtrap.io",
    // port: 2525,
    // auth: {
    //   user: "0073230ba8a449",
    //   pass: "d68ed3e8d1fa61"
    // }


let mailOptions = {
    from: 'my7899831@gmail.com' ,
    to: 'muskanvishwakarma325@gmail.com',
    subject: 'happy birthday wishes',
    text: `Happy birth muskan `,
}

transport.sendMail(mailOptions, (err, info) => {
    if(err){
        console.log(err);
    }else
    {
     console.log("send mail successful", info.response)
    } 
})

//cron job is a third party module it is used to set task sedule
cron.schedule('* * * * *', () => {
    console.log('running a cron ');
  }
);

module.exports = transport;