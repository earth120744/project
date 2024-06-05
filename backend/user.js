const { Pool } = require('pg');
const express = require('express');
const router = express.Router();
const mailer = require('nodemailer');
const speakeasy = require('speakeasy');

const pool = new Pool({
  user: 'admin',
  host: '34.87.150.22',
  database: 'postgres',
  password: '12345',
});

router.post('/login', (req, res) => {
  const { user_name, user_password } = req.body;

  if (!user_name || !user_password) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  const getUserQuery = 'SELECT * FROM user_login WHERE user_name = $1 AND user_password = $2';

  pool.query(getUserQuery, [user_name, user_password], async (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (result.rows.length > 0) {
      const email = result.rows[0].user_email;
      const secret = speakeasy.generateSecret().base32;
      console.log(secret);

      const otp = speakeasy.totp({
        encoding: 'base32',
        algorithm: 'sha256',
        secret
      });

      const transport = mailer.createTransport({
        auth: {
          user: '1163109051230@mail.rmutt.ac.th',
          pass: '75120Yoyo'
        },
        service: 'hotmail'
      });

      try {
        const truncatedSecret = secret.substring(0, 6);
        const info = await transport.sendMail({
          to: email,
          subject: 'Login Code: OTP',
          text: `Here is your login approval code:[Ref:${truncatedSecret}] ${otp}`,
          from: "1163109051230@mail.rmutt.ac.th"
        });
        res.status(200).json({ success: true, message: 'Login successful', otpSecret: secret });
      } catch (emailError) {
        console.error('Error sending email', emailError);
        res.status(500).json({ error: 'Error sending OTP email' });
      }
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  });
});

router.post('/signup', (req, res) => {
  const { user_name, user_password, user_email } = req.body;

  if (!user_name || !user_password || !user_email) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  const insertUserQuery = 'INSERT INTO user_login (user_name, user_password, user_email) VALUES ($1, $2, $3) RETURNING *;';

  pool.query(insertUserQuery, [user_name, user_password, user_email], (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.status(201).json(result.rows[0]);
  });
});

// router.post('/mail', async (req, res) => {
//   const { email } = req.body;
//   const secret = speakeasy.generateSecret().base32;

//   const otp = speakeasy.totp({
//     encoding: 'base32',
//     algorithm: 'sha256',
//     secret
//   });

//   const transport = mailer.createTransport({
//     auth: {
//       user: '1163109051230@mail.rmutt.ac.th',
//       pass: '75120Yoyo'
//     },
//     service: 'hotmail'
//   });

//   const info = await transport.sendMail({
//     to: email,
//     subject: 'Login Code: OTP',
//     text: `Here is your login approval code: ${otp}\nYour secret: ${secret}`,
//     from: "1163109051230@mail.rmutt.ac.th"
//   });

//   return res.status(201).json(info);
// });

router.post('/otp', (req, res) => {
  const { email, otp, secret } = req.body;

  const verifyOtp = speakeasy.totp.verify({
    window: 2,
    encoding: 'base32',
    algorithm: 'sha256',
    secret: secret,
    token: otp
  });

  return res.status(201).json({
    verify: verifyOtp
  });
});

module.exports = router;
