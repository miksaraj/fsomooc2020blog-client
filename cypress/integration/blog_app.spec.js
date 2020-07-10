describe('Blog app', function() {
	const blogs = [
		{
			title: 'What about SapperJS?',
			author: 'Timothy Lee',
			url: 'www.frontendmasters.org/blogs/tlee/sapperjs',
			likes: 5
		},
		{
			title: 'Angular vs Vue vs React',
			author: 'Timothy Lee',
			url: 'www.frontendmasters.org/blogs/tlee/angular-vue-react',
			likes: 8
		},
		{
			title: 'Vue 3 is coming - are you ready?',
			author: 'Evan You, Alex Kostadinis',
			url: 'www.vuejs.org/blogs/alexvueschool/vue3-is-coming',
			likes: 2
		}
	]

	beforeEach(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		const user = {
			name: 'Administrator',
			username: 'admin',
			pwd: 'root'
		}
		cy.request('POST', 'http://localhost:3003/api/users/', user)
		cy.visit('http://localhost:3000')
	})

	it('login form is shown', function() {
		cy.contains('Username:')
		cy.contains('Password:')
	})

	describe('Login', function() {
		it('succeeds with correct credentials', function() {
			cy.contains('Login').click()
			cy.get('#username').type('admin')
			cy.get('#pwd').type('root')
			cy.get('#login-btn').click()

			cy.contains('Administrator logged in')
		})

		it('fails with wrong credentials', function() {
			cy.contains('Login').click()
			cy.get('#username').type('admin')
			cy.get('#pwd').type('totoro')
			cy.get('#login-btn').click()

			cy.get('.error')
				.should('contain', 'invalid credentials')
				.and('have.css', 'color', 'rgb(255, 0, 0)')
				.and('have.css', 'border-style', 'solid')

			cy.get('html').should('not.contain', 'Administrator logged in')
		})
	})

	describe('when logged in', function() {
		beforeEach(function() {
			cy.login({ username: 'admin', pwd: 'root' })
		})

		it('a blog can be created', function() {
			cy.contains('New blog').click()
			cy.get('#title').type('Vue.js is amazing')
			cy.get('#author').type('Evan You')
			cy.get('#url').type('www.vuejs.org/blogs/evany/vuejs-is-amazing')
			cy.contains('Submit').click()
			cy.contains('Vue.js is amazing')
		})

		describe('and a blog exists', function() {
			beforeEach(function() {
				cy.createBlog({
					title: 'Vue.js is amazing',
					author: 'Evan You',
					url: 'www.vuejs.org/blogs/evany/vuejs-is-amazing'
				})
				cy.contains('Vue.js is amazing')
				cy.contains('View').click()
			})

			it('a blog can be liked', function() {
				cy.contains('Like').click()
				cy.contains('Likes: 1')
			})

			it('a blog can be deleted by its creator', function() {
				cy.contains('Remove').click()
				cy.get('.blotTitle').should('not.contain', 'Vue.js is amazing')
			})

			it('blogs are sorted descending by likes', function() {
				blogs.forEach(blog => {
					cy.createBlog(blog)
				})
				cy.visit('http://localhost:3000')
				cy.get('.blogTitle:first').contains('Angular')
				cy.get('.blogTitle').eq(1).contains('SapperJS')
				cy.get('.blogTitle').eq(2).contains('Vue 3')
				cy.get('.blogTitle:last').contains('Vue.js')
			})
		})
	})
})