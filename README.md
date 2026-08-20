# Getting Started

## Create a NEW EMPTY repo on github with no README file

- Can be private or public. Doesn't matter

## Clone this repo down for local dev with the new name for the new app

```bash
git clone https://github.com/oleivahn/next-convex-clerk-template.git [[NEW_APP_NAME]]
```

## Redirect the template repo to the new repo and push

```bash
git remote set-url origin https://github.com/oleivahn/next-convex-clerk-template.git
git push
```

You should now be connected to the new repo and be able to start developing on the new project

## Install the packages

`npm i`

#### OPEN 2 TERMINALS , run the development server and convex on each:

```bash
npm run dev
npx convex dev (Log in with Github)
// connect to test-app
```

#### Your app should throw an error now because we need lo link Clerk first

## CLERK

### Get the public keys:

Go to Clerk main page:

Create a new application with your desire name. Organizations is not needed.

Grab the connection variables and add them to a `.env` or `.env.local`file in the root of your project (THIS PROJECT).

Clerk Main page -> Go to your app -> Configure -> API Keys (sidebar)-> Grab BOTH the .env.local configs

`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=`

`CLERK_SECRET_KEY=`

and paste them into your .env file on this code repo

### FINALLY, get the JWT token key from clerk and convex template

https://docs.convex.dev/auth/clerk

On clerk, go to your APP -> configure -> sessions -> JWT templates -> + Add new template
Select a convex template from the template dropdown -> and the copy the *issuer* URL you see after you select a template
Open your .env.local file and paste it there:
`CLERK_JWT_ISSUER_DOMAIN`

**Also go to convex** -> Go to your apps DB -> Settings -> Environment Variables and create the same var there too
`CLERK_JWT_ISSUER_DOMAIN`

## SETUP ROLES AND METADATA ON CLERK

At this point, you should be able to see the app running and even logging in but once inside, you cannot see the Admin or Database Tabs because you are not an admin yet.

So, we need to see the first user as an admin to get access to role base auth.

#### **IMPORTANT:** We need to setup roles and metadata to enable Role based authorization and authentication

- [ ] Clerk -> YOUR APP Dashboard -> Configure -> Sessions (Sidebar) -> Sessions ->
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

  `[ admin | moderator ]`

  **Only elevated roles are stored.** A signed-in user with no `role` in their public metadata is treated as a regular user and gets access to everything that isn't explicitly gated. You never need to set `"role": "user"`.

  **Roles are ranked, and a gate is a minimum.** `admin` outranks `moderator`, so gating something on `moderator` lets moderators *and* admins through. An admin always sees everything, and you never list more than one role.

  ```tsx
  // - Visible to moderators and admins
  <RoleGate requiredRole="moderator">
    <ReportsPanel />
  </RoleGate>
  ```

  The same applies to nav links in `components/Navbar.tsx` (`requiredRole`), server components (`await hasRole("moderator")`), and route protection in `middleware.ts`. All of them share the ranking defined in `lib/roles.ts`, which is the one place to edit if you add a role.

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
