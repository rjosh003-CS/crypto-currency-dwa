const nodemailer = require ("nodemailer");

const sendEmail = async(option) => {
    // Create a Transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth:{
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    let emailOptions = {
        from: `crypto-market<support@cyrpto-market.com>`,
        to: option.email,
        subject: option.subject,
        text: option.message
    };

    // Send the email
    transporter.sendMail(emailOptions);
};

module.exports = sendEmail;