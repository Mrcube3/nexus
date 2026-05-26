import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PREDICTION_MARKETS = [
  { id: 1, question: 'Will BTC hit $100k by Q4 2026?', consensus: 72.4, profitability: '+14.2%', volume: '$2.4B' },
  { id: 2, question: 'Will ETH merge to >10k TPS this year?', consensus: 65.8, profitability: '+8.7%', volume: '$1.1B' },
  { id: 3, question: 'Will SOL breach $250 before EOY?', consensus: 58.3, profitability: '+21.5%', volume: '$890M' },
  { id: 4, question: 'Will AI agent token mcap exceed $50B?', consensus: 81.2, profitability: '+32.1%', volume: '$3.7B' },
  { id: 5, question: 'Will Fed cut rates at next FOMC?', consensus: 44.7, profitability: '+6.3%', volume: '$520M' },
  { id: 6, question: 'Will RWA tokenization pass $20B TVL?', consensus: 69.1, profitability: '+17.8%', volume: '$1.8B' },
]

const TERMINAL_LINES = [
  { text: '[RUST EXEC] Spawning MoA Runtime v0.1.0...', type: 'exec' },
  { text: '[RUST EXEC] Initializing 3 sub-agents...', type: 'exec' },
  { text: '[RUST EXEC] Agent[0]: Web3 Sentiment - attached', type: 'exec' },
  { text: '[RUST EXEC] Agent[1]: Volume Analyst - attached', type: 'exec' },
  { text: '[RUST EXEC] Agent[2]: Macro-News Analyst - attached', type: 'exec' },
  { text: '[RUST EXEC] Consensus engine ready', type: 'exec' },
  { text: '[NEXUS] MoA round 1 complete - probability: 0.724', type: 'nexus' },
  { text: '[NEXUS] Profitability index: +14.2% on BTC/Q4', type: 'nexus' },
  { text: '[NEXUS] Latency: 4.7ms (target <15ms) - OK', type: 'success' },
  { text: '[RUST EXEC] Next poll in 2.3s...', type: 'exec' },
  { text: '[RUST EXEC] Agent[0]: Web3 Sentiment - bullish on BTC', type: 'exec' },
  { text: '[RUST EXEC] Agent[1]: Volume Analyst - high accumulation', type: 'exec' },
  { text: '[RUST EXEC] Agent[2]: Macro-News - regulatory tailwind', type: 'exec' },
  { text: '[NEXUS] Consensus round: 0.738 (+0.014)', type: 'nexus' },
  { text: '[NEXUS] Profitability index: +15.8%', type: 'nexus' },
  { text: '[RUST EXEC] Latency: 3.2ms - OK', type: 'success' },
  { text: '[RUST EXEC] Concurrent inference batch complete', type: 'exec' },
  { text: '[NEXUS] Aggregator: high-confidence verdict', type: 'nexus' },
  { text: '[NEXUS] Next scheduled: 1.8s', type: 'nexus' },
  { text: '[RUST EXEC] Polling memory pool for new data...', type: 'exec' },
]

const AGENTS = [
  { name: 'News Analyst', icon: '📰', color: 'amber', desc: 'Macro-financial & regulatory signals', status: 'Operational' },
  { name: 'Web3 Sentiment', icon: '🔮', color: 'cyan', desc: 'Social & on-chain sentiment analysis', status: 'Operational' },
  { name: 'On-Chain Data', icon: '⛓️', color: 'amber', desc: 'Volume, whale moves & liquidity', status: 'Operational' },
]

function useTerminalFeed() {
  const [lines, setLines] = useState(() => TERMINAL_LINES.slice(0, 10))
  const indexRef = useRef(10)

  useEffect(() => {
    const interval = setInterval(() => {
      setLines(prev => {
        const next = [...prev, { ...TERMINAL_LINES[indexRef.current % TERMINAL_LINES.length], id: Date.now() }]
        if (next.length > 30) next.splice(0, next.length - 30)
        indexRef.current += 1
        return next
      })
    }, 600)
    return () => clearInterval(interval)
  }, [])

  return lines
}

