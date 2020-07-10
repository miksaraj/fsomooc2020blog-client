import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
	const blog = {
		title: 'Title',
		author: 'Author',
		url: 'www.example.com',
		likes: 8,
		user: {
			username: 'user',
			id: '5f05b529ab4cc8066878762c'
		}
	}

	const user = {
		username: 'user2',
		id: '5f05ba80b8c22607c7a05e6e'
	}

	const mockHandler = jest.fn()

	let component

	beforeEach(() => {
		component = render(
			<Blog blog={blog} user={user} handleLike={mockHandler} />
		)
	})

	test('initially renders author and title only', () => {
		const titleElement = component.getByText('Title')
		expect(titleElement).toBeDefined()

		const authorElement = component.getByText(', by Author')
		expect(authorElement).toBeDefined()

		const div = component.container.querySelector('.blogExtra')
		expect(div).toHaveStyle('display: none')
	})

	test('after clicking the button, url and likes are displayed', () => {
		const button = component.getByText('View')
		fireEvent.click(button)

		const div = component.container.querySelector('.blogExtra')
		expect(div).not.toHaveStyle('display: none')
	})

	// FIXME: curiously the test doesn't pass even when the debugger tells me
	// that the event is fired twice and the component has the correct handler
	test('clicking the like button twice calls the event handler twice', async () => {
		fireEvent.click(component.getByText('View'))

		const likeBtn = component.getByText('Like')
		for (let i = 0; i < 2; i++) {
			fireEvent.click(likeBtn)
		}

		expect(mockHandler.mock.calls).toHaveLength(2)
	})
})