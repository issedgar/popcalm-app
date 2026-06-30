import { useCallback, useEffect, useRef, useState } from 'react';
import { useBubbleGame } from './hooks/useBubbleGame';
import { usePopSound } from './hooks/usePopSound';
import { useHaptic } from './hooks/useHaptic';
import { useBreathing } from './hooks/useBreathing';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { BubbleBoard } from './components/game/BubbleBoard';
import { BoardControls } from './components/game/BoardControls';
import { ProgressBar } from './components/game/ProgressBar';
import { Celebration } from './components/game/Celebration';
import { PaletteFlash } from './components/game/PaletteFlash';
import { OnboardingHint } from './components/game/OnboardingHint';
import { AmbientBubbles } from './components/game/AmbientBubbles';
import { t } from './config/i18n';
import type { Language } from './types/game';

export default function App() {
  const {
    lang,
    setLang,
    shapeId,
    paletteId,
    setPaletteId,
    changeShape,
    bubbleStates,
    toggleBubble,
    pressBubble,
    releaseBubble,
    reset,
    waveReset,
    currentShape,
    currentPalette,
    pressedCount,
    totalCount,
  } = useBubbleGame();

  const { muted, toggleMute, playPress, playRelease, advanceTexture } = usePopSound();
  const { press: hapticPress, release: hapticRelease } = useHaptic();

  // Tracks the last time the user interacted with any bubble
  const lastInteractionRef = useRef<number>(Date.now());

  const { guideId, cancelGuide } = useBreathing({
    positions: currentShape.positions,
    bubbleStates,
    lastInteractionRef,
  });

  const tr = t(lang);
  const toggleLang = () => setLang(lang === 'es' ? 'en' : 'es');

  // Celebration trigger — increments on every board completion
  const [celebrateTrigger, setCelebrateTrigger] = useState(0);

  // Resolve bubble row from id for pentatonic pitch mapping
  const getRow = useCallback(
    (id: string) => currentShape.positions.find((p) => p.id === id)?.row ?? 0,
    [currentShape],
  );

  const handleToggle = useCallback(
    (id: string) => {
      lastInteractionRef.current = Date.now();
      if (id === guideId) cancelGuide();
      const isCurrentlyDown = bubbleStates[id] === 'down';
      toggleBubble(id);
      const row = getRow(id);
      if (isCurrentlyDown) {
        hapticRelease();
        playRelease(row);
      } else {
        hapticPress();
        playPress(row);
      }
    },
    [bubbleStates, toggleBubble, playPress, playRelease, getRow, hapticPress, hapticRelease, guideId, cancelGuide],
  );

  const handlePress = useCallback(
    (id: string) => {
      lastInteractionRef.current = Date.now();
      pressBubble(id);
      hapticPress();
      playPress(getRow(id));
    },
    [pressBubble, playPress, getRow, hapticPress],
  );

  const handleRelease = useCallback(
    (id: string) => {
      lastInteractionRef.current = Date.now();
      releaseBubble(id);
      hapticRelease();
      playRelease(getRow(id));
    },
    [releaseBubble, playRelease, getRow, hapticRelease],
  );

  // Cancel guide if it gets pressed via drag (drag bypasses handleToggle)
  useEffect(() => {
    if (guideId && bubbleStates[guideId] === 'down') {
      cancelGuide();
    }
  }, [guideId, bubbleStates, cancelGuide]);

  // Board complete → advance audio texture + soft wave reinflation + celebrate
  const boardCompleteRef = useRef(false);
  useEffect(() => {
    if (totalCount > 0 && pressedCount === totalCount && !boardCompleteRef.current) {
      boardCompleteRef.current = true;
      advanceTexture();
      waveReset();
      setCelebrateTrigger((c) => c + 1);
    }
    if (pressedCount < totalCount) {
      boardCompleteRef.current = false;
    }
  }, [pressedCount, totalCount, advanceTexture, waveReset]);

  const atmosphereStyle = {
    background: currentPalette.background,
    '--bg-glow': currentPalette.colors[0],
    '--bg-glow-2': currentPalette.colors[currentPalette.colors.length - 1],
  } as React.CSSProperties;

  return (
    <div className="app-root" style={atmosphereStyle}>
      <AmbientBubbles palette={currentPalette} />
      <Header
        lang={lang}
        muted={muted}
        onToggleLang={toggleLang}
        onToggleMute={toggleMute}
        onReset={reset}
      />

      <main className="flex-1 flex flex-col">
        {/* Hero */}
        <section className="text-center px-4 pt-5 pb-2 sm:pt-7 sm:pb-3">
          <h1 className="hero-title">{tr.tagline}</h1>
          <p className="hero-subtitle">{tr.description}</p>
        </section>

        {/* Progress bar */}
        <section
          aria-label={lang === 'es' ? 'Progreso' : 'Progress'}
          className="px-4 pb-3 flex justify-center"
        >
          <ProgressBar
            pressed={pressedCount}
            total={totalCount}
            palette={currentPalette}
            label={`${pressedCount} ${tr.of} ${totalCount} ${tr.bubbles} ${tr.pressed}`}
          />
        </section>

        {/* Controls */}
        <section
          aria-label={lang === 'es' ? 'Controles' : 'Controls'}
          className="pb-4 sm:pb-5"
        >
          <BoardControls
            shapeId={shapeId}
            paletteId={paletteId}
            pressedCount={pressedCount}
            totalCount={totalCount}
            lang={lang as Language}
            onShapeChange={changeShape}
            onPaletteChange={setPaletteId}
            onReset={reset}
          />
        </section>

        {/* Board */}
        <section
          aria-label={lang === 'es' ? 'Tablero' : 'Board'}
          className="flex-1 flex items-start justify-center px-3 sm:px-4 pb-6"
        >
          <div
            className="board-surface"
            style={{
              background: currentPalette.surface,
              borderColor: currentPalette.border,
            }}
          >
            <BubbleBoard
              shape={currentShape}
              palette={currentPalette}
              bubbleStates={bubbleStates}
              lang={lang as Language}
              guideId={guideId}
              onToggle={handleToggle}
              onPress={handlePress}
              onRelease={handleRelease}
            />
            <PaletteFlash palette={currentPalette} />
            <OnboardingHint palette={currentPalette} lang={lang as Language} />
            <Celebration
              trigger={celebrateTrigger}
              palette={currentPalette}
              lang={lang as Language}
            />
          </div>
        </section>
      </main>

      <Footer lang={lang as Language} />
    </div>
  );
}
