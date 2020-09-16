**Team Name: STACT**
# Sprint 1 Planning Meeting

## Meeting Minutes: October 8th, 2019 [12 pm - 2pm]

## Participants

Muneeb Hashmi\
Shaahid Sheth\
Didar Ibrahim\
Afzal Patel\
Muhes Ariyaratnam\
Alim Maredia\
Weide Lu

## Important Dates

* October 8th, 2019 (11am - 12pm): Start sprint 1 planning meeting
* October 12th, 2019 (12pm - 2pm): Start learning React, Flask, and MVC design pattern.
* October 15th, 2019 (12pm - 2pm): Meeting to start coding for sprint 1. Task breakdown and assignments.
* October 21st, 2019 (12pm - 2pm): Sprint 1 Demo Presentation practice
* October 22nd, 2019 (11am - 12pm): Sprint 1 Demo
 
# Main Decisions

* **Which three features should we implement for sprint 1?**
* **Do we need to re-prioritize user stories?**
* **Which code design pattern should we use?**
* **Which databases should we work with?**
* **Should we use React or PHP? Should we use Python & Flask or Java & Spring Boot? Which languages work together the best and optimal for our project? Which API should we use for the back end?**
* **How should we break down Sprint 1 workload and distribute it within the group?**
* **How are we going to break down the user stories into tasks and assign them?**

**Which three features should we implement for sprint 1?**

We looked at all the features we needed to implement before we made any decision. Observing all user stories, we all decided it was best to work on registration, logging in, and editing and viewing profiles. These were the features that we felt were the starting points to the project, as it was essential to accessing all the other features in the project. 

**Do we need to re-prioritize user stories?**

We agreed that we needed to re-prioritize our user stories as we needed it to fit our release schedule. With a few tweaks during the meeting, we all made decisions that ended up re polishing our user stories once again.

**Which code design pattern should we use?**

We decided to use the traditional MVC design pattern. This was because it helped organize our code into where each logic would be in the application. For example, our model would handle the databases using MySQL, MySQL Alchemy, our controller would use the model where our view would render the result. It was a clean concept that worked for everyone.

**Which database should we work with?**

We decide to use MySQL and MySQL Alchemy as it helped form our database easily. It was also something we all felt comfortable to work with.

**Should we use React or PHP? Should we use Python & Flask or Java & Spring Boot? Which languages work together the best and optimal for our project? Which API should we use for the back end?**

We decided to use Python & Flask for our backend because two of our members are very familiar with the Flask framework and the rest of the group had excellent knowledge of Python. Throughout the project, we also decided to use the REST API as we were all new to front-end and it was in the scope of this course. We didn’t know many other API’s as well so we saw it best to use REST API.

**How should we break down Sprint 1 workload and distribute it within the group?**

We decided that Muneeb would do RPM.md along with Sprint1.md. David and Shaahid would handle the systemdesign.pdf. The Jira tracking was managed by Shaahid.

The rest, which was mainly the coding, was all decided during our meeting on October 15th.

**How are we going to break down the user stories into tasks and assign them?**

We decided to make a controller class for login, registration, and editing profile. Each user story would have around 3 sub tasks and we would assign them according to our decision during our meeting.

For the registration task, we decided to break it into 4 parts, which was essentially creating the back-end, front-end, designing the registration and handling all the errors. For the login task, we broke the code down to building the controller class and the view for react as well. We decided to do the same for viewing profile. Editing profile needed to broken down to what can the user edit, which was broken down to the bio, name, profile picture, along with building the controller in the code for profile.

For each subtask, we distributed the work during our meeting, and worked with whatever everyone was comfortable with.


# Sprint 1 Backlog

## Sprint Goals

### Three Features

* **Users are able to log in**
  - They log in using their credentials 
  - Credentials are verified
    - No long passwords
    - No long usernames
    - Email is verified
    - First and Last names can’t be too lengthy
  - Users can log out
  - Takes you to a home page upon registration where they can log out, or access their profile as well
* **Users can register**
  - Users register using their email and password as credentials
    - If it already exists, it won’t work
  - They have the option to select vendor or cosplayer upon registration for distinction purposes
  - The credentials gets created in the MySQL database
* **Users can view and edit their profile (Broken down to two parts: viewing and editing profile)**
  - Users click on their own profile and view it
  - They can edit their display picture, their username, their password, and bio
  - A success sign is shown when edited

### The System Design

* Finish CRC Cards
* Properly design the system so everything works out well.
* Connect them to finish the **UML/SystemDesign**

# Referenced User Stories

## Registration
As a basic user, I want to be able to create an account with a display name, email, password, and choose my roles so that I can have my very own account.
**Priority:** Highest
**Point Estimate:** 84

## Login
As a basic user, I want to be able to log in with an email and password so I can have access to my account.
We also created a logout feature in the homepage.
* **Priority:** Highest
* **Point estimate:** 55

## View Profile
As a basic user with an account, I want to be able to view my name, my profile picture, email, and my biography, so I can observe my account info
* **Priority:** Highest
* **Point Estimate:** 55

## Edit Profile
As a basic user with an account, I want to be able to set my name, my profile picture, and my biography so that I can personalize my account.
* **Priority:** Highest
* **Point Estimate:** 84

# Task Breakdown

## Registration
1.1. Back-end for creating an account **<- (Shaahid Sheth)**\
1.2. Setting up the front end **<- (Muneeb Hashmi)**\
1.3. Design the registration **<- (Afzal Patel)**\
1.4. Handling the errors in the controllers **<- (Shaahid Sheth)**

## Login (Assigned: Alim Maredia, Helped: Weide Lu)
2.1. Create the Controller for login\
2.2. Create the View for React

## View Profile (Assigned: Muhes Ariyaratnam)
3.1. Create the Controller for Profile\
3.2. Create the front-end for Profile

## Edit Profile
4.1. Create ProfileController as part of back end **<- (Weide Lu)**\
4.2. Making the biography editable **<- (Weide Lu)**\
4.3. Making the profile picture editable **<- (Didar Ibrahim)**\
4.4. Making the display picture editable. **<- (Didar Ibrahim)**
