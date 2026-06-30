import { useCallback } from 'react';
import { useBubbleGame } from './hooks/useBubbleGame';
import { usePopSound } from './hooks/usePopSound';
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
    currentShape,
    currentPalette,
    pressedCount,
    totalCount,
  } = useBubbleGame();

  const { muted, toggleMute, playPress, playRelease } = usePopSound();

  const tr = t(lang);
  const toggleLang = () => setLang(lang === 'es' ? 'en' : 'es');

  // Toggle: play press or release depending on current state
  const handleToggle = useCallback(
    (id: string) => {
      const isCurrentlyDown = bubbleStates[id] === 'down';
      toggleBubble(id);
      if (isCurrentlyDown) playRelease();
      else playPress();
    },
    [bubbleStates, toggleBubble, playPress, playRelease],
  );

  // Drag press: always goes down
  const handlePress = useCallback(
    (id: string) => {
      pressBubble(id);
      playPress();
    },
    [pressBubble, playPress],
  );

  // Drag release: always goes up
  const handleRelease = useCallback(
    (id: string) => {
      releaseBubble(id);
      playRelease();
    },
    [releaseBubble, playRelease],
  );

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
