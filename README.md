# React Drawing App

A modern, feature-rich drawing application built with React, TypeScript, and Tailwind CSS. Create beautiful drawings with shapes, lines, and customizable properties.

## Features

- 🎨 **Drawing Tools**: Rectangle, Circle, Line, and Selection tools
- 🎯 **Element Selection**: Click to select and modify elements
- 🎪 **Drag & Drop**: Move elements around the canvas
- 🌈 **Customizable Properties**: Fill color, stroke color, width, and style
- 💾 **Save/Load**: Persist your drawings in localStorage
- 📸 **Export**: Save your artwork as PNG images
- 🧹 **Clear Canvas**: Start fresh with one click
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Custom Hooks** for state management
- **HTML5 Canvas** for drawing

## Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Top navigation bar
│   ├── Toolbar.tsx         # Tools and properties panel
│   └── Canvas.tsx          # Drawing canvas component
├── hooks/
│   ├── useCanvas.ts        # Canvas operations and rendering
├── types/
│   └── drawing.ts            # TypeScript type definitions
├── pages/
|   └── Drawing
|       └── DrawingApp.tsx      # Main application
├── App.tsx                 # Root component
├── index.tsx              # Application entry point
└── index.css              # Global styles with Tailwind
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone or download the project files**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## Usage

### Tools

- **Select Tool**: Click to select elements, drag to move them
- **Rectangle Tool**: Click and drag to create rectangles
- **Circle Tool**: Click and drag to create circles
- **Line Tool**: Click and drag to create straight lines

### Properties

- **Fill Color**: Set the interior color of shapes
- **Stroke Color**: Set the border color
- **Stroke Width**: Adjust line thickness (1-20px)
- **Stroke Style**: Choose between solid, dashed, or dotted lines

### Actions

- **Save State**: Saves your drawing to browser's localStorage
- **Load State**: Restores a previously saved drawing
- **Export PNG**: Downloads your artwork as a PNG image
- **Clear**: Removes all elements from the canvas

## Custom Hooks

### useDrawing
Manages the drawing state including elements, tools, and user interactions.

### useCanvas
Handles canvas operations, rendering, and mouse position calculations.

### useStorage
Provides save/load functionality and image export capabilities.

## Architecture

The application follows a clean architecture pattern with:

- **Separation of Concerns**: Each component has a single responsibility
- **Custom Hooks**: Business logic is abstracted into reusable hooks
- **Type Safety**: Full TypeScript support with proper type definitions
- **Component Composition**: Modular components that can be easily maintained

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Future Enhancements

- [ ] Undo/Redo functionality
- [ ] Layer management
- [ ] More drawing tools (polygon, text, etc.)
- [ ] Grid and snap-to-grid
- [ ] Zoom and pan
- [ ] Real-time collaboration
- [ ] Custom brushes and textures