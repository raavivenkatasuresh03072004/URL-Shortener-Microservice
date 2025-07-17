#  URL Shortener Microservice

A production-ready URL shortener microservice built using **Node.js**, **Express.js**, and **MongoDB**, with support for redirection, analytics, and clean RESTful APIs.

##  Features

- Shorten any long URL into a short, unique URL
- Redirect to original long URL via short code
- Track total clicks (analytics-ready)
- RESTful API design
- Error handling & validation
- Logging middleware
- Modular folder structure (controller-service-model)

---

##  Tech Stack

- Node.js
- Express.js
- dotenv
- uuid
- nodemon

---

## ⚙ Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/raavivenkatasuresh03072004/URL-Shortener-Microservice.git

# 2. Navigate to project directory
cd URL-Shortener-Microservice

# 3. Install dependencies
npm install

# 4. Set up environment variables
cp .env.example .env
# Edit .env with your MongoDB URI

# 5. Run the app
npm start
