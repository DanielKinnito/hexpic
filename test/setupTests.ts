class MockCanvasRenderingContext2D {
  getImageData() {
    return {
      data: new Uint8ClampedArray(100 * 100 * 4).fill(128),
      width: 100,
      height: 100,
    };
  }
  drawImage() {}
  fillRect() {}
  fillText() {}
  get fillStyle() { return ''; }
  set fillStyle(value: string) {}
}

class MockHTMLCanvasElement {
  getContext() {
    return new MockCanvasRenderingContext2D() as any;
  }
  toDataURL() {
    return 'data:image/png;base64,mock';
  }
  get width() { return 100; }
  set width(value: number) {}
  get height() { return 100; }
  set height(value: number) {}
}

(global as any).HTMLCanvasElement = MockHTMLCanvasElement;
(global as any).document = {
  createElement: () => new MockHTMLCanvasElement(),
};

class MockImage {
  onload: (() => void) | null = null;
  src: string = '';
  width: number = 100;
  height: number = 100;
  constructor() {
    setTimeout(() => {
      if (this.onload) this.onload();
    }, 0);
  }
}

(global as any).Image = MockImage;