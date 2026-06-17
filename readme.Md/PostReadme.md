Perfect ✅ — here is your **FULL COPY‑PASTE READY `README.md` (Post Module + API Documentation)** 🔥  
👉 You can directly paste this into Markdown → then convert to PDF ✅

***

# 📌 Post Module API

This module handles all **Post-related operations** including:

* ✅ Create Post (with media)
* ✅ Get All Posts (Feed)
* ✅ Get Single Post
* ✅ Update Post
* ✅ Delete Post

***

# 🚀 Features

✅ Create posts with text, images, and videos  
✅ Multiple media upload  
✅ Fetch posts with full relations  
✅ Update own posts  
✅ Delete posts with cleanup

### ✅ Includes:

* User info (name, username, avatar)
* Media (images/videos)
* Likes (with user)
* Comments (with user + replies)
* Shares (with user)

***

# 🧱 Post Structure

```json
{
  "id": "uuid",
  "userId": "uuid",
  "caption": "Post text",
  "likeCount": 0,
  "commentCount": 0,
  "shareCount": 0,
  "createdAt": "date",
  "updatedAt": "date"
}
```

***

# 📦 API RESPONSE FORMAT (IMPORTANT)

All APIs follow this structure:

```json
{
  "success": true,
  "message": "Request successful",
  "data": {}
}
```

***

# ⚠️ Frontend Usage

```js
const res = await axios.get("/api/posts");

// ✅ Access data
const posts = res.data.data;
```

***

# 📌 BASE URL

```
/api/posts
```

***

# 📑 API ENDPOINTS

***

## ✅ 1. Create Post

```
POST /api/posts
```

### 🔐 Headers

```
Authorization: Bearer TOKEN
Content-Type: multipart/form-data
```

### 📦 Body (form-data)

| Key     | Value     |
| ------- | --------- |
| caption | Post text |
| media   | file(s)   |

✅ You can upload multiple files

***

### ✅ Response

```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "id": "postId",
    "caption": "Hello world"
  }
}
```

***

## ✅ 2. Get All Posts (Feed)

```
GET /api/posts
```

***

### ✅ Response

```json
{
  "success": true,
  "data": [
    {
      "id": "post1",
      "caption": "Hello world",
      "user": {
        "id": "user1",
        "name": "Yugesh",
        "username": "yugesh123",
        "avatar": "avatar.jpg"
      },
      "media": [
        {
          "id": "media1",
          "url": "/uploads/image.jpg",
          "type": "image"
        }
      ],
      "likes": [
        {
          "user": {
            "id": "user2",
            "name": "Ram"
          }
        }
      ],
      "comments": [
        {
          "id": "comment1",
          "content": "Nice post",
          "user": {
            "id": "user3",
            "name": "Shyam"
          }
        }
      ],
      "shares": [
        {
          "id": "share1",
          "user": {
            "id": "user4",
            "name": "Hari"
          }
        }
      ]
    }
  ]
}
```

***

## ✅ 3. Get Single Post

```
GET /api/posts/:id
```

***

### ✅ Response

```json
{
  "success": true,
  "data": {
    "id": "post1",
    "caption": "Hello world",
    "user": {},
    "media": [],
    "likes": [],
    "comments": [],
    "shares": []
  }
}
```

***

## ✅ 4. Update Post

```
PUT /api/posts/:id
```

***

### 🔐 Headers

```
Authorization: Bearer TOKEN
```

***

### 📦 Body

```json
{
  "caption": "Updated caption"
}
```

***

### ✅ Rules

* ✅ Only post owner can update

***

### ✅ Response

```json
{
  "success": true,
  "message": "Post updated successfully",
  "data": {
    "id": "post1",
    "caption": "Updated caption"
  }
}
```

***

## ✅ 5. Delete Post

```
DELETE /api/posts/:id
```

***

### 🔐 Headers

```
Authorization: Bearer TOKEN
```

***

### ✅ Rules

* ✅ Only owner can delete

***

### ✅ Deletes Automatically

* Media ✅
* Likes ✅
* Comments ✅
* Shares ✅

***

### ✅ Response

```json
{
  "success": true,
  "message": "Post deleted successfully",
  "data": null
}
```

***

# 🖼 Media Handling

* Stored in `/uploads`
* Supports:
  * ✅ Images
  * ✅ Videos
* Multiple uploads supported

***

# 🔐 Authorization Rules

| Action      | Requirement  |
| ----------- | ------------ |
| Create Post | Logged in ✅  |
| Update Post | Owner only ✅ |
| Delete Post | Owner only ✅ |

***

# 🔥 Example Flow

### ✅ Create → Fetch → Update → Delete

```
POST   /api/posts
GET    /api/posts
GET    /api/posts/:id
PUT    /api/posts/:id
DELETE /api/posts/:id
```

***

# 💯 Summary

This Post Module provides:

✅ Full CRUD operations  
✅ Media upload support  
✅ Relationship handling (user, media, likes, comments, shares)  
✅ Clean API structure  
✅ Production-ready design

***

# 👨‍💻 Author

**Yugesh Bastola 🚀**

```

---

# ✅ ✅ WHAT YOU NOW HAVE

✅ Fully documented Post API  
✅ Copy–paste ready Markdown  
✅ Ready for PDF / GitHub  
✅ Professional API docs  

---

# 🚀 NEXT STEP

If you want next:

👉 Like module docs  
👉 Comment module docs  
👉 Swagger auto-docs  

Just say 👍
```
