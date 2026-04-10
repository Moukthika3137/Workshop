# 🐍 Snake Game

A modern, interactive snake game built with vanilla HTML5, CSS3, and JavaScript. Play the classic snake game in your browser with smooth animations, progressive difficulty levels, and high score tracking.

## Table of Contents

- [Features](#features)
- [How to Play](#how-to-play)
- [Controls](#controls)
- [Game Mechanics](#game-mechanics)
- [File Structure](#file-structure)
- [Installation](#installation)
- [Browser Compatibility](#browser-compatibility)
- [Technologies Used](#technologies-used)
- [License](#license)

## Features

✨ **Core Features:**
- Classic snake gameplay with modern UI design
- Real-time score tracking
- High score persistence (stored in browser storage)
- Progressive difficulty levels (speed increases with score)
- Smooth canvas-based rendering
- Responsive design for desktop and mobile devices
- Pause/Resume functionality
- Clean, intuitive controls

🎮 **Game Features:**
- Dynamic food generation (never spawns on snake)
- Collision detection (walls and self)
- Visual feedback with glowing effects
- Grid-based playing field
- Level progression system
- Game over detection with final score display

## How to Play

1. Open `main.html` in your web browser
2. Click the **Start Game** button to begin
3. Guide the snake to eat the red food circles
4. Each food eaten increases your score by 10 points
5. Avoid hitting the walls or the snake's own body
6. Survive as long as possible to achieve a high score

## Controls

| Action | Key(s) |
|--------|--------|
| Move Up | `↑` Arrow Key or `W` |
| Move Down | `↓` Arrow Key or `S` |
| Move Left | `←` Arrow Key or `A` |
| Move Right | `→` Arrow Key or `D` |
| Pause/Resume | `SPACE` |
| Start Game | Click "Start Game" button |
| Pause Game | Click "Pause" button |
| Reset Game | Click "Reset" button |

## Game Mechanics

**Scoring System:**
- Each food eaten = 10 points
- High score is automatically saved to your browser

**Level Progression:**
- Level increases every 100 points
- Game speed increases with each level (up to maximum speed)
- Starting speed: Level 1
- Maximum speed: Level 8

**Gameplay:**
- Snake starts with 3 segments in the center of the grid
- Snake grows by 1 segment when consuming food
- Game ends if snake hits a wall or itself
- Game can be paused at any time during gameplay
- Game state resets when clicking the Reset button

## File Structure

```
DEVOPS/
├── main.html      # Game UI and HTML structure
├── styles.css     # Styling and responsive design
├── game.js        # Game engine and logic
└── README.md      # This file
```

### File Descriptions

**main.html**
- HTML5 semantic markup
- Game canvas (400x400)
- Score display and level indicator
- Control buttons (Start, Pause, Reset)
- References to CSS and JavaScript files

**styles.css**
- Modern gradient background
- Responsive layout
- Button styling with hover effects
- Canvas styling with shadows and glows
- Mobile-friendly media queries
- Animation effects

**game.js**
- SnakeGame class for game logic
- Event listeners for keyboard controls
- Canvas rendering engine
- Collision detection system
- Food spawning algorithm
- Score and level management
- High score persistence using localStorage

## Installation

1. **Clone or Download**: Get the files to your local machine
   ```bash
   git clone <repository-url>
   cd DEVOPS
   ```

2. **Open in Browser**: Simply open `main.html` in any modern web browser
   - Double-click `main.html`, or
   - Right-click and select "Open with" and choose your browser

3. **No Dependencies**: This project uses only vanilla JavaScript - no external libraries or build tools required!

## Browser Compatibility

✅ Works on all modern browsers:
- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

**Requirements:**
- HTML5 Canvas support
- localStorage API support
- ES6 JavaScript support

## Technologies Used

- **HTML5** - Semantic markup and Canvas API
- **CSS3** - Flexbox, gradients, animations, media queries
- **Vanilla JavaScript** - No frameworks or libraries
- **Canvas API** - 2D rendering
- **localStorage API** - High score persistence

## Game Features in Detail

### Food System
- Food appears at random grid positions
- Food never spawns on the snake's current position
- Each food is represented as a red glowing circle
- Automatically regenerates after being eaten

### Speed & Difficulty
```
Level 1: Speed 8 (100ms per move)
Level 2: Speed 9 (89ms per move)
...increasing gradually...
Level 8+: Speed 15 (40ms per move - maximum)
```

### Visual Design
- Green glowing snake with head brighter than body
- Black gaming grid background with subtle grid lines
- Red glowing food circles
- Purple gradient UI with smooth animations
- Responsive design adapts to screen size

### High Score Storage
- High score is saved automatically using browser's localStorage
- Persists between browser sessions
- Displayed prominently on the UI
- Updates in real-time during gameplay

## Tips & Tricks

💡 **Gameplay Tips:**
1. Plan your movements ahead - the snake responds quickly
2. Try to make smooth, flowing patterns to avoid dead-ends
3. Keep the snake in one half of the screen to maximize room
4. Use the pause button to strategize on difficult moments
5. Watch out for the edges - walls are instant game-overs!

🎯 **Challenge Ideas:**
- Reach a score of 100 points
- Reach level 3 or higher
- Beat your personal high score
- Play on mobile for an extra challenge

## Future Enhancement Ideas

Potential features to add:
- Sound effects and background music
- Different game modes (walls, obstacles, timed)
- Leaderboard system
- Snake skins/themes
- Power-ups and special items
- Mobile touch controls
- Difficulty presets
- Game statistics (personal best, games played, etc.)

## License

This project is open source and free to use for personal and educational purposes. Feel free to modify and redistribute as needed.

---

**Enjoy the game! 🎮**


