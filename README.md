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

### Get the public keys:

Create a new application with your desire name.

Grab the connection variables and add them to a `.env` or `.env.local`file in the root of your project.

Clerk -> App Dashboard -> Configure -> API Keys (sidebar)-> Grab the .env.local configs

`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=`

`CLERK_SECRET_KEY=`

### Setup roles and metadata

#### **IMPORTANT:** We need to setup roles and metadata to enable Role based authorization and authentication

- [ ] Clerk -> App Dashboard -> Configure -> Sessions (Sidebar) -> Sessions ->
      Customize session token -> And add the following on the claims box:

  ```
  {
    "metadata": "{{user.public_metadata}}"
  }
  ```

- [ ] Add roles per user basis
      Clerk -> App Dashboard -> User -> Click on a User
      Scroll down to the **Metadata Section** and edit the **Public** input field and add the following:

  ```
  {
      "role": "admin"
  }
  ```

  `[ admin | moderator | user]`

#### Then configure each route here on the app per needs

#### Theme colors templates

https://tweakcn.com/editor/theme

#### Development

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

#### Deploy to Vercel
