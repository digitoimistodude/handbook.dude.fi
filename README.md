# handbook.dude.fi

The public handbook for [Digitoimisto Dude Oy](https://dude.fi), published at
[handbook.dude.fi](https://handbook.dude.fi).

## Development

```bash
npm install
npm run dev    # local dev server at http://localhost:3000
npm run build  # static export to ./out
```

Content lives as markdown in `content/docs/` — the file path maps directly to the
page URL (e.g. `content/docs/security-policy.md` → `/security-policy`). The site is
statically exported and deployed to Cloudflare Pages.
