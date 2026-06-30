# PopCalm

![ES](https://img.shields.io/badge/ES-Español-0d6efd?style=for-the-badge)&nbsp;&nbsp;[![EN](https://img.shields.io/badge/EN-English-aaa?style=for-the-badge)](README.en.md)

PopCalm es un juego web relajante inspirado en los juguetes pop-it. Está construido con Vite, React, TypeScript y Tailwind CSS.

La experiencia es simple y táctil: el usuario elige una forma, selecciona una paleta de colores y presiona burbujas con click, tap o arrastre. No es competitivo; está pensado como una interacción breve, visual y calmada.

## Características

- Tablero interactivo estilo pop-it.
- Selector de formas: cuadrado, círculo, tira, corazón, hexágono y flor.
- Selector de paletas: Pop-It, Aurora, Océano, Dulce, Atardecer y Minimal.
- Interacción con mouse, touch y stylus usando Pointer Events.
- Arrastre para presionar o soltar varias burbujas.
- Contador de burbujas presionadas y barra de progreso.
- Controles de reinicio en header y panel de controles.
- Interfaz en español e inglés.
- Control de sonido y feedback háptico cuando el dispositivo lo permite.
- Layout responsive para desktop y móvil.
- Burbujas accesibles con `aria-label`, `aria-pressed` y estados de foco visibles.
- Soporte para `prefers-reduced-motion`.

## Stack

- Vite 8
- React 19
- TypeScript 6
- Tailwind CSS 4
- lucide-react
- pnpm

## Requisitos

- Node.js `>=22.12.0`
- pnpm `>=11.5.3`

El package manager está definido en `package.json`:

```bash
pnpm@11.5.3
```

## Instalación

```bash
pnpm install
```

```bash
pnpm dev
```

Por defecto, Vite sirve la app en:

```txt
http://localhost:5173/
```

## Comandos disponibles

```bash
pnpm dev
```

Ejecuta el servidor de desarrollo de Vite.

```bash
pnpm build
```

Ejecuta validación de TypeScript y genera el build de producción en `dist/`.

```bash
pnpm lint
```

Ejecuta ESLint en el proyecto.

```bash
pnpm preview
```

Sirve localmente el build de producción después de ejecutar `pnpm build`.

## Estructura del proyecto

```txt
src/
  components/
    game/
      AmbientBubbles.tsx
      BoardControls.tsx
      Bubble.tsx
      BubbleBoard.tsx
      Celebration.tsx
      OnboardingHint.tsx
      PaletteFlash.tsx
      ProgressBar.tsx
    layout/
      Footer.tsx
      Header.tsx
  config/
    i18n.ts
    palettes.ts
    shapes.ts
  hooks/
    useBubbleGame.ts
    useBreathing.ts
    useHaptic.ts
    useLocalStorage.ts
    usePopSound.ts
  types/
    game.ts
  utils/
    cn.ts
    shapeFactory.ts
  App.tsx
  index.css
  main.tsx
```

## Notas de implementación

- `src/App.tsx` compone la experiencia principal: header, texto inicial, progreso, controles, tablero, overlays y footer.
- `src/hooks/useBubbleGame.ts` administra estado del juego: idioma, forma, paleta, estado de burbujas, reinicio y reinicio por ola.
- `src/components/game/BubbleBoard.tsx` maneja Pointer Events y arrastre.
- `src/components/game/Bubble.tsx` renderiza cada burbuja como botón nativo.
- `src/config/shapes.ts` define las formas disponibles.
- `src/utils/shapeFactory.ts` genera posiciones estructuradas para las burbujas.
- `src/config/palettes.ts` define las paletas visuales.
- `src/config/i18n.ts` contiene los textos visibles en español e inglés.
- `src/index.css` contiene el sistema visual, estados táctiles, responsive layout, animaciones y reduced motion.

## Cómo editar contenido

### Agregar o modificar una paleta

Edita:

```txt
src/config/palettes.ts
```

Cada paleta debe definir `id`, etiquetas en español e inglés, `colors`, `background`, `surface`, `accent` y `border`.

### Agregar o modificar una forma

Edita:

```txt
src/config/shapes.ts
src/utils/shapeFactory.ts
```

Las posiciones deben generarse con estructura y cada burbuja debe tener un id único.

### Actualizar textos visibles

Edita:

```txt
src/config/i18n.ts
```

El idioma por defecto de la app es español. Mantén consistencia entre español e inglés.

### Ajustar diseño visual

Edita:

```txt
src/index.css
```

La dirección visual debe mantenerse suave, táctil, colorida y calmada. Evita animaciones pesadas, saturación excesiva o layouts tipo dashboard.

## Accesibilidad

- Las burbujas se renderizan como `<button>`.
- El estado de cada burbuja se expone con `aria-pressed`.
- Los controles solo con icono tienen `aria-label`.
- Los enlaces externos usan `target="_blank"` y `rel="noopener noreferrer"`.
- Los estados de foco son visibles.
- La animación se reduce con `prefers-reduced-motion: reduce`.
- El tablero usa Pointer Events para mouse, touch y stylus.

## Validación

Antes de considerar listo un cambio:

```bash
pnpm build
pnpm lint
```

Luego valida manualmente:

- Layout desktop.
- Layout móvil.
- Tap/click sobre burbujas.
- Arrastre sobre varias burbujas.
- Cambio de forma.
- Cambio de paleta.
- Reinicio del tablero.
- Cambio de idioma.
- Control de sonido.
- Foco y activación por teclado en burbujas.
- Comportamiento con reduced motion.

## Deployment

Esta app es un frontend estático. Cualquier hosting que soporte salida estática de Vite puede servir el proyecto.

Salida de producción:

```txt
dist/
```

Flujo típico:

```bash
pnpm build
```

Después despliega el directorio `dist/` con el proveedor que uses.

## Variables de entorno

La versión actual no requiere variables de entorno.

## Troubleshooting

### El servidor no está en el puerto 5173

Vite puede usar otro puerto si `5173` ya está ocupado. Revisa la salida de:

```bash
pnpm dev
```

### El tap móvil no funciona correctamente

La interacción de burbujas depende de Pointer Events. Después de cambios en estos archivos, valida en viewport móvil o dispositivo real:

```txt
src/components/game/Bubble.tsx
src/components/game/BubbleBoard.tsx
src/index.css
```

### Los estilos parecen desactualizados

Reinicia el servidor y haz hard refresh. Si pruebas producción, reconstruye primero:

```bash
pnpm build
pnpm preview
```

## Mantenimiento

- Mantén la app como frontend estático mientras no exista un requerimiento real de backend.
- No agregues motores de juego pesados para esta interacción.
- Mantén una cantidad razonable de burbujas para rendimiento móvil.
- Prefiere HTML semántico antes de agregar ARIA.
- Mantén textos visibles en `src/config/i18n.ts`.
- Mantén tokens visuales y comportamiento táctil en `src/index.css`.
- Ejecuta `pnpm build` antes de entregar cambios.
