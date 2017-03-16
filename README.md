# Easy Access: just visit https://maptracker-f38e1.firebaseapp.com/ to view the most recent build


If you wish to build a local copy just perform the following
1) clone the git repository 
2) cd mapTracker
3) npm install
4) npm start
5) Use a web browser to navigate to localhost://3000

This build process use npm v4.3.2

All components can be found under ./mapTracker/src/components

Map Tracker is an app that will track and store the GPS information that is recieved from an API call provided by FindmeSpot.

## FRONT_END
    The front end of this app is using the React Framework using Javascript. The parent object is App.js.
This parent object contains two Child objects userAuthjs, and GpsData.js. App.js will also set up the 
configuration to establish communication with the firebase hosted database

### UserAuth.js - This component is set up to handle the user log-in and authorization using googles credentials
    Depending on the state of the user (logged in/out) the UserAuth.js component will display either logged in
    information, or logged out information. If the user is logged in, their name and selected photo will be displayed.
    If logged out a log in message and button will be displayed along with a log in button. The seperate components that
    handle the two states this app can be in are UserLoggedin.js and UserLoggedOut.js.

### GpsData.js - This component is a non visual component that is strictly responsible for controlling the state of the Map Component
    and rendering the Map Component. To control that state GpsData.js will make calls to the FindmeSpot API to recieve updated 
    API information, and will also read the firebase hosted Database to get data marker information stored in the database.
        
        MapComponent- This is the main heavy lifter of the App. MapComponent will handle rendering of the map object, and call 
            functions to take care of all the various clicking and updating that the app can perform. MapComponent has a child
            object for every map marker that is added. These are called and rendered at the database is updated. These child 
            objects are of type Marker, and a standard component provided by the Google Inplementation. MapComponent will also 
            call Marker Info to display the information of an indiviual marker if it is clicked.

## MIDDLE_WARE
    AXIOS - The only middle connective framework used by this app is axios. Axios is a tool used to make API calls. The app uses 
    predefined API URL that is called using axios. The response to this query is a JSON object that contains the previous 7 days of 
    information from the gps unit that API call is registered to. This JSON object is used to update the database to ensure the 
    continuity of data past 7 days.
    AUTH SERVICE- The Auth Service for this App is handled by Firebase and not developed by me.

## BACK_END
    The entire back end of this project along with project build and hosting is handled by firebase. Firebase is a really easy
    program to use to get a small project up and running fast with little to no overhead in set-up. For this App, firebase provides a 
    no-SQL database to store my GPS data, it also handles the Authorization of the user to acess the Database. Firebase has
    many other tools that can be used to improve and expand this app such as scheduled services.

## FUTURE Plans-
    Ability to add more then one GPS unit to track on the map
    More information diaplayed in the MarkerInfo section.
    A service to automatically update the database every 24 hours.

### Deploy Command Line
    ```
    npm run build
    ```
    ```
    firebase deploy
    ```