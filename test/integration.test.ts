import HexPic from '../src/HexPic';

// This is a real image test that runs in a browser-like environment
describe('HexPic Integration', () => {
  let hexpic: HexPic;

  beforeAll(() => {
    hexpic = new HexPic({ width: 20, height: 10 });
  });

  it('should convert a simple image to ASCII', async () => {
    // Create a simple 2x2 white image
    const canvas = document.createElement('canvas');
    canvas.width = 2;
    canvas.height = 2;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 2, 2);
    
    const dataUrl = canvas.toDataURL();
    const result = await hexpic.fromUrl(dataUrl);
    
    // Should be mostly spaces (white)
    expect(result.ascii.trim()).toMatch(/^[. ]+$/);
  });

  it('should handle different character sets', async () => {
    const customHexpic = new HexPic({
      width: 10,
      height: 5,
      charset: '@# ',
    });
    
    const canvas = document.createElement('canvas');
    canvas.width = 10;
    canvas.height = 10;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 10, 10);
    
    const dataUrl = canvas.toDataURL();
    const result = await customHexpic.fromUrl(dataUrl);
    
    // Should only contain characters from the custom charset
    expect(result.ascii).toMatch(/^[@# \n]+$/);
  });
});