# Lantern AI

A voice and text AI chatbot for children aged 4–13, with 5 fun cartoon-like characters for different subjects. Built for safe, educational use and easy embedding on WordPress or any site.

## Features
- 5 characters: Lantern (Math), Lanterness (English), Sprout (Science), Greenie (Agriculture), Brainy (Reasoning)
- Short, friendly, emoji-filled responses
- REST API backend (Node.js/Express)
- React + TailwindCSS floating chat widget
- Optional voice support (text-to-speech)
- Kid-safe: no data stored, on-topic, positive

## Setup

### 1. Backend
```
cd backend
npm install
cp .env.example .env
# Edit .env and add your OpenAI API key
npm start
```

### 2. Frontend
```
cd frontend
npm install
npm run dev
```

### 3. Embedding in WordPress
- Build frontend: `npm run build`
- Upload `dist/` to your site, or use as an iframe/widget
- Or, wrap in a simple WordPress plugin that injects the widget

## OpenAI Key
- Get your key from https://platform.openai.com/
- Add it to `backend/.env` as `OPENAI_API_KEY=sk-...`

## Safety
- No user data stored
- Short, simple, positive responses
- (Optional) Add OpenAI moderation for extra safety

## Voice Support
- Uses browser's Web Speech API (coming soon)

---

For questions or help, contact the developer. 