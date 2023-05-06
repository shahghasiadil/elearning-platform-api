# E-Learning Platform API

A RESTful API built using Node.js, Express, and MongoDB for creating and managing an e-learning platform where instructors can create courses, and students can enroll in courses, access course materials, and attempt quizzes. The platform also features user authentication and authorization, discussion forums, progress tracking, and gamification.

## Features

- User authentication and authorization with JWT
- Role-based access control (Student, Admin and Instructor)
- Course and lesson management (Create, Read, Update, Delete)
- Student enrollment in courses
- Quiz management (Create quizzes with multiple-choice questions)
- Quiz attempts and score tracking
- Discussion forums with posts and comments
- Progress tracking for students
- Gamification with badges and leaderboard

## Prerequisites

- Node.js (v14 or later)
- MongoDB (v4.4 or later)

## Installation

1. Clone the repository:
   `git clone https://github.com/shahghasiadil/elearning-platform-api`

`cd elearning-platform-api`

2. Install the dependencies:

```
npm install
```

3. Create a `.env` file in the root directory and add your MongoDB connection string and JWT secret:

4. Start the server:

```
npm run start
```

The API will be available at `http://localhost:3000/api`.

## API Endpoints

### User

- POST `/api/auth/register`: Register a new user
- POST `/api/auth/login`: Login an existing user
- GET `/api/auth/me`: Get the logged-in user's profile
- PATCH `/api/auth/me`: Update the logged-in user's profile
- DELETE `/api/auth/me`: Delete the logged-in user's profile
- GET `/api/auth/users`: Get all users (Admin only)
- GET `/api/auth/instructors/:id/courses`: Get Instructor Courses

### Courses

- POST `/api/courses`: Create a new course (Instructor only)
- GET `/api/courses`: Get all courses
- GET `/api/courses/:id`: Get a course by ID
- PATCH `/api/courses/:id`: Update a course (Instructor only)
- DELETE `/api/courses/:id`: Delete a course (Instructor only)
- POST `/api/courses/:id/enroll`: Enroll in a course (Student only)
- POST `/api/courses/:id/materials`: Upload course materials (Instructor only)

### Quizzes

- POST `/api/courses/:courseId/quizzes`: Create a quiz for a course (Instructor only)
- GET `/api/courses/:courseId/quizzes`: Get all quizzes for a course
- POST `/api/quizzes/:quizId/attempt`: Attempt a quiz (Student only, enrolled courses)

### Forums

- POST `/api/courses/:courseId/forums`: Create a forum post for a course (Authenticated users)
- GET `/api/courses/:courseId/forums`: Get all forum posts for a course
- PUT `/api/courses/:courseId/forums/:postId`: Update a forum post (Post author only)
- DELETE `/api/courses/:courseId/forums/:postId`: Delete a forum post (Post author only)
- GET `/api/courses/:courseId/forums/:postId`: Get a forum post by ID

### Comments

- POST `/api/courses/:courseId/forums/:postId/comments`: Create a comment for a forum post (Authenticated users)
- GET `/api/courses/:courseId/forums/:postId/comments`: Get all comments for a forum post
- PUT `/api/courses/:courseId/forums/:postId/comments/:commentId`: Update a comment (Comment author only)
- DELETE `/api/courses/:courseId/forums/:postId/comments/:commentId`: Delete a comment (Comment author only)

### Lessons

- POST `/api/courses/:courseId/lessons`: Create a lesson for a course (Course instructor only)
- GET `/api/courses/:courseId/lessons`: Get all lessons for a course
- GET `/api/courses/:courseId/lessons/:lessonId`: Get a specific lesson by its ID
- PUT `/api/courses/:courseId/lessons/:lessonId`: Update a lesson (Course instructor only)
- DELETE `/api/courses/:courseId/lessons/:lessonId`: Delete a lesson (Course instructor only)

### Badges

- POST `/api/badges`: Create a badge (Admin only)
- GET `/api/badges`: Get all badges (Admin only)
- PUT `/api/badges/:badgeId`: Update a badge (Admin only)
- DELETE `/api/badges/:badgeId`: Delete a badge (Admin only)

### Progress

- GET `/api/courses/:courseId/progress`: Get course progress for the current user (Student only, enrolled courses)
- POST `/api/courses/:courseId/progress/:lessonId`: Mark a lesson as completed (Student only, enrolled courses)

### Leaderboard

- GET `/api/leaderboard`: Get the leaderboard based on total points

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
