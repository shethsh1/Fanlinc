**Team Name: STACT**
# Sprint 3 Planning Meeting
**Meeting Minutes: November 9th, 2019**

## Participants

Muneeb Hashmi\
Shaahid Sheth\
Didar Ibrahim\
Afzal Patel\
Muhes Ariyaratnam\
Alim Maredia\
Weide Lu

## Important Dates
**November 5th, 2019 (12pm - 1pm):** Start Sprint 2 retrospective meeting.\
**November 9th, 2019 (12pm - 2pm):** Start Sprint 3 planning meeting. Task breakdown and assignments.\
**November 10th, 2019 (2pm - 5pm):** Start Sprint 3 coding.\
**November 18th, 2019 (2pm - 5pm):** Prepare for Sprint 3 demo.

## Main Decisions

* **Which features should we implement for sprint 3?**
* **Do we need to re-prioritize user stories?** 
* **Do we need to re-evaluate our code?**
* **How should we update our system design?**
* **How should we break down Sprint 3 workload and distribute it within the group?**
* **How are we going to break down the user stories into tasks and assign them?**

### Which features should we implement for sprint 3? 

After completing sprint 2, there were still key features left that needed to be implemented for Fanlinc to become a releasable website. These features included: 
  * Creating auctions as a vendor/artist to advertise their product
  * Searching for fandoms to filter out other fandoms as a general fan
  * A vendor/artist should be able to be identified as one by other users on the platform when being looked up
  * A cosplayer should be able to be identified as one by other users on the platform when being looked up.
  * A vendor can see their current auctions and be able to delete the ones they don’t need

### Do we need to re-prioritize user stories?

All user stories remain at their current priority. We decided there’s no need to re-prioritize any user stories. We did, however, get rid of the 15th user story, which was administrative roles. We also decided to add user story #12 where a vendor can see their sales information.

### Do we need to re-evaluate our code

After talking to Leith, we made an executive decision to get rid of the admin controllers. This was because that Leith himself did not want vendors and cosplayers to be certified.  We also decided to add a new model. This model would handle all the images a cosplayer would post of themselves in a page called collections.

### How should we update our system design? 

### How should we break down Sprint 3 workload and distribute it within the group?

The group all came together to do the Sprint 2 retrospective document. Both Muneeb and David teamed up to work on sprint3.md for this sprint. Finally, and similarly to last sprint, David and Shaahid would handle any updates/changes for the system design. The Jira tracking was overlooked by Shaahid once again, but we all decided to be more consistent this time.

The coding would be decided after we broke down each user story into tasks in the Sprint 3 Planning meeting. 

Before we started anything, we would first look into Joe’s recommendations that he gave during our sprint 2 demo to fix up all the errors he told us about. 

### How are we going to break down the user stories into tasks and assign them? 

Similar to the previous sprint, we decided to break down each user story according to our MVC model. This would be done during our Sprint 3 meeting on November 9th.\

For auctions, we broke it down to a controller and the front end for it. The controller would handle the auctions needs whilst the front end would show the functionality of the auction. 

For search, we broke it down to controller, an outline for the search bar, and the general front end for it. This followed the same routine as auctions -- the controller would handle the search’s needs (such as queries), the outline would set up the front end to be made for the search bar’s functionality. 

For dividing categories (vendors and cosplayers), we would make the controller have getters and setters. The second part would be setting up the front end for seeing the profile auctions of the vendor.

For the posts for vendors/artists, we made a controller that would retrieve the information of that sale post.
The creation would be split up into controllers, models and outlines, and front end. For each subtask, we all volunteered on who would do what during our meeting, making sure all of us had at least one task to do. This was the most convenient and easiest way to assign subtasks to every member of the group as everyone had an equal amount of work to do.


# Sprint 3 Backlog

## Sprint Goals

### The Features

* Users that are vendors/artists are now able to create their own auctions to sell their products
  * Able to create a bid on their product
  * Error messages will show if user makes an invalid input (i.e. minimum bid not satisfied)

* All users will now be able to use the search bar to search for their specific fandoms
  * Users are able to search by the title of the fandom
  * The search bar will be available in both auction and the fandom page

* If a user is a vendor/artist, their profile will specifically categorize them as a vendor/artist, so when other users look them up, users will know if they are a vendor/artist
  * The profile page will display that a user is also a vendor/artist
  * The name of the vendor will be shown to the user who has made a bid on an item

* Vendors/artists will be able to view their selling or sold items and will be able to remove any of their items
  * Each vendor/artist will have their own profile page
  * They can delete items that they no longer want to sell or has already been sold
  * The vendor/artist can only see their own items

* A user who categorizes themselves as a cosplayer will be able to show that they are a cosplayer within their profile
  * Cosplayers will have the ability to upload multiple pictures in an organized manner
  * Cosplayer’s profile will be able to showcase a collection of their photos

## Referenced User Stories

**_#10. As Anthony, a vendor/artist, I want to be able to create auctions so that I can advertise and sell my products._**

**Criteria of Satisfaction:**

- [x] Make sure they can put a price, description, name, and image on their product
- [x] Make sure people can comment on them
- [x] User is able to contact the seller with email

**Point estimate: 55**   
**Priority: Medium**  



**_#11. As Anthony, a vendor/artist, I want to be able to do everything a general fan can do plus be identified as a vendor/artist so that users can easily search for me._**

**Criteria of Satisfaction:**
- [x] When a user searches for a vendor/artist, their profile shows up as a vendor/artist.
- [x] On the vendor's/artist's profile, the user can see what they are selling.

**Point estimate: 9**   
**Priority: Low**  


**_#14. As Zach, a cosplayer, I want to be able to do everything a general fan can do plus be identified as a cosplayer so that I could be filtered out when users search for me._**

**Criteria of Satisfaction:**

- [x] When someone searches for them, it shows up as cosplayer
- [x] On their profile you could see a collection of pictures

**Point estimate: 9**  
**Priority: Lowest** 

## Changes During Sprint 3  

* In user story 10, we scrapped the idea of implementing a private chat for a user to message a vendor or an artist if they wanted to make a purchase. Instead they are now able to contact them via email.
* In user story 13, we changed our criteria of satisfaction and removed the filtering component of our search feature.
* User story 12 from our original product backlog has been remodelled. Instead of showing vendors and artists statistics of their business, we made it so that they can view and delete their current auctions.
* User story 15 with the administrative feature has been forgone.

## Task Breakdown

### Auction Creations
  1.1. Create the controller that handles all auctions<- (Afzal Patel)
  1.2. Create the front end functionality for auctions<- (Shaahid Sheth)
### Search Bar
  2.1. Create controller to see queries for searches <-(Didar Ibrahim)
  2.2. Add outline for search bar <-(Muhes Ariyaratnam)
  2.3. Create front end functionality for search <-(Muneeb Hashmi)  
### Category Divisor
  3.1. Create controller to set/get your category <-(Alim Maredia)
	3.2. Create front end for seeing profile of auction if user is a vendor/artist  <-(Wei Lu)
### Vendor/Artist Posts
  4.1. Create controller that retrieves sale info <-(Afzal Patel)
### Cosplayer
  5.1. Add cosplayer collage on their profile <-(Muneeb Hashmi)

