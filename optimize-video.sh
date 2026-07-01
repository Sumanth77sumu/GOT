#!/usr/bin/env bash
set -euo pipefail

# Optimize the scroll-driven background video for smoother playback.
# Requires ffmpeg to be installed.
# Recommended for browser scrubbing: H.264, yuv420p, 60fps, faststart.

INPUT="public/video/one.mp4"
OUTPUT="public/video/one-optimized.mp4"

if [ ! -f "$INPUT" ]; then
  echo "Missing $INPUT"
  exit 1
fi

echo "Encoding $INPUT -> $OUTPUT"
ffmpeg -y -i "$INPUT" \
  -c:v libx264 \
  -profile:v high \
  -preset slow \
  -crf 20 \
  -pix_fmt yuv420p \
  -r 60 \
  -movflags +faststart \
  -c:a aac \
  -b:a 128k \
  "$OUTPUT"

echo "Optimized video written to $OUTPUT"

echo "If this file is still too large or choppy, try reducing resolution:"
echo "  ffmpeg -y -i $INPUT -c:v libx264 -profile:v high -preset slow -crf 20 -pix_fmt yuv420p -r 60 -vf scale=1280:-2 -movflags +faststart -c:a aac -b:a 128k public/video/one-optimized-1280.mp4"
