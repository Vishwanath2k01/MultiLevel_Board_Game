# Memory Board Game

## Overview
This project is a memory-based game built using **React.js** and developed with the **Vite** tool for fast builds and development. The game challenges users to click on lit-up cells in a grid within a given time frame, accumulating points to progress through levels. The grid size increases with each level, and the game ends either when the player fails to achieve the required score or completes all levels.

The project is structured into multiple React components, each handling specific functionalities. Styling is managed through CSS files to ensure a clean and responsive design.

---

## Project Flow
1. **Start of the Game**: The `Game` component initializes the game by displaying the first level.
2. **Gameplay**:
   - Random cells light up periodically.
   - Players gain or lose points by clicking on cells.
   - The timer decreases, creating urgency.
3. **Level Completion**:
   - Players advance to the next level upon achieving the required score within the time limit.
   - The grid size increases for added difficulty.
4. **Game Over**:
   - If the player fails to achieve the score before time runs out, the game ends.
5. **Reset Game**: An alert message allows the user to restart the game from Level 1.

---

## Folder Structure
```
project-root/
|-- src/
|   |-- components/
|   |   |-- Board.jsx
|   |   |-- Game.jsx
|   |-- styles/
|   |   |-- Board.css
|   |   |-- Game.css
|   |   |-- index.css
|   |-- App.jsx
|   |-- main.jsx
|-- public/
|-- index.html
|-- package.json
|-- vite.config.js
```

### Key Files
1. **`Board.jsx`**: Handles the rendering of the grid and cell interactions.
2. **`Game.jsx`**: Manages the game's logic, including level progression, scoring, and timing.
3. **`Board.css`**: Contains styles for the grid and cells.
4. **`Game.css`**: Styles for the game interface, including layout and score display.
5. **`index.css`**: Global styles for the app layout and centering.

---

## Component Details

### `Game.jsx`
The `Game` component manages the core logic of the game.

#### **State Variables**:
- `currentLevel`: Tracks the player's current level.
- `litCell`: Stores the index of the currently lit-up cell.
- `score`: The player's current score.
- `timeRemaining`: The countdown timer for the current level.

#### **Level Configuration**:
Levels are defined in the `levelConfigs` array, where each level has:
- `levelName`: Display name of the level.
- `gridSize`: Number of rows/columns in the grid.
- `cellLitDuration`: How long a cell stays lit.
- `levelDuration`: Total time for the level.
- `levelPassingScore`: Score required to pass the level.

#### **Logic**:
1. **Lighting Up Cells**:
   - A `useEffect` hook sets an interval to light up random cells using the `Math.random` function.
   - The `litCell` state is updated with the randomly selected cell index.

2. **Timer Management**:
   - Another `useEffect` decrements the `timeRemaining` state every second.

3. **Level Progression and Game Over**:
   - When the timer reaches 0, the component checks the player's score.
   - If the score meets or exceeds the passing score, the player progresses to the next level.
   - If the score is insufficient, the game ends, and the player is prompted to restart.

4. **Cell Click Handling**:
   - The `handleCellClick` function checks if the clicked cell matches the lit cell.
   - If correct, the score increases; otherwise, it decreases (with a minimum score of 0).

5. **Reset Game**:
   - Resets all states to their initial values for a new game.

#### **JSX Structure**:
```jsx
return (
  <div className="game">
    <h2>Memory Board</h2>
    <div className="game-info">
      <p>{levelName}</p>
      <p>Score: {score}</p>
      <p>Time: {timeRemaining}s</p>
    </div>
    <Board gridSize={gridSize} litCell={litCell} handleCellClick={handleCellClick} />
  </div>
);
```

---

### `Board.jsx`
The `Board` component renders the grid and manages interactions with individual cells.

#### **Props**:
- `gridSize`: Determines the number of rows and columns in the grid.
- `litCell`: The index of the currently lit-up cell.
- `handleCellClick`: A function passed from the `Game` component to handle cell clicks.

#### **Logic**:
1. **Cell Rendering**:
   - The grid is dynamically created using a loop, generating `gridSize * gridSize` cells.
   - Each cell is rendered as a `div` with a unique key.

2. **Lit Cell Highlighting**:
   - The `lit` class is conditionally added to the cell that matches the `litCell` index.

#### **JSX Structure**:
```jsx
return (
  <div className="board" data-size={gridSize}>
    {cells}
  </div>
);
```

#### **CSS Integration**:
- `.board`: A grid container styled with `grid-template-columns` and `grid-template-rows` based on the `data-size` attribute.
- `.cell`: Individual cells styled with a default background color and hover effects.
- `.lit`: Applies a distinct background color to lit cells.

---

## Styling Details

### `Board.css`
- **Dynamic Grid**:
  The `data-size` attribute on the board dynamically adjusts the grid layout.
- **Lit Cells**:
  The `.lit` class changes the background color of the lit cell for visual feedback.

### `Game.css`
- **Layout**:
  The game container is centered and styled with borders and spacing.
- **Score and Timer**:
  Displayed flexibly using `justify-content: space-between` for a clean layout.

### `index.css`
- **Global Styles**:
  Aligns the entire app in the center of the viewport for better UX.

---

## How to Run the Project

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run the Development Server**:
   ```bash
   npm run dev
   ```
