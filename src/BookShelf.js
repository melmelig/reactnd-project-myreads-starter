import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book.js'

class BookShelf extends React.Component {
  

  render() {
	  const bookShelf = this.props.bookShelf
	  const books = this.props.books
	  const booksInShelf = books.filter((book)=> book.shelf === bookShelf.key)
	  //console.log(`book is ${booksInShelf[0].name}`)
	  //booksInShelf.map((book)=>console.log(`shelf is ${bookShelf.name}title is ${book.title} shelf is ${book.shelf}` ))
	  return(
	
			<div className="bookshelf">
				<h2 className="bookshelf-title">{bookShelf.name}</h2>
				
				<div className="bookshelf-books">
				
					<ol className="books-grid">
					{
						booksInShelf.map((book)=>
						{
						return(
						<Book key={book.id} book = {book} changeShelf={this.props.changeShelf}/>)
						}
						)
					}
					</ol>
			
				</div>
			</div>			
  )
  }
}

export default BookShelf
