# UnMask AI — Project Plan & Architecture

## 🎯 Overview

**UnMask AI** is an AI-powered audio deepfake detection platform. Users can upload audio files via web interface, REST API, or WhatsApp bot and receive instant authenticity analysis.

**Tech Stack:**
- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Backend (to integrate):** FastAPI or Django REST Framework
- **Payments:** Stripe
- **Messaging:** WhatsApp Business API

---

## 📁 Project Structure

```
unmask-ai/
├── .env.local              # Environment variables (local dev)
├── .env.example            # Environment template (for team)
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies
│
├── public/                 # Static assets
│   ├── favicon.ico
│   └── images/             # Logos, OG images, etc.
│
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── layout.tsx      # Root layout (Navbar + Footer)
│   │   ├── page.tsx        # Landing page (all sections)
│   │   ├── globals.css     # Global styles & animations
│   │   ├── privacy/
│   │   │   └── page.tsx    # Privacy Policy page
│   │   ├── terms/
│   │   │   └── page.tsx    # Terms of Service page
│   │   ├── docs/           # [TODO] API documentation page
│   │   │   └── page.tsx
│   │   ├── dashboard/      # [TODO] User dashboard
│   │   │   └── page.tsx
│   │   └── auth/           # [TODO] Auth pages (login/register)
│   │       ├── login/
│   │       │   └── page.tsx
│   │       └── register/
│   │           └── page.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # Animated navigation bar
│   │   │   └── Footer.tsx          # Site footer
│   │   │
│   │   ├── sections/               # Landing page sections
│   │   │   ├── Hero.tsx            # Hero with audio wave animation
│   │   │   ├── Features.tsx        # Feature cards grid
│   │   │   ├── HowItWorks.tsx      # 3-step process
│   │   │   ├── Accuracy.tsx        # Stats & accuracy bars
│   │   │   ├── AudioAnalyzer.tsx   # File upload & analysis UI
│   │   │   ├── Pricing.tsx         # Subscription cards
│   │   │   ├── ApiSection.tsx      # API code examples
│   │   │   ├── WhatsAppSection.tsx # WhatsApp bot mockup
│   │   │   ├── Vision.tsx          # Company vision
│   │   │   ├── PrivacySection.tsx  # Privacy & security cards
│   │   │   ├── Testimonials.tsx    # Testimonial carousel
│   │   │   └── CTA.tsx             # Final call-to-action
│   │   │
│   │   └── ui/                     # [TODO] Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── Modal.tsx
│   │
│   └── lib/
│       ├── api.ts           # Backend API client (FastAPI/Django)
│       ├── constants.ts     # Site configuration & content
│       ├── types.ts         # Shared TypeScript types
│       └── animations.ts    # Framer Motion animation variants
```

---

## 🎨 Design System

### Colors
| Token           | Hex       | Usage                    |
|-----------------|-----------|--------------------------|
| `--primary`     | `#253d2c` | Main brand green         |
| `--primary-light` | `#2f5e3a` | Hover states           |
| `--primary-dark`  | `#1a2e20` | Dark backgrounds       |
| `--accent`      | `#4ade80` | Highlights, CTAs         |
| `--accent-muted`| `#22c55e` | Secondary accent         |
| `--background`  | `#0a0a0a` | Page background          |
| `--foreground`  | `#ededed` | Text color               |
| `--surface`     | `#111411` | Card backgrounds         |
| `--muted`       | `#94a39a` | Secondary text           |

### Effects
- **Glass morphism:** Semi-transparent cards with backdrop blur
- **Glow pulse:** Subtle green glow animation
- **Gradient text:** Green gradient for emphasis
- **Audio wave:** Animated bars for audio visualization

---

## 🔌 Backend Integration Points

The frontend is designed to integrate with a **FastAPI** or **Django** backend via REST API.

### API Endpoints Expected

| Method | Endpoint              | Description                    |
|--------|-----------------------|--------------------------------|
| POST   | `/api/v1/analyze`     | Upload & analyze audio file    |
| POST   | `/api/v1/auth/login`  | User login                     |
| POST   | `/api/v1/auth/register` | User registration            |
| GET    | `/api/v1/plans`       | Get subscription plans         |
| POST   | `/api/v1/checkout`    | Create Stripe checkout session |
| GET    | `/api/v1/history`     | Get analysis history           |
| GET    | `/api/v1/api-keys`    | List API keys                  |
| POST   | `/api/v1/api-keys`    | Create new API key             |
| GET    | `/api/v1/whatsapp/status` | WhatsApp bot status        |
| GET    | `/api/v1/health`      | Health check                   |

