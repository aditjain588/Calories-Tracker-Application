# Calories Tracker Application </br>

**Output** </br>
Folder ScreenRecordingOutput contains recording of the output for convinience. Output recording shows working of app, EdgeCasesOutput recording shows how the edge cases and errors have been handled. 
</br>
</br>
**Calories Tracker:** </br>
Application which helps user in tracking calories consumed per day.
</br>

To run the application clone the repo, in terminal type "cd calories_tracker", then type "npm run dev", it should run client and server simultaneously.

</br>

**Features** </br>
- User can create an account and login.
- User can set a calories goal for the day.
- User can enter food consumed along with quantity, like "apple", "1", and an API will fetch the nutrition info of that item and render on UI.
- User will also see how many calories he/she is ahead or behind for that day.

**Technologies Used** </br>
- React (For frontend)
- Cypress (Testing the frontend compoenents using TDD)
- Edanum API (API used to get nutrition imformation of a food)
- Node, Express (For backend routes, API calls and MongoDB calls)
- MongoDB (For database)

**File structure** </br>
- Client
  - Cypress (Contains tests on root level, "login.cy.js" etc)
  - public
    - src
      - Components (Contains react component)
      - Styles (Contains srtyling for react components)
            
          
- Server
   - Index.js (Main file for backend)
   - db (Contains database calls and database config files)
   - Routes (Routes for database calls and edanum food API)
