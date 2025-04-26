# 🌱 Skill Mint – A Skill Exchange Platform

Skill Mint is a MERN stack web application that enables people to **trade skills instead of money**. Users can offer their expertise (like graphic design, coding, marketing) and request help in other areas in return. It’s a community-driven platform where **every hour you give earns you an hour to learn**.

---

## 🚀 Features

- 🔐 User Registration & Login
- 🧑‍💼 Create Profiles with Skills to Offer & Learn
- 🔄 Post & Browse Skill Offers and Requests
- 🤝 Smart Matching System
- ⏱️ Time Credit System (1 Hour = 1 Credit)
- 💬 In-app Messaging & Scheduling
- ⭐ Rating & Review System
- 📈 Leaderboard (Optional)

---

## 🔧 Tech Stack (MERN)

- **MongoDB** – Stores users, skills, time credits, session data
- **Express.js** – Backend APIs
- **React.js** – Frontend UI
- **Node.js** – Server logic

---

## 🧭 How It Works (Workflow)

1. **Register/Login**
2. **Create your profile** – add skills you can teach and want to learn.
3. **Post Offers/Requests** – specify hours and availability.
4. **Get Matched** – the system recommends skill swaps based on your interests.
5. **Chat & Schedule** – message users and plan your session.
6. **Conduct the Session** – through video call or in-person.
7. **Rate Each Other** – earn/spend time credits.
8. **Repeat & Grow** – keep learning, teaching, and building community!

---

## 🛠️ Setup Instructions

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/skill-mint.git
cd skill-mint

# 2. Install dependencies
cd client && npm install      # For React frontend
cd ../server && npm install   # For Node backend

# 3. Setup environment variables
# Create a .env file in /server with:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret

# 4. Run the app
cd ../server
npm run dev                   # Starts backend
cd ../client
npm start                     # Starts frontend
