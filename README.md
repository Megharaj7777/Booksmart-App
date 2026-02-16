This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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

THE PROBLEMS I HAVE FACED :-

-While installing tailwind css for this project there was newer version that is v4 defaultly when i install next which i was not aware of and then i was finding difficulties while working on it, faced a problem for styling then i asked an ai agent to resolve my issue or help me with this issue later following with the steps given by the ai agent finally i can resolve my issue or a problem, just uninstalled the newer version that is v4 and installed the older version that is v 3.4.

-While using OAuth of the google into this project i was surprised when i got to know that for authentication without using any custome emailid or password we can just integrate the google OAuth alone. So i was new for this and decided to take the help with an ai agent then after following the steps given by it i can implement the google OAuth to this project, just enabled the google authentication and in google cloud console created the client id and added redirect callback url of the supabase in it and copied the client urls to the supabase. And also now i took a glance about these features of supabase and google cloud console.

-Then found a little bit errors while implementing the bookmark dashboard which was challenging that is the replication or realtime which is the feature specified in task (if there is 2 tabs duplicated of 1 tab, in which if i add any new bookmark it should be updated in another tab without refreshing the page) which i thought there will be so much coding but actually there was a feature in a supabase we have to just enable it that was in the database -> table, so i have enabled realtime and adjusted the code to use that feature and now the problem got fixed and also its working.