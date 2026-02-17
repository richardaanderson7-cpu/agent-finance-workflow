# AI-First Finance Operations - Website

## About
This website showcases an experimental agent-first finance system.

## Security
- ✅ No API keys or credentials
- ✅ No personally identifiable information (PII)
- ✅ All data is sanitized test data
- ✅ Financial figures rounded to nearest $100
- ✅ Safe for public sharing

## Local Development
```bash
# View locally
python3 -m http.server 8000
# Open http://localhost:8000
```

## Deployment Options

### GitHub Pages (Recommended)
1. Create new repo: `agent-finance-showcase`
2. Push website folder contents
3. Enable GitHub Pages in repo settings
4. Site will be live at: `https://yourusername.github.io/agent-finance-showcase`

### Netlify
1. Drag and drop `website` folder to netlify.com
2. Site deploys automatically
3. Free HTTPS included

## Files
- `index.html` - Main page
- `js/main.js` - JavaScript for loading/displaying data
- `data/reports.json` - Sanitized financial data
- `README.md` - This file

## Updating Data
Run from parent directory:
```bash
python3 export_for_website.py
```

This regenerates `data/reports.json` with latest figures.
