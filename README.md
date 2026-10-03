# Bikers 4 Heroes

Charity + live event website for the Illawarra motorcycle Super Heroes who raise funds for the i98FM Illawarra Convoy.

Facebook: [facebook.com/bikers4heroes](https://www.facebook.com/bikers4heroes)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Super admin

- URL: `/admin`
- Email: `admin@bikers4heroes.org`
- Password: `HeroesRide4Kids`

Change these in `.env.local`. From HQ you can edit events, photos, website copy, and incoming messages.

## Firebase

The public site and admin CMS work immediately on local storage. To sync across devices:

1. Create a Firebase project.
2. Enable Auth (email/password), Firestore, and Storage.
3. Deploy `firestore.rules` and `storage.rules`.
4. Fill in `.env.local` from `.env.local.example`.
5. Create the super admin user in Firebase Auth.
6. Sign in at `/admin` and use **Seed / reset** on the Firebase settings page.

For a production super-admin claim, set `superAdmin: true` on the Auth user (Firebase Admin SDK / Cloud Functions) so the included security rules apply.
