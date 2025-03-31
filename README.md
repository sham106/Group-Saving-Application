# Group Savings App

The **Group Savings App** is a full-stack web application designed to help groups manage their savings, contributions, and withdrawals efficiently. It provides features for user authentication, group management, transaction tracking, and withdrawal requests.

---

## Features

### Backend Features
- **User Authentication**: Secure user registration, login, and JWT-based authentication.
- **Group Management**: Create and manage groups, add members, and assign admin roles.
- **Transaction Management**: Track contributions and withdrawals with detailed statistics.
- **Withdrawal Requests**: Submit, approve, or reject withdrawal requests with balance validation.
- **Role-Based Access Control**: Admin and member-specific functionalities.
- **Database Integration**: PostgreSQL database with Flask-SQLAlchemy and Alembic migrations.

### Frontend Features
- **Responsive Design**: Built with React and TailwindCSS for a seamless user experience.
- **Dashboard**: Separate dashboards for admins and members.
- **Group Overview**: View group details, members, and transaction history.
- **Forms**: User-friendly forms for registration, login, contributions, and withdrawal requests.
- **Notifications**: Real-time feedback for actions like contributions and withdrawals.

---

## Tech Stack

### Backend
- **Framework**: Flask
- **Database**: PostgreSQL
- **Authentication**: Flask-JWT-Extended
- **Migrations**: Flask-Migrate
- **Validation**: Marshmallow
- **Environment Management**: Python-dotenv

### Frontend
- **Framework**: React
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Routing**: React Router
- **HTTP Client**: Axios

---

## Installation and Setup

### Prerequisites
- Node.js and npm
- Python 3.8+
- PostgreSQL
- Git

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd group-savings-app/backend
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up the database:
   - Create a PostgreSQL database.
   - Update the `DATABASE_URL` in the `.env` file.

5. Run database migrations:
   ```bash
   flask db upgrade
   ```

6. Start the backend server:
   ```bash
   python run.py
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend/group-saving
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the app in your browser at `http://localhost:5173`.

---

## Usage

1. **Register**: Create a new account.
2. **Login**: Access your dashboard.
3. **Create a Group**: Start a new savings group and invite members.
4. **Contribute**: Add funds to the group savings.
5. **Request Withdrawals**: Submit withdrawal requests for admin approval.
6. **Manage Groups**: Admins can approve/reject withdrawals and manage members.

---

## Folder Structure

```
group-savings-app/
├── backend/
│   ├── app/
│   ├── migrations/
│   ├── .env
│   ├── config.py
│   ├── run.py
│   └── requirements.txt
├── frontend/
│   ├── group-saving/
│   │   ├── src/
│   │   ├── public/
│   │   ├── index.html
│   │   ├── package.json
│   │   └── vite.config.js
└── README.md
```

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
