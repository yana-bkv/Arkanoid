# Arkanoid Game (Pure JavaScript)

A simple Arkanoid clone built with **vanilla JavaScript** and the **Canvas API**. Control the paddle, bounce the ball, break the logic — and test your reflexes.

---

## 🎮 Controls
```
Start Game     = Press Space
Pause/Resume   = Press Enter
Move Paddle    = Arrow Keys (←, →)
Restart Game   = Press Escape
```

The **score** and **HP (lives left)** are displayed on the left side of the screen.

---

## ✅ Features

- Canvas-based game board rendering
- Paddle movement with arrow keys
- Ball physics (bounce off paddle and walls)
- Game over when the ball misses the paddle
- Pause/resume functionality
- Win and lose game screens
- Score and HP tracking
- Timer:
  - Starts when the game begins
  - Pauses when the game is paused
  - Game is lost if time exceeds 5 minutes

---

## 🚧 To Do

- [ ] Fix: Ball sometimes bounces even when missing the paddle
- [ ] Add better edge-case collision handling

---

## 🧠 Resources Used

- [Canvas Arkanoid Game Tutorial](https://blog.thejaytray.com/canvas-basics-arkanoid-game-tutorial/) — base inspiration
- [MDN Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) — official Canvas docs
- ChatGPT — logic help, refactoring, and debugging support

---

## 🚀 How to Run

Open `index.html` in your browser. No dependencies, no build tools.

---

## 📁 Project Structure
```
arkanoid-game/
├── index.html         # Main HTML file
├── styles.css         # Game styling
├── game.js            # Main game logic
├── assets/            # Images, sounds (if any)
└── README.md
```

## 📌 About the Project

This project was made as a learning exercise to understand real-time rendering, game loops, keyboard input, and basic game logic using pure JavaScript.

It's simple by design, but easy to extend: you can add levels, bricks, sound effects, or a scoreboard in the future.

---

Made with code and curiosity.
