# HexPic

> A lightweight, zero-dependency TypeScript library to convert images into high-quality ASCII art. Now with React support!

HexPic allows you to easily transform images into ASCII art directly in the browser or Node.js. It supports various input formats (URL, File, HTMLImageElement) and offers customization options like contrast, brightness, and character sets.

## Features

- 🚀 **Zero Dependencies**: Lightweight and fast.
- ⚛️ **React Support**: Includes a `useHexPic` hook and `<HexPicImage />` component.
- 🎨 **Customizable**: Adjust contrast, brightness, dimensions, and character sets.
- 📱 **Responsive**: Preserves aspect ratio and scales with your layout.
- 🔧 **TypeScript**: Fully typed for a great developer experience.

## Installation

```bash
npm install hexpic
```

## Usage

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

### Usage with React / Next.js

HexPic includes a built-in hook for easy integration with React applications.

```typescript
import { useHexPic } from 'hexpic';

function AsciiArtComponent() {
  const { ascii, convert, isLoading, error } = useHexPic({
    width: 60,
    height: 30,
    contrast: 1.2
  });

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await convert(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      
      {isLoading && <p>Converting...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      
      <pre style={{ 
        fontFamily: 'monospace', 
        lineHeight: '1em', 
        whiteSpace: 'pre',
        backgroundColor: 'black',
        color: 'white'
      }}>
        {ascii}
      </pre>
    </div>
  );
}
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
