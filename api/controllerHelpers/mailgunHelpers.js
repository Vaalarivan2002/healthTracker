import Mailgun from "mailgun-js";

export const initiateMailgunObject = () => {
    const mg = Mailgun({apiKey: process.env.MAILGUN_KEY, domain: process.env.MAILGUN_DOMAIN});
    return mg;
}

export const sendRegistrationConfirmationMail = async (email, token) => {
    const data = {
        from: 'pvaalarivan@gmail.com',
        to: email,
        subject: 'Account Activation Link',
        html: `
        <h2>Please click on given link to activate your account</h2>
        <a href="${process.env.CLIENT_URL}/authentication/activate/${token}">${process.env.CLIENT_URL}/authentication/activate/${token}</a>
        `
    };  
    const res1 = await mg.messages().send(data);
    return res1;
}

export const sendForgotPasswordMail = async (email, token) => {
    const data = {
        from: 'pvaalarivan@gmail.com',
        to: email,
        subject: 'Account Activation Link',
        html: `
        <h2>Please click on given link to reset your password</h2>
        <a href="${process.env.CLIENT_URL}/new-password/${token}">${process.env.CLIENT_URL}/new-password${token}</a>
        `
    };  
    await mg.messages().send(data);
}