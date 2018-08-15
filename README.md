# Wish List

### Idea:

Web app with capabilities to create a list of items. Items can be added, updated, deleted. In addition, users can upvote/downvote and commment on items/chat feature. URL is required to access a specific wish list (route), otherwise, routes to index.html.

### Uses:

Chores, registries, fundraisers, gift ideas

### API Options:

Walmart
Target
Amazon
Giphy

### Requirements:

index.html - landing page/login
get method - displays list based on user id
post method - create list (adds items to list table, items assigned to user id)


### Tables:

User table: username, pw
Wishlist table: wishlist, fk_userid
Items table: item, fk_userid, fk_wishlist
Comments table: comment, up_vote, down_vote, fk_item, fk_userid
