const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const eventEmitter = require('./eventEmitter');

module.exports = () => {
    eventEmitter.on('send_email', (emailData) => {
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,   // For Gmail: smtp.gmail.com
            port: process.env.EMAIL_PORT,   // For Gmail: 587
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        if (emailData.template) {
            transporter.use('compile', hbs({
                viewEngine: {
                    extName: '.hbs',
                    partialsDir: 'src/api/v1/scripts/templates/email',
                    defaultLayout: false,
                },
                viewPath: 'src/api/v1/scripts/templates/email',
                extName: '.hbs'
            }));
        }

        transporter.sendMail({
            from: process.env.EMAIL_USER,
            ...emailData
        });
    });
};