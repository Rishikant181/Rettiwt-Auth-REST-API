import express, { Request } from 'express';
import { AccountCredential, Auth } from 'rettiwt-auth';

// Initializing a new Express app
const app = express();

// Adding middleware for parsing json payload
app.use(express.json());

// Endpoint for checking server status
app.use('/up', (req, res) => {
	res.send('Server is working!');
});

// Endpoint for logging in
app.post('/login', (req: Request<undefined, { apiKey?: string }, AccountCredential>, res) => {
	// Getting login credentials
	const credentials: AccountCredential = req.body;

	// Logging in and getting API_KEY
	new Auth()
		.getUserCredential(credentials)
		.then((data) => res.json({ apiKey: Buffer.from(data.toHeader().cookie as string).toString('base64') }))
		.catch(() => res.json({ apiKey: undefined }));
});

// Listening
app.listen(3000, () => {
	console.log('Listening on port 3000');
});
