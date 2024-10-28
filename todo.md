# BE
1. **In progress**

- SendGrid: create template & send email
- Complete register

2. **Todo**

**Common**

- AuthGuard, CheckRoles, Public
- ApiResponse (factory + Schema)
- Exception Filter
- Validation Pipe - exception factory
- Common List Request Queries 
- Study: Validation doc (mapped type & validate arrays) 

**Auth**

- Login
- Login with Google
- Reset password
- Update password
- Refresh token?

**User**
- Get User List (for admin)
- Get User Details (public info of other, full self info) -> public fields
- Update info
- Delete account (30-day windows?)

**Connections**
- Follow
- Un-follow
- Send friend request
- Cancel friend request
- Accept friend request
- Reject friend request
- Un-friend
- Friend list
- Friend requests list (received, sent)

**Post**
- Define Post-related schemas

- Create Post
- Edit Post
- Delete Post 
- Save Post
- Hide Post (news feed)
- Get Post Details
- Get Post List (news feed, own posts, other users' posts)
- React to Post
- Share Post: copy link or add to own's wall (haven't had chat yet)

**(Post) Nested Comments**
- Add comment (root comment, reply)
- Edit comment
- React to comment
- Delete comment
- Retrieve post comments
- Hide comment (own post)

**Handle images**
- Option 1: Store directly on server
- Option 2: Storage Service (S3, Cloudinary, ...) -> find a free one

**Notification**
(create test endpoint for now)
- In-app notification
- Push notification
...