### Audio Analysis Response Format
```json
{
  "id": "uuid",
  "filename": "sample.wav",
  "is_fake": false,
  "confidence": 98.7,
  "analysis_details": {
    "spectral_score": 97.2,
    "temporal_score": 99.1,
    "model_version": "v2.1.0",
    "processing_time_ms": 1247
  },
  "created_at": "2026-02-25T10:30:00Z"
}
```

### Environment Variables

All configurable via `.env.local`:
- `NEXT_PUBLIC_API_URL` — Backend API base URL
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — WhatsApp bot number
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — Stripe public key
- `NEXT_PUBLIC_MAX_FILE_SIZE_MB` — Max upload size
- `NEXT_PUBLIC_ALLOWED_AUDIO_FORMATS` — Supported formats

---

## 📱 Landing Page Sections

1. **Hero** — Animated headline, audio wave visualization, trust badges
2. **Features** — 6-card grid (Real-time, Accuracy, API, WhatsApp, Batch, Privacy)
3. **How It Works** — 3-step visual (Upload → Analyze → Results)
4. **Accuracy Stats** — Animated counters + accuracy bars by audio type
5. **Audio Analyzer** — Drag-and-drop upload with real-time progress
6. **WhatsApp Integration** — Phone mockup with chat conversation
7. **API Section** — Code examples (cURL, Python, JavaScript) with copy
8. **Pricing** — 3-tier subscription cards (Free, Pro, Enterprise)
9. **Vision** — Company mission (Accessible, Ethical AI, Privacy)
10. **Privacy & Security** — 6-card security features grid
11. **Testimonials** — Carousel with ratings
12. **CTA** — Final call to action

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 📋 TODO — Backend Integration Checklist

- [ ] Set up FastAPI/Django project with audio analysis endpoint
- [ ] Implement audio deepfake detection ML model
- [ ] Add authentication (JWT) endpoints
- [ ] Set up Stripe webhook handler
- [ ] Configure WhatsApp Business API bot
- [ ] Add WebSocket support for real-time analysis updates
- [ ] Set up CORS to allow frontend origin
- [ ] Deploy API and update `NEXT_PUBLIC_API_URL`
- [ ] Implement user dashboard page
- [ ] Add auth pages (login/register) with token management
- [ ] Build API documentation page

---

## 🔧 FastAPI Backend Starter

```python
# main.py
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uuid, time

app = FastAPI(title="UnMask AI API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/v1/analyze")
async def analyze_audio(audio_file: UploadFile = File(...)):
    start = time.time()
    contents = await audio_file.read()
    
    # TODO: Run ML model inference here
    is_fake = False
    confidence = 98.7
    
    return {
        "id": str(uuid.uuid4()),
        "filename": audio_file.filename,
        "is_fake": is_fake,
        "confidence": confidence,
        "analysis_details": {
            "spectral_score": 97.2,
            "temporal_score": 99.1,
            "model_version": "v2.1.0",
            "processing_time_ms": int((time.time() - start) * 1000),
        },
        "created_at": "2026-02-25T10:30:00Z",
    }

@app.get("/api/v1/health")
async def health():
    return {"status": "healthy", "version": "1.0.0"}
```

---

## 🔧 Django Backend Starter

```python
# views.py
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
import uuid, time

@api_view(['POST'])
@parser_classes([MultiPartParser])
def analyze_audio(request):
    audio_file = request.FILES.get('audio_file')
    if not audio_file:
        return Response({"detail": "No audio file provided"}, status=400)
    
    start = time.time()
    
    # TODO: Run ML model inference here
    is_fake = False
    confidence = 98.7
    
    return Response({
        "id": str(uuid.uuid4()),
        "filename": audio_file.name,
        "is_fake": is_fake,
        "confidence": confidence,
        "analysis_details": {
            "spectral_score": 97.2,
            "temporal_score": 99.1,
            "model_version": "v2.1.0",
            "processing_time_ms": int((time.time() - start) * 1000),
        },
    })

@api_view(['GET'])
def health_check(request):
    return Response({"status": "healthy", "version": "1.0.0"})
```

---

*Built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.*
