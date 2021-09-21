This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


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

# Presentation

## App level

### Search repositories

- Display debounced search
- Show url query param update when typing inside search
- Show button behaviour inside list item
- Font-family was not respected, to keep material-ui optimal integration with Roboto
- Show loader when fetching repositories
- Show fallback and SSR refresh
- Show responsive

### Repository stats

- Show responsive
- Show button behaviour to go back
- Show graph

### Sketch / Design

- Theme colors
- Font weight
- Overall layout
- mui

## Code level

### NextJs architecture

- pages
- SSR + dynamic data fetching

### React

- dumb vs smart components
- helpers
- hooks

### API

- octokit calls
  - paginate to fetch all data

### Dataviz

- nivo

### Deps

- eslint: some lint rules for code readability
- nivo for graph rendering: can be used server-side
- octokit for Github API: simplifies calls
- lodash and ramda for built-in helpers
- nextJs and swr for SSR and dynamic data fetching
- material-ui for design, styling, base components

## Questions

### Requirements

- Did I understand correctly "I want to be able to refresh the page without losing context"?
- Why asking me to work with Next.js knowing that I never did before?
- Why so few requirements regarding pure frontend work:
  - no mention of responsive behaviour
  - display a graph
  - sketch was very simple
- Why no advice on github API endpoints
  - It took me about three times as much time to find how to fetch the data to display than implement it
  - I didn't find a simple way to request colllaborators' data


  ## Time spent

  - **~10 hours** in total

  ## Overall feeling

  - disappointment regarding the time I invested in this test: I wasted lots of time on stuff I never used before
    - Github API
    - NextJs
  - I don't feel like I had the opportunity to show my skills
