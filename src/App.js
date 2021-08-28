import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf.js'
import BookSearch from './BookSearch.js'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"


const bookShelves =[
	{
		"name": "Currently Reading",
		"key":"currentlyReading"
	},
	{
		"name": "Want to Read",
		"key":"wantToRead"
	},
	{
		"name": "Read",
		"key":"read"
	}
	]


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
	bookShelves:[
	{
		"name": "Currently Reading",
		"Books":[
			{
				"Title":"To Kill a Mockingbird",
				"author":"Harper Lee",
				"backgroundImage": "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api"
			},
			{
				"Title":"Ender's Game",
				"author":"Orson Scott",
				"backgroundImage": "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api"
			}
		]
			
	}       
	,
	{
		"name": "Want to Read",
			"Books":[
			{
				"Title":"1776",
				"author":"avid McCulloughe",
				"backgroundImage": "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api"
			},
			{
				"Title":"Harry Potter and the Sorcerer's Stone",
				"author":"J.K. Rowling",
				"backgroundImage": "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api" 
			}
		]
	},
	{
		"name": "Read",
			"Books":[
			{
				"Title":"The Hobbit",
				"author":"J.R.R. Tolkien",
				"backgroundImage": "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api" 
			},
			{
				"Title":"Oh, the Places You'll Go!",
				"author":"Seuss",
				"backgroundImage": "http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api"
			}
			,
			{
				"Title":"The Adventures of Tom Sawyer!",
				"author":"Mark Twain",
				"backgroundImage": "http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api"
			}
		]
		
	}
	
	],
	"BooksA":[]
  }
  

  changeShelf= (passedbook,shelfID)=>
{
	if(typeof this.state.BooksA!=='undefined')
	{
	const index = this.state.BooksA.findIndex( book => book.id === passedbook.id)
	//console.log(`book id is ${bookID}, shelf id is ${shelfID}`)
	console.log(this.state.BooksA)
	let updatedBooks = [ ...this.state.BooksA ];
	console.log(`index is ${index}`)
if(index !== -1)
{
	updatedBooks[index].shelf = shelfID;
}
else
{
	//updatedBooks.map((book)=>console.log (`bef ${book.id} ${book.shelf}`)	)

	passedbook.shelf = shelfID;
	updatedBooks.push(passedbook)
		
		//updatedBooks.map((book)=>console.log (`after ${book.id} ${book.shelf}`))
}
	this.setState(({
		BooksA : updatedBooks

	}));
	}
	else
	{
		console.log('');
	}
}
   componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
		  console.log('in did mount')
        this.setState(() => ({
          BooksA:books
        }))
      })
  }
  
 
 updateShowSearchPage = (searchValue)=>
{
	this.setState(()=>({ showSearchPage: searchValue }));
}
	

  render() {
(typeof this.state.BooksA!=='undefined')&& (console.log(this.state.BooksA))
	
	console.log(`size is ${this.state.BooksA.length}`)
	console.log(this.state.BooksA)
	//  this.state.BooksA.map((book)=> console.log(`after ${book.id} ${book.shelf}`))
    return (
      <div className="app">
	  <Switch>
	  <Route exact path ='/search'>
      
          <BookSearch changeShelf={this.changeShelf} books={this.state.BooksA} showSearchPage={this.state.showSearchPage} updateShowSearch = {this.updateShowSearchPage}/>
        </Route>
		
		<Route  path ='/'>
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
					{
				(typeof this.state.BooksA!=='undefined')&&bookShelves.map((bookshelf)=>
				{
					return(
				
				<BookShelf key= {bookshelf.key} bookShelf ={bookshelf} books={this.state.BooksA} changeShelf={this.changeShelf} />)
				}
				)		
			
					}
              </div>
            </div>
            <div className="open-search">
			<Link to='/search'>Add a book</Link>
             
            </div>
          </div>
      </Route>
	  </Switch>
      </div>
    )
  }
}

export default BooksApp
