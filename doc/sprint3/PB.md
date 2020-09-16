# Product Backlog

## Numerical Series

For this project we will be using the Jira scale to prioritize each user story. The priorities are ranked from highest, high, medium, low, and lowest.

To denote the stages of difficulty of each user stories, we will be using the fibanocci sequence running from 0, 1, 2, 3, 5, 8, 13, 21, 34, 55, and 89.
Zero (0) will be the lowest complexity and eighty-nine (89) will be the highest complexity for the user stories.

## User Stories 

1. As a user, I want to be able to create an account with a display name, email, password, and choose my roles so that I can have my very own account.

**Criteria of Satisfaction:**

* There is an optional roles category for vendor / cosplayer and both can be attached or none as the default is casual user
* Verify that the passwords being entered when registering is longer than 8 characters.
* Have error messages / success messages whether the registration succeeded
* Checks to see if the account doesn't already exist
* Checks to see if its a valid email address

**Point estimate: 84    Priority: Highest** 

---

2. As a user, I want to be able to log in with a email and password so I can have access to my account

**Criteria of Satisfaction:**

* Make sure that when the user logs in, it will redirect the user to the fanlinc webpage and can use all functionality.
* Make sure they can logout and go back to the login screen
* Make sure they are using valid account info that exist in our database

**Point estimate: 55    Priority: Highest** 

---

3. As a user with an account, I want to be able to view my name, my profile picture, email, and my biography, so I can observe my account info

**Criteria of Satisfaction:**

* All information is loaded when user clicks on their profile
* User must be logged in to view profile
* If certain properties aren't set, show blank

**Point estimate: 55    Priority: High** 

---

4. As a user with an account, I want to be able to set my name, my profile picture, and my biography so that I can personalize my account .

**Criteria of Satisfaction:**

* When the user edits their information, their information will be automatically updated once done editing.
* When the user edits, make sure, that the user knows they are in editing mode.
* All said entries are editable

**Point estimate: 84   Priority: High** 

---

5. As Bob, a general fan, I want to be able to create a non-existent fandom for a certain fanbase, so that I could create a community.

 **Criteria of Satisfaction:**

* See if the fandom is created or not.
* If the fandom is not created, allow the user to create the fandom.
* If the fandom already exists, send an error message to the user.
* There is a genre bar of fixed genre's

**Point estimate: 55  Priority: High** 

---

6. As a user with an account, I want to be able to distinguish myself as the type of fan I am by selecting a level for each fandom that I want to be associated with, so that I could distinguish myself as what kind of fan I am for that fan base.

**Criteria of Satisfaction:**

* Ability to select their fandom level
* Ability to see what level they are on their posts
* Ability to remove fandoms they are in
* Error if they attempt to join a fandom they are already in
* Ability to view fandom they aren't in

**Point estimate: 55  Priority: High** 

---

7. As Bob, a general fan, I want to be able to create a post in a particular fandom that I’m involved in so that I could open up a discussion, or notify the group about an event.

**Criteria of Satisfaction:**

* Make sure the post shows up on the fandom after I click post
* Make sure the post is shown on the respective fandom to those that follow the fandom
* Inability to create post if you aren't in the fandom although if they were in the fandom before the post should still show

**Point estimate: 55  Priority: Medium** 

---

8. As Bob, a general fan, I want a clean interface where I could view posts, so that I don't miss any updates on any of the fandoms I am associated with.

**Criteria of Satisfaction:**

* Make sure the fandoms are correctly organized.
* ability to click the title to then see the entire post plus comment section
* Make sure new post appears at the top
* Ability to click the user to view their profile

**Point estimate: 34  Priority: Medium** 

---

9. As Bob, a general fan, I should be able to reply to any posts and auctions, so that I could give my opinions or bid on an item that is up.

**Criteria of Satisfaction:**

* Make sure once a fan clicks on a post there's a comment section
* Make sure the post are saved
* Make sure the most recent comment is at the top
* Ability to click user to view their profile

**Point estimate: 34  Priority: Medium** 

---

10. As Anthony, a vendor/artist, I want to be able to create auctions so that I can advertise and sell my products.

**Criteria of Satisfaction:**

* Make sure they can put a price, title, quick sale image on their product, and minimum bid
* Make sure other users can bid on it
* Make sure all appropriate error messages are shown
* Make sure that that the auctioneer can view the profile of the bidder

**Point estimate: 55  Priority: Medium** 

---

11. As Anthony, a vendor/artist, I want to be able to do everything a general fan can do plus be identified as a vendor/artist so that I could be filtered out when users search for me.

Criteria of Satisfaction:

* In their profile it shows that they are a vendor
* It shows the name of the vendor that made the auction once you try to bid

**Point estimate: 9  Priority: Low** 

---

12. As Anthony, a vendor/artist, I want to be able to view my current auctions and delete the ones that are either sold or no longer needed.

**Criteria of Satisfaction:**

* Make sure vendors have their own auction profile page in profile
* Make sure its accurate with the database info
* Make sure they have the ability to delete unwanted auctions
* Make sure it's only their auctions that they see

**Point estimate: 55  Priority: Low** 

---

13. As Bob, a general fan, I want to be able to search for my fandoms via a search bar in my fandom page, so that if it becomes crowded I could navigate my fandoms

**Criteria of Satisfaction:**

* Make sure there is a search bar in both auction page and fandom page
* Make sure they can search by title
* Make sure if they don't search anything it shows everything in that fandom

**Point estimate: 84  Priority: Low** 

---

14. As Zach, a cosplayer, I want to be able to do everything a general fan can do plus be identified as a cosplayer so that I could be filtered out when users search for me.

**Criteria of Satisfaction:**

* When a user searches for a specific cosplayer, their profile displays that they are a cosplayer
* On their profile you could see a collection of pictures
* Ability for cosplayers to add multiple pictures

**Point estimate: 9  Priority: Lowest** 
