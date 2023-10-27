# MIDTERMREP
FEDEX Express Tracking API with Secure HTTPS

API Documentation

Endpoint:

`POST /tracking`

This endpoint allows you to track packages using FedEx API. 

Send a POST request to this endpoint with the following JSON format:

json

{
  "trackingNumber": "TRACKING_NUMBER"
}
passed in the body

Request Format
Method: POST
- Headers: Content-Type: application/json
- Body:
  - trackingNumber (string, required): The tracking number of the package to be tracked.

    
Expected Response Format:

json
{
  "Tracking_API_Response": {
    // FedEx API response data for the provided tracking number
  }
}

Status Codes:

- 200 OK: Successful request. The tracking information is included in the response.
- 500 Internal Server Error: An error occurred while calling the FedEx APIs.

Middleware Setup:

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

Middleware functions are set up to parse incoming request bodies as JSON and handle URL-encoded data.
  
Environment Variables:

- CLIENT_ID
- CLIENT_SECRET

Running the Application:

Start the server: `npm start`
The server will start running at `https://localhost:8088`.

Now you can make POST requests to the `/tracking` endpoint with the appropriate tracking number in the request body to get real-time package tracking information.

---
