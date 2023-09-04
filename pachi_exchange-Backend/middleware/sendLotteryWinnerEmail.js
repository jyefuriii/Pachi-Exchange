import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const CLIENT_ID = process.env.CLIENT_IDS;
const CLIENT_SECRET = process.env.CLIENT_SECRETS;
const REDIRECT_URI = process.env.REDIRECT_URIS;
const REFRESH_TOKEN = process.env.REFRESH_TOKENS;
const currentDate = new Date();

const options = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: "Asia/Manila",
  hour12: false,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};
const purchaseDate = currentDate.toLocaleDateString("en-PH", options);
currentDate.toLocaleTimeString("en-PH", options);

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendLotteryWinnerEmail = async (
  fullName,
  emailAddress,
  subject,
  username,
  entryId,
  lotteryType,
  prize,
  drawNumber,
  drawDate,
  purchaseDate
) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: 587,
      secure: false,
      auth: {
        type: "OAuth2",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        user: process.env.USER,
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
      <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css"/>
      <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css"/>
      <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css"/>
      <link href="https://fonts.googleapis.com/css?family=Permanent+Marker" rel="stylesheet" type="text/css"/>
      <link href="https://fonts.googleapis.com/css?family=Abril+Fatface" rel="stylesheet" type="text/css"/>
      <!--<![endif]-->
      <style>
          * {
            box-sizing: border-box;
          }
      
          body {
            margin: 0;
            padding: 0;
          }
      
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
      
          @media (max-width:700px) {
            .icons-inner {
              text-align: center;
            }
      
            .icons-inner td {
              margin: 0 auto;
            }
      
            .fullMobileWidth,
            .row-content {
              width: 100% !important;
            }
      
            .image_block img.big {
              width: auto !important;
            }
      
            .stack .column {
              width: 100%;
              display: block;
            }
          }
        </style>
      </head>
      <body style="background-color: #f9f9f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
      <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f9f9f9;" width="100%">
      <tbody>
      <tr>
      <td>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
      <tbody>
      <tr>
      <td>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #3fa2f7; color: #000000; width: 680px;" width="680">
      <tbody>
      <tr>
      <td class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
      <table border="0" cellpadding="0" cellspacing="0" class="image_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
      <tr>
      <td style="padding-bottom:10px;padding-top:10px;width:100%;padding-right:0px;padding-left:0px;">
      <div align="center" style="line-height:10px"><img alt="Yourlogo Light" src="https://www.pachiplus.com/hs-fs/hubfs/pachi+_logo.png?width=1500&height=869&name=pachi+_logo.png" style="display: block; height: auto; border: 0; width: 268px; max-width: 100%;" title="Yourlogo Light" width="268"/></div>
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
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
      <tbody>
      <tr>
      <td>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #e4f1fd; color: #000000; width: 680px;" width="680">
      <tbody>
      <tr>
      <td class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
      <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
      <tr>
      <td style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:30px;">
      <div style="font-family: sans-serif">
      <div style="font-size: 14px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 16.8px; color: #2f2f2f; line-height: 1.2;">
      <div align="center" style="line-height:10px"><img alt="Check Icon" src="https://media.giphy.com/media/BTzL30w3ptEUq659K7/giphy.gif" style="display: block; height: 200px; border: 0;border-radius: 50%; width: 200px; max-width: 100%;" title="Check Icon" width="93"/></div>
      <p style="margin: 0; text-align: center; padding-top:30px;letter-spacing: 1px;color:#3fa2f7;"><strong><span style="font-size:32px;">Sweepstakes Winner</span></strong></p>
	<p style="margin: 0; text-align: center; padding-top:10px;letter-spacing: 1px;color:#3fa2f7;"><strong><span style="font-size:28px;">${lotteryType}</span></strong></p>
      </div>
      </div>
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
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
      <tbody>
      <tr>
      <td>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #e4f1fd; color: #000000; width: 680px;" width="680">
      <tbody>
      <tr>
      <td class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: center; border-bottom: 0px solid #5D77A9; border-left: 0px solid #5D77A9; border-right: 0px solid #5D77A9; border-top: 0px solid #5D77A9;" width="50%">
      <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
      <tr>
      <td style="padding-bottom:50px;padding-left:-20px;padding-right:10px;padding-top:15px;">
      <div style="font-family: sans-serif">
      <div style="font-size: 14px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 28px; color: #393d47; line-height: 2;">
  <p style="margin: 0; font-size: 16px; text-align: right;"><strong><span style="font-size:16px;"><span style="color:#5d77a9;">Name:</span></span></strong></p>
      <p style="margin: 0; font-size: 16px; text-align: right;"><strong><span style="font-size:16px;"><span style="color:#5d77a9;">Username:</span></span></strong></p>
  <p style="margin: 0; font-size: 16px; text-align: right;"><strong><span style="font-size:16px;"><span style="color:#5d77a9;">Email Address:</span></span></strong></p>
      <p style="margin: 0; font-size: 16px; text-align: right;"><strong><span style="font-size:16px;"><span style="color:#5d77a9;">Entry No.:</span></span></strong></p>
      <p style="margin: 0; font-size: 16px; text-align: right;"><strong><span style="font-size:16px;"><span style="color:#5d77a9;">Prize:</span></span></strong></p>
      <p style="margin: 0; font-size: 16px; text-align: right;"><strong><span style="font-size:16px;"><span style="color:#5d77a9;">Draw No.:</span></span></strong></p>
      <p style="margin: 0; font-size: 16px; text-align: right;"><strong><span style="font-size:16px;"><span style="color:#5d77a9;">Draw Date:</span></span></strong></p>
      </div>
      </div>
      </td>
      </tr>
      </table>
      </td>
      <td class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: center; border-bottom: 0px solid #5D77A9; border-left: 0px solid #5D77A9; border-right: 0px solid #5D77A9; border-top: 0px solid #5D77A9;" width="50%">
      <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
      <tr>
      <td style="padding-bottom:50px;padding-left:10px;padding-right:10px;padding-top:15px;">
      <div style="font-family: sans-serif">
      <div style="font-size: 14px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 28px; color: #2f2f2f; line-height: 2;">
      <p style="margin: 0; font-size: 16px; text-align: left; mso-line-height-alt: 32px;"><span style="font-size:16px;">${fullName}</span></p>
      <p style="margin: 0; font-size: 16px; text-align: left; mso-line-height-alt: 32px;"><span style="font-size:16px;">${username}</span></p>
      <p style="margin: 0; font-size: 16px; text-align: left;">${emailAddress}</p>
      <p style="margin: 0; font-size: 16px; text-align: left;">${entryId}</p>
      <p style="margin: 0; font-size: 16px; text-align: left;">${prize}</p>
      <p style="margin: 0; font-size: 16px; text-align: left;">${drawNumber}</p>
      <p style="margin: 0; font-size: 16px; text-align: left;">${drawDate}</p>
      </div>
      </div>
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
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
      <tbody>
      <tr>
      <td>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #297fca; color: #000000; width: 680px;" width="680">
      <tbody>
      <tr>
      <td class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
      <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
      <tr>
      <td style="padding-bottom:10px;padding-left:30px;padding-right:30px;padding-top:20px;">
      <div style="font-family: sans-serif">
      <div style="font-size: 14px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 21px; color: #2f2f2f; line-height: 1.5;">
      <p style="margin: 0; font-size: 16px; text-align: center; mso-line-height-alt: 21px;"><span style="font-size:14px;"><span style="color:#fff;">Copyright © 2021 Pachi Exchange, All rights reserved.</span></p>
      </div>
      <span style="color:#297fca;opacity:0%;">${purchaseDate}</span>
      </div>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table><!-- End -->
      </body>
      </html>`,
    });

    console.log(output);
    console.log("email sent sucessfully:");
  } catch (error) {
    console.log(error, "email not sent");
  }
};
export default sendLotteryWinnerEmail;
