import { useCallback, useEffect, useRef } from 'react';
import { useBubbleGame } from './hooks/useBubbleGame';
import { usePopSound } from './hooks/usePopSound';
import { useHaptic } from './hooks/useHaptic';
import { useBreathing } from './hooks/useBreathing';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { BubbleBoard } from './components/game/BubbleBoard';
import { BoardControls } from './components/game/BoardControls';
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

  // Board complete → advance audio texture + soft wave reinflation
  const boardCompleteRef = useRef(false);
  useEffect(() => {
    if (totalCount > 0 && pressedCount === totalCount && !boardCompleteRef.current) {
      boardCompleteRef.current = true;
      advanceTexture();
      waveReset();
    }
    if (pressedCount < totalCount) {
      boardCompleteRef.current = false;
    }
  }, [pressedCount, totalCount, advanceTexture, waveReset]);

  return (
    <div
      className="app-root"
      style={{ background: currentPalette.background }}
    >
      <Header
        lang={lang}
        muted={muted}
        onToggleLang={toggleLang}
        onToggleMute={toggleMute}
        onReset={reset}
      />

      <main className="flex-1 flex flex-col">
        {/* Hero */}
        <section className="text-center px-4 pt-8 pb-6">
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">
            {tr.tagline}
          </h1>
          <p className="text-sm text-slate-400">{tr.description}</p>
        </section>

        {/* Controls */}
        <section
          aria-label={lang === 'es' ? 'Controles' : 'Controls'}
          className="pb-6"
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
          className="flex-1 flex items-center justify-center px-4 pb-8"
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
          </div>
        </section>
      </main>

      <Footer lang={lang as Language} />
    </div>
  );
}
