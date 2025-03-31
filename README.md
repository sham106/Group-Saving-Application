# Group Savings App

The **Group Savings App** is a full-stack web application designed to help groups manage their savings, contributions, and withdrawals efficiently. It provides features for user authentication, group management, transaction tracking, and withdrawal requests.

---

## Features

- **User Authentication**: Secure user registration, login, and JWT-based authentication.
- **Group Management**: Create and manage groups, add members, and track group savings.
- **Transactions**: Record contributions and withdrawals for each group.
- **Withdrawal Requests**: Submit and process withdrawal requests with admin approval.
- **Role-Based Access Control**: Different roles such as `Group Admin` and `Member` with specific permissions.
- **Modern Frontend**: Built with React.js, Vite, and Tailwind CSS 4 for a fast and responsive user interface.

---

## Tech Stack

### Backend
- **Framework**: Flask (Python)
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy with Flask-Migrate for database migrations
- **Authentication**: Flask-JWT-Extended
- **Validation**: Marshmallow

### Frontend
- **Framework**: React.js
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **State Management**: 

---

## Installation

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher
- PostgreSQL
- Git

---

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/group-savings-app.git
   cd group-savings-app/backend
