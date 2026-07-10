# Firebase CMS Setup

This app keeps `output: "export"` and uses the browser Firebase SDK for the blog CMS.

## Console Setup

1. Enable Authentication with the Email/Password provider.
2. Create the first staff user in Authentication.
3. Copy that user's UID.
4. Enable Cloud Firestore and Cloud Storage.
5. In Firestore, create `admins/{UID}` with:

```json
{
  "email": "staff@example.com",
  "role": "admin"
}
```

6. Publish `firestore.rules` to Firestore rules.
7. Publish `storage.rules` to Storage rules.
8. Add `localhost` and the production domain in Authentication authorized domains.

## Data Paths

- Blog posts: `blogPosts/{slug}`
- Admin allowlist: `admins/{uid}`
- Blog images: `blog-images/{slug}/{fileName}`

Published posts appear on `/blog` and `/blog/post?slug=...`. Draft posts are visible only in `/admin`.
