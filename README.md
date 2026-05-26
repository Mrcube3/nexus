# NexusMoA — The Ultra-Fast Alpha Provisioner

**Mixture of Agents (MoA) + Rust Runtime for institutional-grade prediction market intelligence.**

[![Swarms Framework](https://img.shields.io/badge/Swarms-MoA-06B6D4)](https://swarms.ai)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.136-009688)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18-61DAFB)](https://react.dev)

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│                  Browser                         │
│         React + Tailwind + Framer Motion         │
│         Liquid Glass UI · iOS Control Center     │
└──────────────────────┬──────────────────────────┘
                       │ /api/* proxy
┌──────────────────────▼──────────────────────────┐
│              FastAPI Backend                      │
│                                                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐  │
│  │  Web3    │ │  Volume  │ │   Macro-News     │  │
│  │Sentiment │ │  Market  │ │    Analyst       │  │
│  │ Analyst  │ │  Analyst │ │                  │  │
│  └────┬─────┘ └────┬─────┘ └──────┬───────────┘  │
│       │            │              │               │
│       └────────────┼──────────────┘               │
│                    ▼                              │
│         ┌──────────────────┐                       │
│         │  MoA Aggregator  │                       │
│         │  Consensus Engine│                       │
│         └────────┬─────────┘                       │
│                  ▼                                 │
│      ┌────────────────────────┐                    │
│      │  Rust Execution Layer  │ ← PyO3 binding    │
│      │  (simulated wrapper)   │    11.5x speedup  │
│      └────────────────────────┘                    │
└───────────────────────────────────────────────────┘
```

## Features

- **Liquid Glass UI** — Midnight-slate theme with animated amber/cyan orbs, `backdrop-blur-3xl` glass panels, iOS spring transitions, and hover levitation
- **MoA Swarm Panel** — 3 sub-agent pills (News Analyst, Web3 Sentiment, On-Chain Data) feeding into a breathing-cyan-glow Aggregator card
- **Rust Terminal** — Live-scrolling predictive verdict feed simulating high-frequency Rust runtime execution
- **Prediction Market Grid** — Blurred glass cards with real-time consensus percentages, profitability indices, and animated progress bars
- **FastAPI Backend** — 6 API endpoints serving market data, MoA analysis, terminal logs, and Rust benchmark stats
- **Swarms Integration** — 3 `Agent` instances with distinct personas, `MixtureOfAgents` consensus synthesis with graceful simulation fallback
- **Rust Execution Layer** — Simulated PyO3 wrapper showing 11.5x speedup over Python baseline

## Quick Start

### Backend

```sh
cd backend
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt

# Set your Swarms/OpenAI API key
export SWARMS_API_KEY="sk-..."

python3 main.py
# → http://localhost:8000 | API docs: http://localhost:8000/docs
```

### Frontend

```sh
cd frontend
npm install
npx vite --port 3000 --host
# → http://localhost:3000
```

The frontend proxies `/api/*` requests to the backend automatically.

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | System status + Rust benchmark |
| GET | `/api/markets` | Prediction markets with consensus data |
| POST | `/api/analyze` | Single market MoA analysis |
| POST | `/api/analyze/batch` | Batch market analysis |
| GET | `/api/terminal/feed` | Recent execution log entries |
| GET | `/api/rust/benchmark` | Python vs Rust speedup stats |

## Tech Stack

**Frontend:** React 18 · Tailwind CSS 3 · Framer Motion 11 · Vite 6

**Backend:** Python 3 · FastAPI · Swarms Framework · Uvicorn

**Execution:** Simulated Rust PyO3 binding (11.5x speedup over Python)
