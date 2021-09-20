This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.



# Assignment

## Requirements

- Use GitHub API
- Use Next.js
- Use the design: https://www.sketch.com/s/058bf195-0462-428b-8af1-4a2936a1a2cf

## User stories:

- As a user:
  - I want to select a Github repository  
  - I want to see a single chart showing both the number of collaborators and open issues over time about the selected repository.
  - I want to be able to refresh the page without losing context (I should still see the same content)
  
  
## Nice to have

- Add more repository metrics being able to switch the selected ones
- Add animations
- Use React suspense or [SSR or SSG](https://nextjs.org/docs/basic-features/typescript#static-generation-and-server-side-rendering)
- Proxify calls to GitHub API
- Cache similar requests

## Questions

### Requirements

- Why asking me to work with Next.js knowing that I never did before?
- Why so few requirements regarding pure frontend work:
  - no mention of responsive behaviour
  - display a graph 
- Why no advice on github API endpoints