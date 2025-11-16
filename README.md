# HexPic

A lightweight TypeScript library for converting images to ASCII art in the browser.

## Features

- Convert images to ASCII art directly in the browser
- Support for various image sources (URL, File, ImageElement)
- Customizable output (width, height, character set, contrast, brightness)
- Preserves aspect ratio
- TypeScript support
- Zero dependencies

## Installation

```bash
npm install hexpic
```

## Usage

### Basic Usage

```typescript
import HexPic from 'hexpic';

// Create a new instance with default options
const hexpic = new HexPic();

// Convert an image from a URL
const result = await hexpic.fromUrl('https://example.com/image.jpg');
console.log(result.ascii);

// Or from a file input
const fileInput = document.querySelector('input[type="file"]');
fileInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (file) {
    const result = await hexpic.fromFile(file);
    console.log(result.ascii);
  }
});
```

### Options

You can customize the ASCII art generation with these options:

```typescript
const options = {
  width: 80,                  // Width of the output (in characters)
  height: 40,                 // Height of the output (in characters)
  charset: '@%#*+=-:. ',      // Character set (darkest to lightest)
  invert: false,              // Invert brightness
  contrast: 1.0,              // Contrast adjustment (0-2)
  brightness: 0,              // Brightness adjustment (-1 to 1)
  preserveAspectRatio: true,  // Maintain original image aspect ratio
  backgroundColor: '#000000'  // Background color for transparent images
};

const hexpic = new HexPic(options);
```

### Example with Custom Options

```typescript
const hexpic = new HexPic({
  width: 60,
  height: 30,
  charset: '@%#*+=-:. ', // Default charset
  contrast: 1.2,
  brightness: 0.1,
  backgroundColor: '#000000'
});

// Convert and display the result
const result = await hexpic.fromUrl('path/to/image.jpg');
document.getElementById('output').textContent = result.ascii;
```

## API

### `new HexPic(options?: AsciiArtOptions)`

Creates a new HexPic instance with the specified options.

### Methods

- `fromImageElement(image: HTMLImageElement): Promise<AsciiArtResult>`
  - Converts an HTMLImageElement to ASCII art.

- `fromUrl(url: string): Promise<AsciiArtResult>`
  - Loads an image from a URL and converts it to ASCII art.

- `fromFile(file: File): Promise<AsciiArtResult>`
  - Converts a File object (from a file input) to ASCII art.

- `setOptions(options: AsciiArtOptions): void`
  - Updates the options for ASCII art generation.

### Types

```typescript
interface AsciiArtOptions {
  width?: number;
  height?: number;
  charset?: string;
  invert?: boolean;
  contrast?: number;
  brightness?: number;
  preserveAspectRatio?: boolean;
  backgroundColor?: string;
}

interface AsciiArtResult {
  ascii: string;
  width: number;
  height: number;
  charset: string;
}
```

## Browser Support

HexPic works in all modern browsers that support the Canvas API and Promises. For older browsers, you may need to include polyfills for:

- `Promise`
- `Object.assign`
- `Array.from`

## License

MIT
