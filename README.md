# Next.js Devstore

_Rocketseat project (slight modified with frontend and backend segregation)_

## Cache & Memoization

- **Memoization**: Do not repeat a calculation or variable creation unless it is necessary. When two or more equal request to the same route, and same parameters are made in different declarations on the _same page_, it only occurs once (Deduplication)
- **Cache**: Keep the data stored so it is used in future. When the data is already loaded and the user will navigate to another page that need the same data, the request is not made again.

## Backend

### Deploy

- **Instal vercel**:

```sh
npm i -g vercel
```

- **Deploy**:

```sh
cd backend && /
npm run build && \  # must build before each deployment
vercel  # vercel --prod to promote to production
```
