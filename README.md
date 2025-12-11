# Getting Started

## Install the packages

`npm i`

#### First, run the development server and convex on different terminals:

```bash
npm run dev
npx convex dev (Log in with Github)
// connect to test-app
```

## Convex

Convex connects thu a direct link on .env.local

Run the dashboard
`npx convex dashboard`

## Clerk

#### From Clerk Dashboard we ONLY need the following variables:

Create a new application with your desire name
Make sure to grab the connection variables from Clerk and add them to a `.env` file in the root of your project.

Clerk -> App Dashboard -> Configure -> API Keys -> Grab the .env.local configs

`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=`

`CLERK_SECRET_KEY=`

### Extra configs on Clerk

#### We need to setup roles and metadata

- [ ] Must also go into Clerk -> App Dashboard -> Configure -> Sessions (Sidebar) -> Sessions
      Customize session token -> And add the following on the claims box:

  ```
  {
    "metadata": "{{user.public_metadata}}"
  }
  ```

- [ ] Then each user that needs special privileges (roles) need to be added on a per user basis
      Clerk -> App Dashboard -> User -> Click on a User
      Scroll down to the **Metadata Section** and add the following on the **Public** input field (edit):

  ```
  {
      "role": "admin"
  }
  ```

#### Then configure each route here on the app per needs

#### Theme colors templates

https://tweakcn.com/editor/theme

#### Convex

npx convex dev
Log in with Github

#### Development

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

#### Deploy on Vercel
