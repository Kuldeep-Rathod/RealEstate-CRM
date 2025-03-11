export const mailTemplate = (name: string, appName: string): string => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Welcome to ${appName}!</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
            text-align: center;
          }
          .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: auto;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: #ffffff;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome, ${name}!</h1>
          <p>Thank you for joining <strong>${appName}</strong>. We are thrilled to have you with us.</p>
          <p>Click the button below to get started:</p>
          <a href="#" class="button">Get Started</a>
          <p>If you have any questions, feel free to reach out to us.</p>
          <p>Best Regards,<br>${appName} Team</p>
        </div>
      </body>
      </html>
    `;
  };
  