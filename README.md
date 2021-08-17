## To Run Code:

-> Create 
-> Get an Api-Key from https://www.themoviedb.org to get the movies data
-> Put the Api-Key as environment variable and use it on fetching the api
-> set Api-Key as environment variable 
-> Command prompt ### `set "REACT_APP_MOVIE_DATABASE_API_KEY = YOUR_API_KEY"  && NPM START` to start the server
-> That's it to get on running the code

## To Test Code:
-> Implimented infinite scrolling for moviesList component, test it by scrolling the page to the bottom
-> Search any movie on the search input to get the desired results
-> Test the responsiveness of page by changing the window size

## Things That I Did Well:
-> Managing state by using react-redux state management library
-> Responsiveness of the page
-> Handling of asynchronous API calls by using redux-thunk

Passing state between components is complex in react. By using react-redux, it can be made easy by the use of redux global store to store the state of the component and can
access them for any child component.

Using Grid columns with auto fill and min-max will have a responsive page of movie cards.

In redux, when an action creator returns a function, it function will get executed by the Redux Thunk middleware. This function doesn't need to be pure, it is thus allowed to have side effects, including executing asynchronous API calls and function can also dispatch actions.


-> If i had more time, i would improve the state management and improve response of the page.
