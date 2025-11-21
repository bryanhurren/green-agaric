# Favicon Generation TODO

## Current Status
- ✓ site.webmanifest created
- ✓ favicon.svg created (placeholder mushroom design)
- ⚠️ PNG and ICO files need to be generated

## Required Files
Generate from favicon.svg or create new design:

1. **favicon.ico** (32x32 + 16x16 multi-resolution)
2. **favicon-16x16.png**
3. **favicon-32x32.png**
4. **apple-touch-icon.png** (180x180)
5. **favicon-192x192.png** (for manifest)
6. **favicon-512x512.png** (for manifest)

## Design Requirements (per claude.md)
- Simple mushroom or organic shape
- Recognizable at 16x16
- Forest green primary color (#3D7C47)
- Works on light and dark backgrounds

## Generation Methods

### Option 1: Using Figma/Sketch/Design Tool
1. Design at 512x512
2. Export all required sizes
3. Use https://realfavicongenerator.net/ for ICO generation

### Option 2: Using ImageMagick
```bash
# Install ImageMagick
brew install imagemagick

# Generate all sizes
magick favicon.svg -resize 16x16 favicon-16x16.png
magick favicon.svg -resize 32x32 favicon-32x32.png
magick favicon.svg -resize 180x180 apple-touch-icon.png
magick favicon.svg -resize 192x192 favicon-192x192.png
magick favicon.svg -resize 512x512 favicon-512x512.png

# Generate ICO (multi-resolution)
magick favicon-16x16.png favicon-32x32.png favicon.ico
```

### Option 3: Online Generator
Use https://realfavicongenerator.net/
- Upload 512x512 PNG
- Configure all platforms
- Download and extract to /public

## Current Placeholder
The site will work with favicon.svg in modern browsers, but should have proper PNG/ICO files before production deployment.
