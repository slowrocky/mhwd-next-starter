# MHWD Next Starter setup

Use this checklist when creating a new client project from the template.

## 1. Create the repositories

1. Create a new frontend repository from this repository template.
2. Create a sibling Studio repository from `mhwd-next-starter-studio`.
3. Keep the frontend and Studio folders next to each other while working locally.
4. Do not reuse the starter repository's client content for a real project.

## 2. Create the Sanity project

1. Create a separate Sanity project for the client.
2. Set the project's dataset, normally `production`.
3. Replace the project ID and dataset in the copied Studio's `sanity.cli.ts` and
   `sanity.config.ts`.
4. Set the frontend `NEXT_PUBLIC_SANITY_PROJECT_ID` and
   `NEXT_PUBLIC_SANITY_DATASET` values.
5. Run Studio TypeGen and publish the Site Settings singleton.

## 3. Configure the site

1. Set the real public URL in Site Settings.
2. Fill in the site name, contact details, navigation and social links.
3. Add the client's services, products and references.
4. Replace starter copy and remove any demo documents.
5. Check image crops and alt text in Studio.

## 4. Configure email

1. Verify the client's sending domain in Resend.
2. Set `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` in the hosting provider.
3. Set the Site Settings contact e-mail as the recipient.
4. Submit the form from a preview deployment and verify delivery and reply-to.

## 5. Deploy

1. Import the frontend repository into Vercel.
2. Add the environment variables to Preview and Production separately.
3. Deploy a preview and complete the QA checklist.
4. Connect the client's domain and deploy production.
5. Deploy the Studio with `sanity deploy`, or self-host it and register its URL
   with Sanity.

## 6. Handoff

Record the repository URLs, Sanity project, Studio URL, domain provider,
hosting project and editor accounts in the client's handoff document. Never put
API keys or passwords in this repository.
