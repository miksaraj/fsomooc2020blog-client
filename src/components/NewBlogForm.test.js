import React from 'react'
import'@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

describe('<NewBlogForm />', () => {
	const mockHandler = jest.fn()

	const targetValues = {
		title: 'Title',
		author: 'Author',
		url: 'www.example.com'
	}

	let component

	beforeEach(() => {
		component = render(
			<NewBlogForm createBlog={mockHandler} />
		)
	})

	test('create blog callback function receives the correct data when called', async () => {
		const form = component.container.querySelector('.newBlogForm')
		const fields = ['title', 'author', 'url']
		let input

		fields.forEach(field => {
			input = component.container.querySelector(`#${field}`)
			fireEvent.change(input, {
				target: { value: targetValues[field] }
			})
		})

		fireEvent.submit(form)

		expect(mockHandler.mock.calls).toHaveLength(1)
		expect(mockHandler.mock.calls[0][0]).toEqual(targetValues)
	})
})