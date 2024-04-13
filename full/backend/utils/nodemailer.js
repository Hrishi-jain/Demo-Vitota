const nodemailer = require("nodemailer")
const ErrorHandler = require("./ErrorHandler")
exports.sendmail = (req, res, next) => {
    const transport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: process.env.MAIL_EMAIL_ADDRESS,
            pass: process.env.MAIL_PASSWORD,
        },
    })

    const autoResponse = {
        subject: "Confirmation: Your message has been received",
        body: `
            <p>Hello,</p>
            <p>Thank you for your message. Your message has been received, and we will get back to you shortly.</p>
            <p>Please note that your message will be processed according to the following procedure:</p>
            <ul>
                <li>We will read and understand your message.</li>
                <li>We will make every effort to provide you with a solution as soon as possible.</li>
            </ul>
            <p>If you need immediate assistance, please contact us:</p>
            <p>Prashant Private Limited</p>
            <p>Email: example@example.com</p>
            <p>Phone: 123-456-7890</p>
            <p>Thank you,</p>
            <p>Prashant Private Limited Team</p>
        `
    };

    const mailOption = {
        from: "prashant private limited",
        to: req.body.email,
        subject: autoResponse.subject,
        html:autoResponse.body
    }

    transport.sendMail(mailOption, (err, info) => {
        if (err) return next(new ErrorHandler(err, 500));
        console.log(info);
        return res.status(200).json({
            message: "mail sent sucessfully"
        })
    })
}
