import { useState, useRef, useEffect } from 'react'
import './App.css'
import { generateChaosText, generateCleanText, generateSurpriseText } from './utils/text'
import chaosLogo from './assets/BuBU_20260210_190336_0000.svg'
import cleanLogo from './assets/cleanLogo.svg'
import MetaballsBackground from './components/MetaballsBackground'

function App() {
  const [isCleanMode, setIsCleanMode] = useState(false)
  const [selectedVibe, setSelectedVibe] = useState('labubu-pistachio')
  const [paragraphCount, setParagraphCount] = useState(3)
  const [chaosLevel, setChaosLevel] = useState(5)
  const [generatedText, setGeneratedText] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [vibeOpen, setVibeOpen] = useState(false)
  const vibeRef = useRef(null)

  const vibeOptions = [
    { value: 'labubu-pistachio', label: '🧸 Labubu Pistachio' },
    { value: 'ai-slop', label: '🤖 AI Slop' },
    { value: 'linkedin-thought-leader', label: '💼 LinkedIn Thought Leader' },
    { value: 'extremely-online', label: '💅 Extremely Online' },
    { value: 'tech-bro-pitch', label: '🚀 Tech Bro Pitch' },
    { value: 'academic-abstract', label: '📚 Academic Abstract' },
    { value: 'newsletter-intro', label: '📧 Newsletter Intro' },
    { value: 'substack-guy', label: '✍️ Substack Guy' },
    { value: 'twitter-thread', label: '🧵 Twitter Thread' },
    { value: 'gen-z-marketing', label: '✨ Gen Z Marketing' },
  ]

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (vibeRef.current && !vibeRef.current.contains(e.target)) {
        setVibeOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleGenerate = () => {
    if (isCleanMode) {
      setGeneratedText(generateCleanText(paragraphCount))
    } else {
      setGeneratedText(generateChaosText(selectedVibe, paragraphCount, chaosLevel))
    }
  }

  const handleSurprise = () => {
    const result = generateSurpriseText()
    setSelectedVibe(result.vibe)
    setParagraphCount(result.paragraphs)
    setChaosLevel(result.chaos)
    setGeneratedText(result.text)
  }

  const handleCopy = () => {
    if (!generatedText) return
    navigator.clipboard.writeText(generatedText).then(() => {
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
    })
  }

  const handleRegenerate = () => {
    if (isCleanMode) {
      setGeneratedText(generateCleanText(paragraphCount))
    } else {
      setGeneratedText(generateChaosText(selectedVibe, paragraphCount, chaosLevel))
    }
  }

  return (
    <div className={`app ${isCleanMode ? 'clean-mode' : 'chaos-mode'}`}>
      {!isCleanMode && <MetaballsBackground />}
<div className="content-container">
        {/* Left Column - Logo + Controls */}
        <div className="left-column">
          <div className="logo-container">
            <img className="logo" src={isCleanMode ? cleanLogo : chaosLogo} alt="Bubu Ipsum logo" />
          </div>

          {/* Controls */}
          <div className="controls-section">
            <div className="toggle-container">
              <span className={`toggle-option ${isCleanMode ? 'active' : ''}`}>Clean</span>
              <button
                className={`toggle-switch ${isCleanMode ? 'clean' : 'chaos'}`}
                onClick={() => {
                  const nextClean = !isCleanMode
                  setIsCleanMode(nextClean)
                  if (nextClean && generatedText) {
                    setGeneratedText(generateCleanText(paragraphCount))
                  }
                }}
                aria-pressed={!isCleanMode}
              >
                <span className="toggle-knob" />
              </button>
              <span className={`toggle-option ${!isCleanMode ? 'active' : ''}`}>Chaos</span>
            </div>

            {!isCleanMode && (
              <>
                <div className="control-group">
                  <label>VIBE:</label>
                  <div className="vibe-dropdown" ref={vibeRef}>
                    <button
                      className="vibe-selector"
                      onClick={() => setVibeOpen(!vibeOpen)}
                      type="button"
                    >
                      <span>{vibeOptions.find(v => v.value === selectedVibe)?.label}</span>
                      <span className={`vibe-chevron ${vibeOpen ? 'open' : ''}`}>▾</span>
                    </button>
                    {vibeOpen && (
                      <ul className="vibe-menu">
                        {vibeOptions.map((opt) => (
                          <li
                            key={opt.value}
                            className={`vibe-item ${opt.value === selectedVibe ? 'selected' : ''}`}
                            onClick={() => {
                              setSelectedVibe(opt.value)
                              setVibeOpen(false)
                            }}
                          >
                            {opt.label}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="control-group">
                  <label>CHAOS LEVEL: {chaosLevel}</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={chaosLevel}
                    onChange={(e) => setChaosLevel(Number(e.target.value))}
                    className="chaos-slider"
                    style={{ '--val': `${((chaosLevel - 1) / 9) * 100}%` }}
                  />
                  <div className="chaos-indicator">
                    🌸 → 🤪 → 🔥
                  </div>
                </div>
              </>
            )}

            <div className="control-group">
              <label>PARAGRAPHS: {paragraphCount}</label>
              <input
                type="range"
                min="1"
                max="10"
                value={paragraphCount}
                onChange={(e) => setParagraphCount(Number(e.target.value))}
                className="paragraph-slider"
                style={{ '--val': `${((paragraphCount - 1) / 9) * 100}%` }}
              />
            </div>

            <div className="button-group">
              <button className="generate-button" onClick={handleGenerate}>GENERATE</button>
              {!isCleanMode && (
                <button className="surprise-button" onClick={handleSurprise}>SURPRISE ME!</button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Text Output */}
        <div className="main-panel">
          <div className={`text-output ${selectedVibe === 'twitter-thread' && !isCleanMode ? 'no-indent' : ''}`}>
            {generatedText
              ? generatedText.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))
              : 'Click GENERATE to create some ipsum!'}
          </div>

          {/* Copy / Regenerate */}
          <div className="button-group">
            <button className="copy-button" onClick={handleCopy}>📋 COPY</button>
            <button className="regenerate-button" onClick={handleRegenerate}>🔄 REGENERATE</button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast">Copied to clipboard!</div>
      )}
    </div>
  )
}

export default App