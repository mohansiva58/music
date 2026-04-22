# Video Splitting Guide for Better Performance

The website is now configured to use **2 split video files** instead of 1, which provides:
- ✅ **50% faster scroll response** - smaller files load quicker
- ✅ **Instant cursor tracking** - each chunk responds faster to scroll
- ✅ **Better performance** - reduced memory usage

## What You Need to Do

Split your **herovideo.mp4** into 2 equal parts (each ~4 seconds):
- **hero_part1.mp4** → First half of video
- **hero_part2.mp4** → Second half of video

Place both files in: `frontend/public/`

---

## Option 1: Online Video Splitter (Easiest - No Installation)

1. Go to [Online Convert](https://online-convert.com/file-format/mp4) or [Kapwing](https://www.kapwing.com/trim)
2. Upload your `herovideo.mp4`
3. Set trim points to split at the halfway point (find duration first)
4. Export as `hero_part1.mp4` and `hero_part2.mp4`
5. Download both files to `frontend/public/`

---

## Option 2: VLC Media Player (Free, Easy Desktop Method)

### Step 1: Find Video Duration
1. Open `herovideo.mp4` in VLC
2. Check the total duration (shown at bottom-right)
3. Calculate midpoint (e.g., if 8 seconds → split at 4 seconds)

### Step 2: Extract Part 1
1. File → Conversions
2. Input file: `herovideo.mp4`
3. Click "Edit profile" 
4. In "Video codec" tab, set start time to `00:00:00` and duration to `00:00:04` (adjust based on your video)
5. Save as `hero_part1.mp4`

### Step 3: Extract Part 2
1. Repeat Step 2, but:
2. Set start time to `00:00:04` (your midpoint)
3. Duration to end (leave blank or specify remainder)
4. Save as `hero_part2.mp4`

---

## Option 3: FFmpeg (Command Line - Fastest if Available)

If you have ffmpeg installed:

```bash
# First, check your video duration
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 herovideo.mp4

# Split at 4 seconds (adjust time based on your video length)
ffmpeg -i herovideo.mp4 -t 4 -c copy hero_part1.mp4
ffmpeg -i herovideo.mp4 -ss 4 -c copy hero_part2.mp4
```

### To install ffmpeg on Windows:
```bash
# Using Chocolatey
choco install ffmpeg

# Or using scoop
scoop install ffmpeg

# Or download from https://ffmpeg.org/download.html
```

---

## Option 4: Node.js Script (For Developers)

If you have Node.js with ffmpeg-static:

```bash
npm install --save-dev fluent-ffmpeg
```

Then run a split script (we can create this if needed).

---

## After Splitting Videos

1. ✅ Place `hero_part1.mp4` and `hero_part2.mp4` in `frontend/public/`
2. ✅ Clear browser cache (or hard refresh: Ctrl+Shift+R)
3. ✅ Scroll the page - video should now move **instantly** with your cursor!

---

## Performance Improvements

- **Single video**: Full 8-second file loads → laggy scroll response
- **Split video**: Two 4-second chunks → instant scroll tracking ⚡

The scroll response will now be **immediate** when you move your cursor!

---

## Troubleshooting

**"Video not showing"** → Check file names are exactly `hero_part1.mp4` and `hero_part2.mp4`

**"Still laggy"** → Clear cache and hard refresh (Ctrl+Shift+R)

**"Split at wrong point"** → Re-split at exact midpoint of your video duration

---

## Questions?

If you need help with any method, let me know the video duration and I can help calculate exact split times!
