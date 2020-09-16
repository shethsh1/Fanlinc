**Team Name: STACT**
# Sprint 2 Planning Meeting
**Meeting Minutes: October 25th, 2019 [12 pm - 2pm]**

## Participants

Muneeb Hashmi\
Shaahid Sheth\
Didar Ibrahim\
Afzal Patel\
Muhes Ariyaratnam\
Alim Maredia\
Weide Lu

## Important Dates

October 24th, 2019 (11am - 12pm): Start Sprint 1 retrospective meeting.\
October 25th, 2019 (12pm - 2pm): Start Sprint 2 planning meeting. Task breakdown and assignments.\
October 27th, 2019 (2pm - 5pm): Start Sprint 2 coding.\
October 29th, 2019 (2pm - 4pm): Group meeting, work on our parts. Discuss anything that's missing\
October 31st, 2019 (2pm - 4pm): Group meeting. Go over system architecture/design. Help each other in their respective parts\
November 3rd, 2019 (2pm - 4pm): Group meeting. Go over each other's code and debug any error that's found.\
November 4th, 2019 (2pm- 5pm): Group meeting. Prepare for sprint 2 demo preperation.\
November 5th, 2019 (11am - 12pm): Present Sprint 2 demo.
 
## Main Decisions

* **Which features should we implement for sprint 2?**
* **Do we need to re-prioritize user stories?** 
* **How should we update our system design?**
* **How should we break down Sprint 1 workload and distribute it within the group?**
* **How are we going to break down the user stories into tasks and assign them?**

### Which features should we implement for sprint 2?

After completing sprint 1, we decided to ramp up our work and implement some key features. These features included:\
* Creating fandoms
* Distinguishing what type of fan a user is
* Create posts
* Viewing posts
* Commenting on posts 

### Do we need to re-prioritize user stories?

The user stories we have right now are already sufficient. We decided there’s no need to re-prioritize any user stories.

### How should we break down Sprint 2 workload and distribute it within the group?

Since Muneeb did RPM.md and Sprint1.md the last sprint, it was only fitting that he did the type up for SR2.md along with Sprint2.md. Similarly, David and Shaahid would handle any updates for the system design. The Jira tracking was overlooked by Shaahid once again, but we all decided to be more consistent this time. 

The rest, which was mainly the coding, would be decided after we broke down each user story into tasks. 

### How are we going to break down the user stories into tasks and assign them?

Similar to the previous sprint, we decided to break down each user story according to our MVC model. This would be done during our Sprint 2 meeting on October 25th.

Our first user story (fandom creation), we decided to break it down to testing errors, making the controllers and models for both updating and adding fandoms along with the getter for fandom, and finally making the outline for the front end with react. We assigned them according to our discussion during the meeting. Similarly, for creating posts and posting comments, we made split the task into creating the controllers, models, and designing the front end as well. For viewing posts, we just split that task into designing the UI and then implementing it. 

Generally speaking, creation would be split up into controllers, models, and front end. Viewing posts and distinguishing what type of fan would only require design and a controller respectively. For each subtask, we all volunteered on who would do what during our meeting, making sure all of us had at least one task to do. This was the most convenient and easiest way to assign subtasks to every member of the group as everyone was satisfied with what they were doing.


# Sprint 2 Backlog

## Sprint Goals

### The Features

* Users are able to create non-existent fandoms as a general fan
  * Able to create a community
  * Checks if fandom is created or not
    * Sends error message if it is
  * There is a genre bar for fixed genre's for users to choose from
* Users can distinguish themselves as what type of fan they are
  * Their type of fan is distinguished by their level
    * Levels 1-4, 1 being the most common fan, 4 being the highest
  * They can remove any fandoms they don't want to be associated with
  * Error if they're already in the fandom
  * View fandoms they aren't in
* Users can create posts in a particular fandom that they’re involved in
  * The post shows up in the fandom
  * The post is shown for users that are involved with the fandom
  * Users can't create posts if they're not in the fandom
  * If the user was previously part of the fandom, they can still see the post.
* Users can view posts of the fandoms they’re associated with
  * Organized neatly
  * Split into regular posts and auction posts
  * Ability to click the title of the post and see the comments of that post
  * Ability to click on the users profile
  * Users see newest post on the top
* Users can reply to posts that they can see. 
  * This would be ideal for bidding on items on auction posts as well.
  * The most recent comment on top 
  * Ability to click on the users profile

## Referenced User Stories

### Fandom Creation
As Bob, a general fan, I want to be able to create a non-existent fandom for a certain fanbase, so that I could create a community.
* **Priority:** Highest
* **Point Estimate:** 55

### Fan Type Distinction
As a user with an account, I want to be able to distinguish myself as the type of fan I am by selecting a level for each fandom that I want to be associated with, so that I could distinguish myself as what kind of fan I am for that fanbase.
* **Priority:** Highest
* **Point estimate:** 55

### Create Posts
As Bob, a general fan, I want to be able to create a post in a particular fandom that I’m involved in so that I could open up a discussion, or notify the group about an event.
* **Priority:** Medium
* **Point Estimate:** 55

### Viewing Posts
As Bob, a general fan, I want a clean interface where I could view posts, so that I don't miss any updates on any of the fandoms I am associated with.
* **Priority:** Medium
* **Point Estimate:** 34

### Commenting on Posts
As Bob, a general fan, I should be able to reply to any posts and auctions, so that I could give my opinions or bid on an item that is up.
* **Priority:** Medium
* **Point Estimate:** 34

## Task Breakdown

### Fandom Creation
  1.1. Creating the Fandom model **<-(Didar Ibrahim)**\
  1.2. Creating the Fandom controller **<-(Muneeb Hashmi)**\
  1.3. Handling errors for Fandom controller **<-(Didar Ibrahim)**\
  1.4. Make the front end view for fandom creation **<-(Shaahid Sheth)**\
  1.5. Make the outline of the create fandom in react **<-(Muhes Ariyaratnam)**\
  1.6. Create getting fandoms method **<-(Alim Maredia)**

### Fan Type Distinction
  2.1. Add on to the fandom controller **<-(Afzal Patel)**

### Create Post
  3.1. Make the post model **<-(Wei Lu)**\
  3.2. Make the controller for post **<-(Afzal Patel)**\
  3.3. Front end view for post **<-(Wei Lu)**

### View Post
  4.1. Design the entire UI for the fandom page interface **<-(Muhes Ariyaratnam)**
  4.2. Make getter controllers and implement to the front end **<-(Shaahid Sheth)**

### Commenting on Posts
  5.1. Design the UI for commenting on a post **<-(Muhes Ariyaratnam)**\
  5.2. Make the model for comments **<-(Muneeb Hashmi)**\
  5.3. Make the controller for comments **<-(Alim Maredia)**\
  5.4. Make the front end view for commenting **<-(Shaahid Sheth)**
