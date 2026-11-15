# Photos Folder for Peninsula Insights

Welcome! This folder is where you can store and transfer photos for your website.

## How to add your photos:

### Option 1: Quick Drop-in (Easiest)
Simply copy your photo files into this `photos` folder and name them:
- `photo1.jpg` (or `.png` / `.webp`)
- `photo2.jpg`
- `photo3.jpg`
- `photo4.jpg`
- `photo5.jpg`
- `photo6.jpg`

The website is already coded to look for these names first! If a `.jpg` photo is not found, it automatically falls back to the clean placeholder vector.

### Option 2: Custom Photo Names
You can add any photos with any names you like into this folder (e.g. `team-summit.jpg`, `boardroom-meeting.jpg`, `research-session.jpg`).

To display them on the website, open `gallery.html` or `index.html` and change the `src` attribute:
```html
<img src="photos/your-photo-name.jpg" alt="Your Description" />
```

## Where Photos Appear:
1. **Gallery Page (`gallery.html`)**: Features the complete photo collection with titles, category tags, and full descriptive paragraphs, plus a modal preview when clicked.
2. **Homepage (`index.html`)**: Features highlighted photos in the "Insights & Field Photos" section with summaries and quick links to the gallery.

Feel free to paste your photos directly into this folder!
