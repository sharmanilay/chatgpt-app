import express, { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app: Application = express()
const port: number = 3001

// Middleware to parse incoming requests with JSON payloads
app.use(bodyParser.json())

// Middleware to enable cross-origin resource sharing
app.use(cors())

// API endpoint that returns a JSON object
app.post('/', (req: Request, res: Response) => {
	const exampleObj = { message: 'Hello, World!' }
	res.json(exampleObj)
})

// Start the server
app.listen(port, () => {
	console.log(`Server is listening on port ${port}`)
})
