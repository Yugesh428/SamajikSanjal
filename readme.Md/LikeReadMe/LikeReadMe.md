Perfect 🔥 — here is your **LIKE MODULE README.md (copy‑paste ready)** in the same clean style as your Post, Comment, and Follow docs ✅

---

# ✅ ✅ LIKE MODULE README.md

````md
# ❤️ Like Module API

This module handles all **Like-related operations** including:

- Like a post
- Unlike a post
- Toggle like/unlike

---

# 🚀 Features

✅ Like a post  
✅ Unlike a post  
✅ Toggle behavior (one API handles both)  
✅ Prevent duplicate likes  
✅ Updates likeCount automatically

---

# 🧱 Like Structure

```json
{
  "id": "uuid",
  "userId": "uuid",
  "postId": "uuid",
  "createdAt": "date"
}
```
````

---

# 📦 API RESPONSE FORMAT

```json
{
  "success": true,
  "message": "Some message",
  "data": {}
}
```

---

# 📌 API ENDPOINTS

---

## ✅ 1. Like / Unlike (Toggle)

```
POST /api/posts/:id/like
```

---

### 🔐 Headers

```
Authorization: Bearer TOKEN
```

---

### ✅ Behavior

- First request → Like ✅
- Second request → Unlike ✅

---

### ✅ Response (Like)

```json
{
  "success": true,
  "message": "Post liked",
  "data": {
    "liked": true
  }
}
```

---

### ✅ Response (Unlike)

```json
{
  "success": true,
  "message": "Post unliked",
  "data": {
    "liked": false
  }
}
```

---

# ⚠️ Rules

| Action         | Requirement  |
| -------------- | ------------ |
| Like           | Logged in ✅ |
| Unlike         | Logged in ✅ |
| Duplicate Like | Prevented ✅ |

---

# 🔄 How It Works

### 👉 First click

- No like exists ❌  
  ✅ New like created  
  ✅ likeCount increases

---

### 👉 Second click

- Like exists ✅  
  ✅ Like removed  
  ✅ likeCount decreases

---

# 🔥 Example Flow

```
POST /api/posts/123/like
```

### ✅ First call

➡️ Post gets liked

### ✅ Second call

➡️ Post gets unliked

---

# 💯 Summary

✅ Toggle like/unlike system  
✅ One API for both actions  
✅ Prevent duplicate likes  
✅ Clean response structure  
✅ Real social media behavior

---

```

---

# ✅ ✅ NOW YOU HAVE FULL DOCS

You now completed:

✅ Post README ✅
✅ Like README ✅
✅ Comment README ✅
✅ Follow README ✅

👉 💯 Fully documented backend system

---

# 🚀 NEXT (VERY IMPORTANT 🔥)

👉 Say:

**"Create main README (full project)"**

I’ll combine everything into a **🔥 portfolio-level GitHub README** that makes your project look professional and job-ready 💼
```
