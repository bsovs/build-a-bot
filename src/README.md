# Docs - WIP

*NOTE: documentation not currently in full. Cleaning up ```reply.js``` and ```database.js``` soon.* 

### Reply
>
>```basic (message, description)``` Generic response. Type: *Discord.Message, String*
>
>```to (message, user, description)``` Response with @user. Type: *Discord.Message, Discord.User, String*
>
>```success (message, description, thumbnail, url)```
>
>```error (message, description, thumbnail, url)```
>
>```image (message, url)```
>
>```imageAndCard (message, hasCard, title, description, thumbnail, url)```
>
>```table (message, list, isInline, header, description, thumbnail, url, color)```
>

### Database - *MongoDB*
>
>```find (tableName, value)``` Find one. Type: *String, Mongo-Query*. Returns first object from table results.
>
>```findAll (tableName, value)``` Find one. Type: *String, Mongo-Query*. Returns Array of all matching results.
>
> ```addOrUpdate (tableName, id, command)``` Type: *String, Mongo-Query-ID, Mongo-Query*.
>
> ```add (tableName, id, command)``` Type: *String, Mongo-Query-ID, Mongo-Query*.
