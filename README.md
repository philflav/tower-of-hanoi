# Tower of Hanoi Game

An interactive implementation of the classic Tower of Hanoi puzzle using HTML, CSS, and JavaScript.

## Features

- Interactive drag-and-drop disk movement
- Support for 3, 4, or 5 disks
- Move counter with optimal move tracking
- Automated solution demonstration
- Win/lose conditions based on optimal moves
- Visual feedback for valid/invalid moves

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Express.js (for local server)

## How to Play

1. Select the number of disks (3-5) from the dropdown
2. Click a disk to select it
3. Click a tower to place the selected disk
4. Move all disks to the rightmost tower
5. Try to complete the puzzle in the optimal number of moves

## Game Rules

- Only one disk can be moved at a time
- A larger disk cannot be placed on top of a smaller disk
- All disks start on the leftmost tower
- The goal is to move all disks to the rightmost tower

## Development

The game uses modern web technologies and features:
- Async/await for the solution animation
- CSS Flexbox for layout
- Custom dialog system
- Modular JavaScript functions