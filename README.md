# Christmas Dinner Planner

A simple web app to help plan your Christmas dinner by organizing dishes by cooking time.

## Features

- Add dishes with cooking times (in minutes)
- Automatically sorts items by longest cooking time first
- Saves your list in browser localStorage
- Mobile-friendly interface

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:5174 in your browser.

## Deploying to GitHub Pages

1. Create a new repository on GitHub named `christmas-dinner`

2. Push your code to GitHub:
```bash
git remote add origin https://github.com/YOUR_USERNAME/christmas-dinner.git
git push -u origin main
```

3. Enable GitHub Pages:
   - Go to repository Settings → Pages
   - Under "Source", select "GitHub Actions"

4. The GitHub Actions workflow will automatically build and deploy your app

5. Your app will be available at: `https://YOUR_USERNAME.github.io/christmas-dinner`

## Usage

1. Enter a dish name (e.g., "Turkey")
2. Enter cooking time in minutes (e.g., 180)
3. Click "Add Item"
4. Items are automatically sorted with longest cooking time first
5. Start cooking from top to bottom to have everything ready together

## Notes

- Data is saved in browser localStorage
- If you clear browser data, your list will be reset
- Works best on mobile devices for easy access while cooking
