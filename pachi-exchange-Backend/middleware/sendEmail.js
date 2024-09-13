import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const CLIENT_ID = process.env.CLIENT_IDS;
const CLIENT_SECRET = process.env.CLIENT_SECRETS;
const REDIRECT_URI = process.env.REDIRECT_URIS;
const REFRESH_TOKEN = process.env.REFRESH_TOKENS;
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendEmail = async (emailAddress, subject, link) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
      const transporter = nodemailer.createTransport({
      service: "gmail",
      host: process.env.HOST,
      port: 587,
      secure: false,
      auth: {
        type: 'OAuth2',
        user: process.env.USER,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
        },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const output = await transporter.sendMail({
      from: process.env.USER,
      to: emailAddress,
      subject: subject,
      html: `<!DOCTYPE html>
      <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
      <head>
      <title></title>
      <meta charset="utf-8"/>
      <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
      <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
      <!--[if !mso]><!-->
      <link href="https://fonts.googleapis.com/css?family=Bitter" rel="stylesheet" type="text/css"/>
      <link href="https://fonts.googleapis.com/css?family=Cormorant+Garamond" rel="stylesheet" type="text/css"/>
      <link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" type="text/css"/>
      <link href="https://fonts.googleapis.com/css?family=Droid+Serif" rel="stylesheet" type="text/css"/>
      <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css"/>
      <link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet" type="text/css"/>
      <!--<![endif]-->
      <style>
          * {
            box-sizing: border-box;
          }
      
          body {
            margin: 0;
            padding: 0;
          }
      
          /*th.column{
        padding:0
      }*/
      
          a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
          }
      
          #MessageViewBody a {
            color: inherit;
            text-decoration: none;
          }
      
          p {
            line-height: inherit
          }
      
          @media (max-width:670px) {
            .icons-inner {
              text-align: center;
            }
      
            .icons-inner td {
              margin: 0 auto;
            }
      
            .row-content {
              width: 100% !important;
            }
      
            .stack .column {
              width: 100%;
              display: block;
            }
          }
        </style>
      </head>
      <body style="background-color: #fff; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
      <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff;" width="100%">
      <tbody>
      <tr>
      <td>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #3fa2f7;" width="100%">      
      <tbody>
      <tr>
      <td>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000;" width="650">
      <tbody>
      <tr>
      <td class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 20px; padding-bottom: 15px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
      <table border="0" cellpadding="0" cellspacing="0" class="empty_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
      <tr>
      <td>
      <div></div>
      </td>
      </tr>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
      <tbody>
      <tr>
      <td>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000;" width="650">
      <tbody>
      <tr>
      <td class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
      <table border="0" cellpadding="0" cellspacing="0" class="heading_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
      <tr>
      <td style="padding-bottom:10px;text-align:center;width:100%;padding-top:60px;">
      <div align="center" style="line-height:10px"><img alt="Wrong Password Animation" src="https://www.pachiplus.com/hs-fs/hubfs/pachi+_logo.png?width=1500&height=869&name=pachi+_logo.png" style="display: block; height: auto; border: 0; width: 200px; max-width: 100%; margin-bottom: 20px;" title="Pachi+ logo" width="200"/></div>
      <h1 style="margin: 0; color: #297fca; direction: ltr; font-family: 'Roboto Slab', Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 30px; font-weight: normal; letter-spacing: 2px; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 10px;"><strong>FORGOT YOUR PASSWORD?</strong></h1>
      </td>
      </tr>
      </table>
      <table border="0" cellpadding="0" cellspacing="0" class="image_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
      <tr>
      <td style="width:100%;padding-right:0px;padding-left:0px;">
      <div align="center" style="line-height:10px"><img alt="Wrong Password Animation" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/3856/GIF_password.gif" style="display: block; height: auto; border: 0; width: 500px; max-width: 100%;" title="Wrong Password Animation" width="500"/></div>
      </td>
      </tr>
      </table>
      <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
      <tr>
      <td style="padding-bottom:5px;padding-left:10px;padding-right:10px;padding-top:25px;">
      <div style="font-family: sans-serif">
      <div style="font-size: 14px; mso-line-height-alt: 16.8px; color: #3fa2f7; line-height: 1.2; font-family: Roboto Slab, Arial, Helvetica Neue, Helvetica, sans-serif;">
      <p style="margin: 0; font-size: 14px; text-align: center;"><span style="font-size:20px;">Not to worry, We got you!</span></p>
      </div>
      </div>
      </td>
      </tr>
      </table>
      <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
      <tr>
      <td style="padding-bottom:5px;padding-left:10px;padding-right:10px;padding-top:5px;">
      <div style="font-family: sans-serif">
      <div style="font-size: 14px; mso-line-height-alt: 16.8px; color: #3fa2f7; line-height: 1.2; font-family: Roboto Slab, Arial, Helvetica Neue, Helvetica, sans-serif;">
      <p style="margin: 0; font-size: 14px; text-align: center;"><span style="font-size:22px;">Let's get you a new password.</span></p>
      </div>
      </div>
      </td>
      </tr>
      </table>
      <table border="0" cellpadding="0" cellspacing="0" class="button_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
      <tr>
      <td style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:30px;text-align:center;">
      <div align="center">
      <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="www.example.com" style="height:60px;width:259px;v-text-anchor:middle;" arcsize="17%" strokeweight="1.5pt" strokecolor="#3fa2f7" fillcolor="#3fa2f7"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#3fa2f7; font-family:Arial, sans-serif; font-size:18px"><![endif]--><a href=${link} style="text-decoration:none;display:inline-block;color:#fff;background-color:#3fa2f7;border-radius:10px;width:auto;border-top:3px solid #297fca;border-right:3px solid #297fca;border-bottom:3px solid #297fca;border-left:3px solid #297fca;padding-top:10px;padding-bottom:10px;font-family:Roboto Slab, Arial, Helvetica Neue, Helvetica, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;" target="_blank"><span style="padding-left:25px;padding-right:25px;font-size:18px;display:inline-block;letter-spacing:normal;"><span style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"><span data-mce-style="font-size: 18px; line-height: 36px;" style="font-size: 18px; line-height: 36px;">RESET MY PASSWORD</span></span></span></a>
      <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
      </div>
      </td>
      </tr>
      </table>
      <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
      <tr>
      <td style="padding-bottom:40px;padding-left:10px;padding-right:10px;padding-top:30px;">
      <div style="font-family: sans-serif">
      <div style="font-size: 14px; mso-line-height-alt: 16.8px; color: #3fa2f7; line-height: 1.2; font-family: Roboto Slab, Arial, Helvetica Neue, Helvetica, sans-serif;">
      <p style="margin: 0; font-size: 14px; text-align: center;"><span style="font-size:14px;">If you didn’t request to change your password, simply ignore this email.</span></p>
      </div>
      </table>
      </td>
      </tr>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #e4f1fd;" width="100%">
      <tbody>
      <tr>
      <td>
      <tbody>
      <tr>
      <td class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 25px; padding-bottom: 25px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
      <table border="0" cellpadding="10" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
      <tr>
      <td>
      <div style="font-family: sans-serif">
      <p style="margin: 0; font-size: 14px; text-align: center;"><span style="font-size:12px;">This link will expire in 15 minutes. If you continue to have problems</span><br/><span style="font-size:12px;">please feel free to contact us at <a href="mailto:noreply.pachitest@gmail.com" rel="noopener" style="text-decoration: underline; color: #297fca;" target="_blank" title="noreply.pachitest@gmail.com">noreply.pachitest@gmail.com</a>.
      </table>
      <!-- End -->
      </body>
      </html>`,
    });

    console.log("Email sent sucessfully:", output.response);
  } catch (error) {
    console.error("Email not sent. Error:",error);
  }
};
export default sendEmail;
