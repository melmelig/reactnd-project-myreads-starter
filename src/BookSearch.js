import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Book from './Book.js'

let parsedBooks=[]
class BookSearch extends React.Component {
	
state = {
	query:'',
searchResults:[]



}

filterResults=(beforeFilter)=>
{

if( beforeFilter.length === 0)
{
	console.log('filterrrrrrrrrrrrrr on undefined')
}
else
{
	if(beforeFilter !== undefined  )
	{
	return beforeFilter.filter(book=>
	(book.authors && book.imageLinks &&book.imageLinks.thumbnail)
	)
	}
}
}





 removeDuplicates=(arr) =>{
              
       const     jsonObject = arr.map(JSON.stringify);
          
        let    uniqueSet = new Set(jsonObject);
            arr = Array.from(uniqueSet).map(JSON.parse);
	
      
        }
mergeNoDuplicates =(initialData,newData) =>
{
var ids = new Set(initialData.map(d => d.id));
return ( [...initialData, ...newData.filter(d => !ids.has(d.id))]);
}



searchBook = (query)=>
{
	console.log(`in search ${this.props.books}`)
	console.log(`q ${query}`)
		
	this.setState(()=>({ query:query}))	
	if(query)	
	{
	 
    BooksAPI.search(query)
      .then((books) => {
		  if(Array.isArray(books))
		  {
			 console.log(`boooks ${books}`)
			  this.removeDuplicates(books)
			  parsedBooks = books
        this.setState(() => ({
        //  searchResults:this.filterResults(books).concat(this.props.books)
		searchResults : this.mergeNoDuplicates(this.props.books,this.filterResults(books))
        }))
		  }
      })
	//console.log(this.mergeNoDuplicates(this.props.books,this.filterResults(parsedBooks)))
	}
	else{
		
		 this.setState(() => ({
        //  searchResults:this.filterResults(books).concat(this.props.books)
		searchResults :  []
        }))
		
	}
  
}


	
  
	updateQuery=(query)=>{
		this.setState(()=>({ query:query.trim()}))
	}
  render() {
	  const updateShowSearchPage = this.props.updateShowSearch
	  console.log(`rendering search start ${this.state.searchResults.length}`)
	  this.state.searchResults.map((book)=>
	  
	  console.log(` ${book.id}`))
	  console.log('rendering search end')
	  return(

			<div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" value={this.state.query} placeholder="Search by title or author" onChange = {(event)=>this.searchBook(event.target.value)}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
			  
			  {
				 this.state.searchResults && this.state.searchResults.map((book)=>
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

export default BookSearch
