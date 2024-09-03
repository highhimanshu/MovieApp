# Netflix Clone Steps

## Installation

- Install vite
- Install and configure tailwind css
- Install redux package

## Features

# Sign In / Sign Up Page

- create login and signup on the same component
- Manage the state with useRef
- Create a resuable validation form (implement custom form validation)
- Once Signed in, navigate to browse page
- If not signed in, show the login screen
- Create a store with "user" object
- Add login data to firebase (uid, email , displayName , photoURL [optional])
- use firebase "onAuthStateChanged" for redirection
- Create a navbar and add routing (createBrowserRouter)
- show/hide login/logout according to authentication
- Create protected route

# Browse Page

- Displaying the first video present in tmdb api
- Automatic video play with audio muted on the page load.
- Displaying movies card a/c to category :
  -- Upcoming
  -- Now Playing
  -- Top Rated
  -- Popular
- Every movie card dispay image. (Name and heart icon visible on hover)
- Each Movie card routes to single movie page.
- Hover effect added on the card
- Sliding functionality added to the cards.

# Category wise display page

- 10 movie card will be shown on the first page
- Dynamic pagination added for browsing more movies

# Single Movie Detail Page

- Image , movie name,etc are displayed in 2 section
- Button for movie trailer/youtube link

# AI Search

- Added a search button at the header
- Using Gemini 3.5 api for search
- User can give the context and top 5 movies based on the result will be shown

# Normal Search

- Added a search bar on header
- Debouncing implemented on the search
- Auto suggestion droodpwn implement
- Each Block inside the dropdown list is clickbale

# Adding Favorites

- Each card will have a favortie icon
- All favorites movie will be added to a new page (Favorite Component)
- User has the ability to add or remove form fravoti by cliking on same heart icon
- Icon toggles from outline to filled and vice versa on click

# Adding category filter

# Persisiting redux store

# Dashboard Component

- User can update username and profile photo

# Bug fix

- If user is logged in , do not allow to navigate to login/signup page
- If user is not logged in , do not allow to navigate to homepage
- Unsubscibe onauthstatechange callback when component unmounts
