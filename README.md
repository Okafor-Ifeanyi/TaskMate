# Taskmate by `Group 7`

## Prerequisites
-   npm installed
-   IDE eg _vscode_
-   CLI eg _postman_

## How to start code
1.  Clone or Download repositry
2.  Setup .env file => `port`, `mongo_uri`, `jwt _secret`
2.  run `npm install`
3.  run `npm start`
>   Post-it is ready for use

## Live Server `@render`
>   [Render Live](https://taskmate-mwru.onrender.com)

## Postman Documentation
>   [Postman Docs](https://documenter.getpostman.com/view/19026826/2s93eWzsSf)  



## Model Diagram
>   [Diagrams on dbdiagrams.io](https://dbdiagram.io/d/64530448dca9fb07c477a04a)

## Design Pattern
For this API `layered_structure` was abopted for the main purpose of creating 
all the files in an order that could acomodate the rest easily. This structure was optimized 
as `scalable` and the best for the project decided by the developer. 
> Developer: "If I can get one path right, then the rest would be `cake`"
    
## **Soft Delete** 
This feature was implemented by adding an extra attribute to the Postit model called `deleted`
**Posts**
```json
{
    "post": "Soft delete feature",
    "ownerID": "640a12d5f6020fee349f8219",
    "deleted": false    // default: false
}
```
the delete `http request` in the controller is set to `PATCH` => updates deleted attribute in the post to true. 
**Posts**
```json
{
    "post": "Soft delete feature",
    "ownerID": "640a12d5f6020fee349f8219",
    "deleted": true
}
```

## **Validations**

**Joi Validation**
    `Joi` validation was used as my `schema validator` to validate all `req.body` data sent sent by the user to match my model before being sent to controller.js for use.

**JWT**
    `jwt token` for `login` authorization and specification too
>   installed `jsonwebtoken`

## POSTMAN Features Adopted
    
### Environment
    Used postman environment to keep url paths neat and simple
-   _env name_ => `DEV: TaskMate`
-   _variable_ => `USER` // {{USER}}
-   _initial value_ => `localhost:3838/api/v1/users/`

### Set an Environment Variable
    Automate authorizstion setting by setting your `jwt_token` to this an _env variable_ 
> ref: [Youtube Video - time @7:46:45](https://youtu.be/0sOvCWFmrtA)

## Error Handler
    All route endpoints stored in `try/catch` to hold asyn and sync errors
    API probed to remain active under all circumstance.
    Ready for Deployment

## User AvatarUrl / Image Tag
A special feature was adopted in this api, giving a unique avatar to all users with information drafter
from their provided details, this feature was made possible using [`dicebear api`](https://www.dicebear.com/) to generate random avatars and return an `avatar url`. **Image Tag** was included in the user model to hold a `html` img tag for the avatar url.

![Avatar](https://api.dicebear.com/5.x/pixel-art-neutral/svg?seed=prince247-98t6l-gmail-aguyj-com&size=200&radius=50)

> img_tag: **"<img src=\"${avatarUrl}\" alt=\"Avatar image for profile picture\" />"**