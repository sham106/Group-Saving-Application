# CoSavr

<div align="center">
  <img src="./frontend/group-savings/src/assets/logo.jpg/" 
  alt="CoSavr Logo"  width='200'/>
  <br>
  <h3><em>Empowering communities through collaborative savings and financial growth</em></h3>
  <br>

  ![License](https://img.shields.io/badge/license-MIT-blue)
  ![Version](https://img.shields.io/badge/version-1.0.0-green)
  ![Status](https://img.shields.io/badge/status-active-brightgreen)

</div>

## 📋 Overview

**CoSavr** is a full-stack web application designed to revolutionize how groups save, borrow, and grow their finances together. With an intuitive interface and robust backend, CoSavr enables seamless management of group contributions, withdrawals, and loans in a transparent and secure environment.

---

## 🔍 Problem Statement

In many communities, group savings initiatives (such as "chama", "table banking", "sou-sou", or "rotating savings clubs") suffer from inefficiency, lack of transparency, and limited access to financial tools. Traditional methods often involve manual record-keeping, cash handling risks, and limited flexibility - leading to mistrust, disputes, and missed opportunities for financial growth.

**CoSavr** transforms this experience by providing a digital platform that:
- Eliminates manual tracking errors and trust issues through automated record-keeping
- Creates transparency in all financial activities
- Democratizes access to small-scale loans without traditional banking barriers
- Builds financial discipline through structured saving mechanisms
- Fosters community support through shared financial goals

---

## ✨ Features

### 💰 Core Savings Features
- **User Authentication**: Secure user registration, login, and JWT-based authentication
- **Group Management**: Create and manage groups, add members, and assign admin roles
- **Transaction Management**: Track contributions and withdrawals with detailed statistics
- **Withdrawal Requests**: Submit, approve, or reject withdrawal requests with balance validation
- **Role-Based Access Control**: Admin and member-specific functionalities
- **Database Integration**: PostgreSQL database with Flask-SQLAlchemy and Alembic migrations

### 💸 Loan Management System
- **Loan Requests**: Members can request loans with specified amount, repayment period, and purpose
- **Eligibility Calculation**: Automatic calculation based on contribution history and group settings
- **Approval Workflow**: Administrators can review, approve, or reject loan requests
- **Repayment Tracking**: Installment-based repayment with automatic schedule generation
- **Customizable Settings**: Group-specific loan configurations (interest rates, multipliers, periods)
- **Status Monitoring**: Full loan lifecycle tracking from request to full repayment
- **Notification System**: Automated alerts for approvals, rejections, and payment reminders

### 🖥️ User Interface Features
- **Responsive Design**: Built with React and TailwindCSS for a seamless experience across devices
- **Interactive Dashboards**: Separate views for admins and members with role-appropriate controls
- **Financial Analytics**: Visual representations of group savings, loan data, and personal contributions
- **User-Friendly Forms**: Intuitive interfaces for all transactions and requests
- **Real-time Notifications**: Immediate feedback for all financial activities

---

## 🛠️ Tech Stack

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

## 🚀 Installation and Setup

### Prerequisites
- Node.js and npm
- Python 3.8+
- PostgreSQL
- Git

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd cosavr/backend
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
   - Create a PostgreSQL database
   - Update the `DATABASE_URL` in the `.env` file

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
   cd ../frontend/cosavr
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the app in your browser at `http://localhost:5173`

---

## 📱 Usage Guide

### For Members
1. **Register/Login**: Create a new account or access your existing dashboard
2. **Join/Create Groups**: Start or join savings groups with friends, family, or colleagues
3. **Make Contributions**: Add funds to your groups regularly
4. **Request Withdrawals**: Submit withdrawal requests when needed
5. **Apply for Loans**: Request loans based on your saving history
6. **Track Finances**: Monitor your contributions, withdrawals, and loan repayments

### For Administrators
1. **Manage Groups**: Overview of all group activities and member management
2. **Process Requests**: Review and action withdrawal and loan requests
3. **Configure Settings**: Set group-specific loan parameters and savings rules
4. **Generate Reports**: Access financial reports and group performance metrics

---

## 📁 Project Structure

```
cosavr/
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── migrations/
│   ├── .env
│   ├── config.py
│   ├── run.py
│   └── requirements.txt
├── frontend/
│   ├── cosavr/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   └── utils/
│   │   ├── public/
│   │   ├── index.html
│   │   ├── package.json
│   │   └── vite.config.js
└── README.md
```

---

## 🤝 Contributing

We welcome contributions to CoSavr! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

For major changes, please open an issue first to discuss what you would like to change.

---
## LIVE DEMO
[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://group-saving.vercel.app/)
## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Built with ❤️ for communities seeking financial empowerment</p>
</div>