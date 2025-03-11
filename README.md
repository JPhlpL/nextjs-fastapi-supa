## Current Stack That Used:

- NextJS (v14) - FrontEnd
  - Drizzle (ORM)
  - Shadcn (UI Component)
  - lucide-react (Icons)
  - Tailwind CSS (CSS)
  - App Router (Page Pattern)
  - Typescript (Types)
  - Vercel (Hosting)
  - eslint (Linting)
- FastAPI - BackEnd
  - Modal (Container)
  - SQLAlchemy (For ORM)
  - mypy (Linting)
  - Pattern (router->service->repository)
  - Logfire (For Logging)
  - Pydantic (Data Models)
- Supabase - Database
  - PostgreSQL
  - Session Tokens
  - Login/Signup OAuth
    - Github
    - Google
    - Azure/Microsoft
    - Linkedin
    - Facebook
    - Twitter

## Front-End ( ReactJS / NextJS):

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install all packages:

```bash
npm i
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Generate JWT Secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

## Vercel Deployment
COMING SOON...

## Backend (Python / FastAPI):

Tutorial:
`
https://www.youtube.com/watch?v=f3CyAmelnEY&list=PLqAmigZvYxIL9dnYeZEhMoHcoP4zop8-p&index=3
`

For Installation of libraries:
`
pip install -r requirements.txt
`

To export libraries
`
pip freeze > requirements.txt
`

## MODAL CONTAINER (modal.com)

FIRST SETUP:
- make sure installed modal on python
- run python -m modal setup

CONTAINER INTIALIZATION:
- Go to Workspace Settings
- Go to API Tokens
- Create New Token
- modal token set --token-id <token_id> --token-secret <token_secret> --profile=<workspace_name>
- modal profile activate <workspace_name>

## TO SERVE IN MODAL CONTAINER (For local testing purposes)
`
modal config set-environment development
`

`
modal serve src.main
`

## TO DEPLOY ON PROD (MAIN)

`
modal config set-environment main
`

`
modal deploy src.main --tag $(GIT_HASH)  ($(GIT_HASH) or the manual value of git rev-parse HEAD)
`

## Supabase (PostgreSQL)

PS: Make sure that you have currently setup supabase project

## Walkthrough:
1. Make sure that you correctly setup the schema.ts
2. nvm use 20.12
3. npx drizzle-kit generate
4. npx drizzle-kit push
5. Go to `supabase.com`
6. Go to table editor
7. Verify if your drizzle migrates to your supabase
8. Make sure that you run also all migrations (/migrations/*.sql) to setup a trigger and function

## Authentication Setup:

## Steps on how to setup whole project:
COMING SOON...

## Some Screenshots:
![image](https://github.com/user-attachments/assets/dec75b5b-4f8a-4a16-a377-88679a655922)