function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.12]"
        style={{ background: 'radial-gradient(circle at 30% 30%, #FBBF24, transparent 70%)' }}
        animate={{
          x: [0, 80, -40, 60, 0],
          y: [0, -60, 80, 40, 0],
          scale: [1, 1.15, 0.95, 1.1, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.10]"
        style={{ background: 'radial-gradient(circle at 70% 30%, #06B6D4, transparent 70%)' }}
        animate={{
          x: [0, -70, 50, -30, 0],
          y: [0, 50, -70, -20, 0],
          scale: [1, 0.9, 1.2, 1.05, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -right-20 w-[350px] h-[350px] rounded-full opacity-[0.08]"
        style={{ background: 'radial-gradient(circle at 40% 40%, #FBBF24, transparent 70%)' }}
        animate={{
          x: [0, 40, -60, 20, 0],
          y: [0, -40, 30, -50, 0],
          scale: [1, 1.1, 0.9, 1.05, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle at 60% 60%, #06B6D4, transparent 70%)' }}
        animate={{
          x: [0, -50, 30, -20, 0],
          y: [0, 30, -50, 40, 0],
          scale: [1, 0.95, 1.15, 1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

function GlassPanel({ children, className = '', hoverLift = true, style }) {
  return (
    <motion.div
      className={`relative bg-gradient-to-b from-white/[0.10] to-white/[0.02] p-[1px] rounded-2xl ${className}`}
      whileHover={hoverLift ? { y: -4, transition: { type: 'spring', stiffness: 300, damping: 20 } } : {}}
      style={style}
    >
      <div className="bg-black/20 backdrop-blur-3xl rounded-2xl h-full">
        {children}
      </div>
    </motion.div>
  )
}

function TerminalFeed({ lines }) {
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines])

  return (
    <GlassPanel className="flex-1 min-h-0 flex flex-col">
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-3 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          <span className="text-white/30 text-[10px] font-mono ml-2 tracking-wide uppercase">rust_exec — zsh</span>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/30 text-[10px] font-mono">Live</span>
          </div>
        </div>
        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-[2px] min-h-0 scroll-smooth">
          <AnimatePresence mode="popLayout">
            {lines.map((line, i) => (
              <motion.div
                key={line.id ?? i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="font-mono text-[11px] leading-5"
              >
                {line.type === 'nexus' ? (
                  <span className="text-cyan-400">{line.text}</span>
                ) : line.type === 'success' ? (
                  <span className="text-green-400">{line.text}</span>
                ) : (
                  <span className="text-white/50">{line.text}</span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </GlassPanel>
  )
}

function AgentPill({ agent, index }) {
  const isCyan = agent.color === 'cyan'
  const dotColor = isCyan ? 'bg-cyan-400' : 'bg-amber-400'
  const textColor = isCyan ? 'text-cyan-300' : 'text-amber-300'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, type: 'spring', stiffness: 120, damping: 14 }}
      className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-[1px] rounded-xl"
    >
      <div className="bg-black/30 backdrop-blur-3xl rounded-xl px-4 py-3 min-w-[140px]">
        <div className="flex items-center gap-2">
          <span className="text-sm">{agent.icon}</span>
          <span className="text-white/90 text-xs font-semibold">{agent.name}</span>
        </div>
        <p className="text-white/40 text-[10px] mt-1.5 leading-tight">{agent.desc}</p>
        <div className="flex items-center gap-1.5 mt-2">
          <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
          <span className={`text-[10px] ${textColor}`}>{agent.status}</span>
        </div>
      </div>
    </motion.div>
  )
}

function MoASwarmPanel() {
  return (
    <GlassPanel className="flex-1 min-h-0 flex flex-col">
      <div className="p-5 flex flex-col h-full">
        <h3 className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-4 shrink-0">
          MoA Swarm Status
        </h3>
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <div className="flex flex-wrap gap-3 justify-center">
            {AGENTS.slice(0, 2).map((agent, i) => (
              <AgentPill key={agent.name} agent={agent} index={i} />
            ))}
          </div>
          <AgentPill agent={AGENTS[2]} index={2} />
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-white/20 text-lg"
          >
            ↓
          </motion.div>
          <motion.div
            className="w-full max-w-xs bg-gradient-to-b from-cyan-500/20 to-cyan-500/5 rounded-xl p-4 border border-cyan-500/25"
            animate={{
              boxShadow: [
                '0 0 20px rgba(6,182,212,0.15), inset 0 0 20px rgba(6,182,212,0.05)',
                '0 0 40px rgba(6,182,212,0.30), inset 0 0 30px rgba(6,182,212,0.10)',
                '0 0 20px rgba(6,182,212,0.15), inset 0 0 20px rgba(6,182,212,0.05)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <p className="text-cyan-300 text-sm font-bold">MoA Aggregator</p>
              </div>
              <p className="text-white/30 text-[10px] font-mono">Consensus Engine v0.1.0 — PyO3 Backend</p>
              <div className="flex justify-center gap-4 mt-3">
                <div>
                  <p className="text-white/40 text-[9px] uppercase tracking-wider">Confidence</p>
                  <p className="text-white text-sm font-bold">94.2%</p>
                </div>
                <div className="w-px bg-white/10" />
                <div>
                  <p className="text-white/40 text-[9px] uppercase tracking-wider">Latency</p>
                  <p className="text-green-400 text-sm font-bold">3.7ms</p>
                </div>
                <div className="w-px bg-white/10" />
                <div>
                  <p className="text-white/40 text-[9px] uppercase tracking-wider">Rounds</p>
                  <p className="text-white text-sm font-bold">847</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </GlassPanel>
  )
}

function PredictionCard({ market, index }) {
  const isHighConsensus = market.consensus > 65
  const barColor = isHighConsensus
    ? 'bg-gradient-to-r from-cyan-500 to-emerald-400'
    : market.consensus > 45
    ? 'bg-gradient-to-r from-amber-500 to-orange-400'
    : 'bg-gradient-to-r from-red-500 to-rose-400'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 * index, type: 'spring', stiffness: 100, damping: 18 }}
    >
      <GlassPanel>
        <div className="p-4">
          <p className="text-white/85 text-sm font-medium leading-snug min-h-[2.5rem]">
            {market.question}
          </p>
          <div className="flex items-center justify-between mt-3">
            <div>
              <p className="text-white/30 text-[9px] uppercase tracking-wider">Consensus</p>
              <p className={`text-lg font-bold ${isHighConsensus ? 'text-emerald-400' : market.consensus > 45 ? 'text-amber-400' : 'text-red-400'}`}>
                {market.consensus}%
              </p>
            </div>
            <div className="text-right">
              <p className="text-white/30 text-[9px] uppercase tracking-wider">P&L Index</p>
              <p className="text-lg font-bold text-emerald-400">{market.profitability}</p>
            </div>
            <div className="text-right">
              <p className="text-white/30 text-[9px] uppercase tracking-wider">Volume</p>
              <p className="text-white/70 text-xs font-mono">{market.volume}</p>
            </div>
          </div>
          <div className="mt-3 w-full bg-white/8 rounded-full h-1.5 overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${barColor}`}
              initial={{ width: 0 }}
              animate={{ width: `${market.consensus}%` }}
              transition={{ duration: 1.2, delay: 0.2 + 0.08 * index, ease: 'easeOut' }}
            />
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  )
}

function App() {
  const terminalLines = useTerminalFeed()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative min-h-screen bg-midnight overflow-hidden">
      <BackgroundOrbs />
      <div className="relative z-10 p-3 sm:p-4 md:p-6 max-w-7xl mx-auto min-h-screen flex flex-col gap-3 md:gap-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        >
          <GlassPanel>
            <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <h1 className="text-white text-lg sm:text-xl font-bold tracking-tight">
                    Nexus<span className="text-cyan-400">MoA</span>
                  </h1>
                  <p className="text-white/30 text-[10px] sm:text-xs tracking-wide">
                    The Ultra-Fast Alpha Provisioner
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 ml-4 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400/80 text-[10px] font-mono">All Systems Nominal</span>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="hidden sm:block text-right">
                  <p className="text-white/30 text-[9px] font-mono">{currentTime.toLocaleTimeString()}</p>
                  <p className="text-white/20 text-[9px] font-mono">UTC</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span className="text-cyan-400/80 text-[10px] font-mono">v0.1.0</span>
                </div>
              </div>
            </div>
          </GlassPanel>
        </motion.div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 min-h-0">
          <MoASwarmPanel />
          <TerminalFeed lines={terminalLines} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 18, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white/50 text-xs font-semibold uppercase tracking-widest">
              Active Prediction Markets
            </h2>
            <span className="text-white/20 text-[10px] font-mono">
              auto-refresh · 2.3s
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-4">
            {PREDICTION_MARKETS.map((market, i) => (
              <PredictionCard key={market.id} market={market} index={i} />
            ))}
          </div>
        </motion.div>

        <div className="text-center pb-4">
          <p className="text-white/15 text-[9px] font-mono tracking-widest uppercase">
            NexusMoA — Mixture of Agents · Rust Runtime · Swarms Framework
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
