import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookShelf from "./BookShelf.js";
import BookSearch from "./BookSearch.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const bookShelves = [
  {
    name: "Currently Reading",
    key: "currentlyReading",
  },
  {
    name: "Want to Read",
    key: "wantToRead",
  },
  {
    name: "Read",
    key: "read",
  },
];

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */

    BooksA: [],
  };

  changeShelf = (passedbook, shelfID) => {
	  console.log(`adding new book: shelf ID ${passedbook.shelf}, ${shelfID}`)
    if (typeof this.state.BooksA !== "undefined") {
      const index = this.state.BooksA.findIndex(
        (book) => book.id === passedbook.id
      );
      
      let updatedBooks = [...this.state.BooksA];
     
      if (index !== -1) {
        updatedBooks[index].shelf = shelfID;
      } else {		  
        passedbook.shelf = shelfID;
        updatedBooks.push(passedbook);
      }
      this.setState({
        BooksA: updatedBooks,
      });
      BooksAPI.update(passedbook, shelfID);
    } else {
    }
  };
  async componentDidMount() {
	  const books = await BooksAPI.getAll()
      this.setState(() => ({
        BooksA: books,
      }));
    
  }


  render() {
  
    return (
      <div className="app">
        <Switch>
          <Route exact path="/search">
            <BookSearch
              changeShelf={this.changeShelf}
              books={this.state.BooksA}
            />
          </Route>

          <Route path="/">
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {typeof this.state.BooksA !== "undefined" &&
                    bookShelves.map((bookshelf) => {
                      return (
                        <BookShelf
                          key={bookshelf.key}
                          bookShelf={bookshelf}
                          books={this.state.BooksA}
                          changeShelf={this.changeShelf}
                        />
                      );
                    })}
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
