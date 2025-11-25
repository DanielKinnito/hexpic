const fs = require('fs');
const { JSDOM } = require('jsdom');
const { HexPic } = require('../dist/index.js');
const path = require('path');

// Setup JSDOM
const dom = new JSDOM('<!DOCTYPE html>', {
    resources: 'usable',
    pretendToBeVisual: true,
});
global.window = dom.window;
global.document = dom.window.document;
global.HTMLCanvasElement = dom.window.HTMLCanvasElement;
global.HTMLImageElement = dom.window.HTMLImageElement;
global.Image = dom.window.Image;

async function run() {
    try {
        // Use the comprehensive charset
        const charset = '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,"^`\'. ';

        const hexpic = new HexPic({
            width: 100,
            height: 50,
            charset: charset,
            contrast: 1.0,
            brightness: 0,
        });

        const imagePath = path.resolve(__dirname, '../demo/profile.png');
        if (!fs.existsSync(imagePath)) {
            console.error('Profile image not found at:', imagePath);
            return;
        }

        const buffer = fs.readFileSync(imagePath);
        const base64 = buffer.toString('base64');
        const dataUrl = `data:image/png;base64,${base64}`;

        console.log('Converting image to ASCII...');
        const result = await hexpic.fromUrl(dataUrl);

        console.log('\n' + result.ascii + '\n');
        console.log(`Generated ${result.width}x${result.height} ASCII art.`);
    } catch (error) {
        console.error('Error:', error);
    }
}

run();
