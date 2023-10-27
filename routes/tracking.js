import axios from 'axios';
import express from 'express';

const router = express.Router();

router.post('', async (req, res) => {
  try {
    const authenticationCall = await axios.post(
      'https://apis-sandbox.fedex.com/oauth/token',
      {
        grant_type: 'client_credentials',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    // To keep the token
    const BearerToken = authenticationCall.data.access_token;

    // Use the data from the first API to call the second API
    const trackingNumbersCall = await axios.post(
      'https://apis-sandbox.fedex.com/track/v1/trackingnumbers',
      {
        includeDetailedScans: true,
        trackingInfo: [
          {
            trackingNumberInfo: {
              trackingNumber: req.body.trackingNumber,
            },
          },
        ],
      },
      {
        headers: { Authorization: `Bearer ${BearerToken}` },
      }
    );

    res.json({
      Tracking_API_Response: trackingNumbersCall.data,
    });
  } catch (error) {
    console.log(`An error occurred while calling the APIs ${error}`);
    res
      .status(500)
      .json({ error: `An error occurred while calling the APIs ${error}` });
  }
});

export default router;