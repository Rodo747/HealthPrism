# HealthPrism

**AI-powered mobile screening for early detection of child anemia and malnutrition.**  

HealthPrism is a mobile application that transforms any smartphone into an accessible early-warning health tool for children. Using **computer vision**, **physiological signal processing**, and **clinical decision logic**, the app evaluates risk for anemia, malnutrition, and general physiological instability in under 8 minutes.

Built for **GNEC Hackathon 2026** — aligned with **SDG 3: Good Health and Well-being**.

---

# Overview

Millions of children worldwide suffer from anemia and malnutrition without timely detection. Traditional diagnosis often requires blood tests, laboratories, trained personnel, and financial access.

HealthPrism addresses this gap through an **offline-first smartphone solution** capable of screening using only:

- Camera
- Flashlight
- Microphone
- Basic anthropometric inputs

No external hardware required.

---

# Core Features

## Multi-Signal Screening Engine

HealthPrism combines multiple low-cost signals into one unified risk profile:

### Visual Biomarkers (Computer Vision)

- Palpebral conjunctiva pallor
- Palm pallor
- Nail bed pallor

### Physiological Signals

- Heart Rate via PPG (camera + flash)
- Respiratory Rate via microphone analysis
- General vitality indicators

### Anthropometric Inputs

- Age
- Weight
- Height
- BMI / growth-based indicators

---

# Final Output

The system generates:

- General status: **Stable / Vulnerable / Critical**
- Anemia risk level
- Malnutrition risk level
- Physiological stress level
- Contributing factors explained in plain language
- Nutritional recommendations
- Medical follow-up alerts when necessary

---

# Architecture

## Offline-First (Primary Mode)

All critical functions run locally on-device:

- TensorFlow.js inference
- Camera analysis
- PPG processing
- Audio respiration analysis
- Risk engine
- Local storage

## Cloud Enhanced (When Online)

When internet is available:

- Patient history sync with Firebase Firestore
- AI-generated personalized recommendations
- Future analytics and model updates

---

# Machine Learning Stack

Three lightweight CNN classifiers trained with **MobileNetV2**:

| Model | Purpose |
|------|---------|
| Conjunctiva Model | Detect anemia-related pallor |
| Palm Model | Secondary blood perfusion indicator |
| Nail Model | Nail bed pallor analysis |

## Training Stack

- Python
- TensorFlow 2.x
- Keras
- NumPy
- scikit-learn
- Kaggle datasets
- Data augmentation pipeline
- EarlyStopping
- AUC optimization

## Deployment Format

Models exported to:

- TensorFlow.js Graph Models

Optimized for mobile inference.

---

# Physiological Algorithms

## Heart Rate (PPG)

Uses rear camera + flashlight.

Pipeline:

1. Capture finger video
2. Extract red channel intensity per frame
3. Filter noise
4. Peak detection
5. BPM estimation

## Respiratory Rate

Uses microphone audio:

1. Capture breathing sound
2. Envelope extraction
3. Signal smoothing
4. Cycle counting
5. Breaths per minute estimation

---

# Tech Stack

## Frontend / Mobile

- React 18
- Vite
- TailwindCSS
- Capacitor
- React Router
- TensorFlow.js

## Backend

- FastAPI
- Python 3.11
- Uvicorn

## AI Layer

- Groq API
- Llama 4

## Database / Storage

- Firebase Firestore
- Capacitor Preferences
- Local JSON knowledge base
# Run Locally, Build & Configuration


# Frontend
cd frontend
npm install
npm run dev
# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
# Build Android APK
npm run build
npx cap sync android
npx cap open android

Then generate the signed APK inside Android Studio.

# frontend/.env
VITE_API_URL=
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# backend/.env
GROQ_API_KEY=
PORT=8000
