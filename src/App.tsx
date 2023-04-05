import React, { useState } from 'react'

interface Message {
	message: string
}

const ExampleComponent: React.FC = () => {
	const [inputMessage, setInputMessage] = useState<string>('')
	const [message, setMessage] = useState<string>('')

	const handleInputChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	): void => {
		setInputMessage(event.target.value)
	}

	const handleSubmit = async (
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		event.preventDefault()

		try {
			const response = await fetch('http://localhost:3001', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message: inputMessage })
			})

			const data: Message = await response.json()
			setMessage(data.message)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<textarea value={inputMessage} onChange={handleInputChange} />
				<button type='submit'>Submit</button>
			</form>
			{message && <div>{message}</div>}
		</div>
	)
}

export default ExampleComponent
