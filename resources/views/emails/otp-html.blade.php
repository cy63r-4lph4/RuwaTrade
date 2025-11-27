<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RuwaTrade OTP</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Helvetica Neue', Arial, sans-serif;
      background-color: #f4f6fb;
      color: #333;
    }

    .container {
      max-width: 600px;
      margin: 30px auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      border-top: 6px solid #4f39f6;
    }

    .header {
      text-align: center;
      background: #4f39f6;
      color: #fff;
      padding: 30px 20px;
    }

    .header h1 {
      margin: 0;
      font-size: 24px;
      letter-spacing: 1px;
    }

    .body {
      padding: 30px 20px;
      text-align: center;
    }

    .body p {
      font-size: 16px;
      line-height: 1.6;
    }

    .otp {
      display: inline-block;
      margin: 20px 0;
      font-size: 32px;
      letter-spacing: 10px;
      font-weight: bold;
      color: #4f39f6;
      background: #f4f6fb;
      padding: 15px 30px;
      border-radius: 8px;
      border: 2px dashed #4f39f6;
    }

    .footer-message {
      margin-top: 20px;
      font-size: 14px;
      color: #555;
    }

    .footer {
      background: #f9fafc;
      padding: 20px;
      font-size: 12px;
      color: #888;
      text-align: center;
    }

    .button {
      display: inline-block;
      padding: 12px 25px;
      background-color: #4f39f6;
      color: #fff;
      text-decoration: none;
      border-radius: 6px;
      margin-top: 15px;
      font-weight: bold;
    }

    @media only screen and (max-width: 480px) {
      .otp {
        font-size: 24px;
        letter-spacing: 6px;
        padding: 12px 20px;
      }
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
      <h1>RuwaTrade Verification Code</h1>
    </div>
    <div class="body">
      <p>Hello,</p>
      <p>Use the following OTP to verify your RuwaTrade account. This code expires in <strong>{{ $expiresMinutes }}
          minutes</strong>.</p>
      <div class="otp">{{ $otpCode }}</div>
      <p class="footer-message">
        If you didn't request this, feel free to ignore it — your account stays safe.<br>
        Thanks for being part of the RuwaTrade family. We're building something massive. 🚀
      </p>
      <a href="https://ruwatrade.com" style="
    display: inline-block;
    padding: 12px 25px;
    background-color: #4f39f6;
    color: #ffffff;
    text-decoration: none;
    border-radius: 6px;
    font-weight: bold;
    text-align: center;
" target="_blank">Go to RuwaTrade</a>
    </div>
    <div class="footer">
      &copy; {{ date('Y') }} RuwaTrade. All rights reserved.<br>
      Need help? <a href="mailto:support@ruwatrade.com" style="color:#4f39f6;">support@ruwatrade.com</a>
    </div>
  </div>
</body>

</html>