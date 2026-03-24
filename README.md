# 🚀 Webhook-Driven Task Processing Pipeline

A webhook-driven task processing system that uses AI to analyze, transform, and deliver incoming data through configurable pipelines.

---

## 📌 Overview

This project is a backend service inspired by automation tools like Zapier and n8n.

It allows users to:

- Create pipelines that receive webhook events
- Process incoming data using AI-powered actions
- Deliver results to subscribers with retry logic
- Track job status and delivery attempts

---

## 🏗️ Architecture

![System Architecture](./src/utils/system%20architecture%20diagram%20.png)

### Flow

1. External systems send webhook requests
2. API stores the request as a job in PostgreSQL
3. Worker service processes jobs asynchronously
4. Actions layer transforms data (AI-powered)
5. Results are delivered to subscribers
6. Delivery system retries on failure

---

## 🗄️ Database Schema

![Database Schema](./src/utils/schema%20design.png)

### Tables

- **pipelines** → defines processing logic
- **jobs** → stores incoming webhook data
- **subscribers** → destinations for processed results
- **deliveries** → tracks delivery attempts and retries

---

## ⚙️ Features

- ✅ Full CRUD API for pipelines
- ✅ Webhook ingestion and job queue
- ✅ Background worker processing
- ✅ AI-powered actions using OpenRouter
- ✅ Retry logic for failed deliveries
- ✅ Job status and history API
- ✅ Dockerized setup
- ✅ CI pipeline with GitHub Actions
- ✅ Code quality with ESLint and Prettier

---

## 🤖 Processing Actions

### 1. AI Sentiment Analysis

Classifies text into:

- positive
- negative
- neutral

### 2. Text Summarization

Generates a concise summary of the input text.

### 3. Keyword Extraction

Extracts important keywords for analytics and routing.

---

## 🎯 Example Scenario: Customer Complaint Processing System (Postman Flow)

Use Postman and execute the following requests **in order**:

**POST** http://localhost:3000/api/pipelines  
Body (raw → JSON):

```
{
  "name": "Customer Complaint Sentiment",
  "webhookPath": "customer-sentiment",
  "actionType": "ai_sentiment"
}
```

**POST** http://localhost:3000/api/pipelines  
Body (raw → JSON):

```
{
  "name": "Customer Complaint Summary",
  "webhookPath": "customer-summary",
  "actionType": "summarize_text"
}
```

**POST** http://localhost:3000/api/pipelines  
Body (raw → JSON):

```
{
  "name": "Customer Complaint Keywords",
  "webhookPath": "customer-keywords",
  "actionType": "extract_keywords"
}
```

**POST** http://localhost:3000/api/webhooks/customer-sentiment  
Body (raw → JSON):

```
{
  "message": "I am extremely frustrated. My order was delayed for two weeks and customer support did not respond. This is terrible service."
}
```

**POST** http://localhost:3000/api/webhooks/customer-summary  
Body (raw → JSON):

```
{
  "message": "I am extremely frustrated. My order was delayed for two weeks and customer support did not respond. This is terrible service."
}
```

**POST** http://localhost:3000/api/webhooks/customer-keywords  
Body (raw → JSON):

```
{
  "message": "I am extremely frustrated. My order was delayed for two weeks and customer support did not respond. This is terrible service."
}
```

(Wait 2–3 seconds for processing)

**GET** http://localhost:3000/api/jobs

---

## 🐳 Running the Project

### 1. Clone the repository

```bash
git clone https://github.com/lesson-jbg/Webhook-Driven-Task-Processing-Pipeline.git
cd project
```

### 2. Set environment variables

Create a `.env` file:

add your keys same as env.example

### 3. Run with Docker

```bash
docker compose up --build
```

---

## 🔗 API Endpoints

### Pipelines

- `POST /api/pipelines`
- `GET /api/pipelines`
- `GET /api/pipelines/:id`
- `PUT /api/pipelines/:id`
- `DELETE /api/pipelines/:id`

### Webhooks

- `POST /api/webhooks/:webhookPath`

### Jobs

- `GET /api/jobs`
- `GET /api/jobs/:id`
- `GET /api/jobs/:id/deliveries`

---

## 🔁 Delivery & Retry Logic

- Each job result is sent to all subscribers
- Failed deliveries are retried automatically
- Delivery attempts are logged in the database

---

## 🧠 Design Decisions

- **Queue-based processing** → improves scalability
- **Worker service** → decouples processing from API
- **Action layer** → allows flexible data transformations
- **AI integration (OpenRouter)** → enables intelligent processing
- **Retry mechanism** → ensures reliability

---

## ⚙️ CI/CD

GitHub Actions pipeline:

- installs dependencies
- builds the project
- runs lint and formatting checks

---

## 👨‍💻 Author

Bissan Dwekat
