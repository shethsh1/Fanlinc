# Release Planning Meeting
## Meeting Minutes (October 8, 2019: 12 - 2pm)
### Participants

Muneeb Hashmi\
Shaahid Sheth\
Didar Ibrahim\
Afzal Patel\
Muhes Ariyaratnam\
Alim Maredia\
Weide Lu

## Goals
* Implementing the three features
* Designing our system
* Project tracking using Jira

## Important Dates

* October 8th, 2019 (11am - 12pm): Start sprint 1 planning meeting
* October 12th, 2019 (12pm - 2pm): Start learning React, Flask, and MVC design pattern.
* October 15th, 2019 (12pm - 2pm): Meeting to start coding for sprint 1. 
* October 21st, 2019 (12pm - 2pm): Sprint 1 Demo Presentation practice
* October 22nd, 2019 (11am - 12pm): Sprint 1 Demo

## Major Decisions

* Which three features should we implement for sprint 1? 
* Do we need to re-prioritize user stories?
* Which code design pattern should we use?
* Which databases should we use?
* Should we use React or Flask? Should we use Python or Java? Which languages work together the best and optimal for our project?
* How should we break down Sprint 1 workload and distribute it within the group?
* How are we going to break down the user stories into tasks and assign them?

# Release Timeline

## Sprint 1

* New users can register for Fanlinc (1)
  - Register using credentials: name, email, password (they have to re enter the password), and optional roles if they want to be distinguished between a vendor, or cosplayer and not just a general fan.
* A user can log in to their account to access their own Fanlinc. (2)
  - Could also log out
* A user can view their own profile (3)
* A user can edit their own profile (4)
  - Edit their name, bio, profile picture, email
  
## Sprint 2

* A user, as a general fan, can create non-existent fandoms so they can create communities/fanbases. (5)
* A user can distinguish what type of fan they are. (6)
  - Different types of levels for each type of fan
  - Useful for searching with filters
* A user can create a post in a particular fandom that they’re involved in so that they could open up a discussion, or notify the group about an event. (7)
* A user can view posts from their dashboard. (8)
* A user can comment/reply to posts that they see on their dashboard. (9)
  - Using their own profile as the user that commented it
  - They can put their price for an item that’s up for auction.
* A user, as a vendor/artist, can create auctions for items to be sold in a particular fandom. (10)

## Sprint 3

* A user can search for other users. This will be done by the filtering system where everyone is already distinguished as who they are (general fan, vendor, cosplayer). (11)
* A user, as a vendor/artist, can see their sale information for the items they’ve put up for auction. (12)
* A user can search for fandoms in their dashboard to filter out other fandoms. (13)
* A user, as a cosplayer, can distinguish themselves as one so they could be filtered out when others search for them. (14)
* System administrators can approve and delete fandoms. They can also delete accounts, vendors, and cosplayers, so that Fanlinc retains its authenticity. (15)

# Referenced User Stories (From PB.md)

1. As a user, I want to be able to create an account with a display name, email, password, and choose my roles so that I can have my very own account.
2. As a user, I want to be able to log in with an email and password so I can have access to my account
3. As a user with an account, I want to be able to view my name, my profile picture, email, and my biography, so I can observe my account info
4. As a user with an account, I want to be able to set my name, my profile picture, and my biography so that I can personalize my account 
5. As Bob, a general fan, I want to be able to create a non-existent fandom for a certain fanbase, so that I could create a community.
6. As a user with an account, I want to be able to select one or multiple genres, fandoms that I want to be associated with, and the level and type of fandom I am so that I could affiliate myself with that fanbase to distinguish what kind of fan I am.
7. As Bob, a general fan, I want to be able to create a post in a particular fandom that I’m involved in so that I could open up a discussion, or notify the group about an event.
8. As Bob, a general fan, I want a clean interface where I could view posts, so that I don't miss any updates on any of the fandoms I am associated with.
9. As Bob, a general fan, I should be able to reply to any posts and auctions, so that I could give my opinions or bid on an item that is up.
10. As Anthony, a vendor/artist, I want to be able to create auctions so that I  can advertise and sell my products.
11. As Anthony, a vendor/artist, I want to be able to do everything a general fan can do plus be identified as a vendor/artist so that I could be filtered out when users search for me.
12. As Anthony, a vendor/artist, I want to be able to see my sales and product info
13. As Bob, a general fan, I want to be able to search for my fandoms via a search bar in my fandom page, so that if it becomes crowded I could navigate my fandoms
14. As Zach, a cosplayer, I want to be able to do everything a general fan can do plus be identified as a cosplayer so that I could be filtered out when users search for me.
15. As a system administrator, I want to be able to delete fandoms, accounts, and approve fandoms, vendors, and cosplayers so that Fanlinc retains its authenticity.
