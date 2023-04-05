import express, { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import { Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({
	organization: process.env.OPENAI_ORG_ID,
	apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

const app: Application = express()
const port: number = 3001

// Middleware to parse incoming requests with JSON payloads
app.use(bodyParser.json())

// Middleware to enable cross-origin resource sharing
app.use(cors())

interface MessageRequest {
	message: string
}

// API endpoint that returns a JSON object
app.post('/', async (req: Request<{}, {}, MessageRequest>, res: Response) => {
	const { message } = req.body
	const response = await openai.createCompletion({
		model: 'text-davinci-003',
		prompt: message,
		max_tokens: 7,
		temperature: 0
	})
	if (response.data.choices) {
		res.json({ message: response.data.choices[0].text })
	}
})

// Start the server
app.listen(port, () => {
	console.log(`Server is listening on port ${port}`)
})
