# Getting Started

## Create a NEW EMPTY repo on github with no README file

- Can be private or public. Doesn't matter

## Clone this repo down for local dev with the new name for the new app

git clone https://github.com/oleivahn/next-convex-clerk-template.git [[NEW_APP_NAME]]

## Redirect the template repo to the new repo and push

`git remote set-url origin https://github.com/oleivahn/covey.git`

`git push`

You should now be connected to the new repo and be able to start developing on the new project

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

### FINALLY, get the JWT token key from clerk and convex template

https://docs.convex.dev/auth/clerk

On clerk, go to the app -> configure -> sessions -> JWT templates -> + Add new template
Select a convex template -> and the copy the issuer URL you see after you select a template
Open your .env.local file and paste it there:
`CLERK_JWT_ISSUER_DOMAIN`

**Also go to convex** -> Go to your apps DB -> Settings -> Environment Variables and create the same var there too

### Setup roles and metadata on CLERK

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

I only linked the GitHub repo to Vercel and that seemed to deploy just fine.
Copy the `.env` configs though.

Just in case, I saw this on documentation somewhere in case there are issues.
`npx convex deploy --cmd 'npm run build'`
