# Architecture & Technical Decisions

This document records the reasoning behind key technical choices in this
project, including a few decisions that changed along the way. Kept here
rather than scattered across commit messages so the "why" is easy to find.

## Frontend state management: Redux
Chosen for predictable, centralized state across authentication, player
(collection item) data, and menu categories. Several interdependent
pieces of shared state are read and updated from multiple, unrelated
component trees, which Redux handles more predictably than prop drilling
or scattered local state.

## UI library: Tailwind CSS, with some remaining Material UI
The project originally used Material UI throughout. Tailwind was
introduced later for new components, but a full migration away from MUI
was never completed and therefore both are used in parallel today. Finishing the
migration would touch a large number of files for no functional gain,
so it's deliberately deprioritized in favor of feature and security work.
Noted here as a tracked decision, not an oversight.

## Database: MongoDB with Mongoose
A document-based structure fits the variable, nested shape of collection
items (categories, sub-categories, multiple images per item) more
naturally than a fixed relational schema.

## Authentication: JWT, no public sign-up
The app is intended for a single collection owner, not open
registration. A public `/signup` endpoint originally existed and was
removed; admin accounts are now created exclusively via a terminal seed
script (`server/scripts/createAdmin.js`), which is not exposed over
HTTP at all.

## Category structure: main + sub, sub as a specific year
Sub-categories are stored as specific years (e.g. `"2023"`), not decade
strings (e.g. `"2020s"`). The category listing/search query groups
items into decades by computing a numeric range (`$gte`/`$lte`) from a
year extracted out of the request. This only works correctly against
individual year values, not decade-labelled strings. This is a known,
somewhat awkward constraint of the current search implementation rather
than an intentional design goal, and is a candidate for revisiting if
the category model is reworked.

## Image storage: Cloudinary (previously local disk, originally AWS S3)
Three iterations here:
1. **AWS S3** — the original implementation, removed along with the
   `aws-sdk` and `multer-s3` dependencies during a security/dependency
   cleanup (S3 was not in active use and pulled in a large, partly
   vulnerable dependency tree).
2. **Local disk storage** — a simpler replacement for development, using
   `multer` (in-memory) + `Jimp` (compression) + `fs` (writing to a local
   `uploads/` folder served statically by Express).
3. **Cloudinary** — local disk storage works locally but silently fails
   in production: Render's free tier has an ephemeral filesystem, so
   uploaded files are deleted on every restart, redeploy, or spin-down.
   Cloudinary provides persistent storage with a free tier suited to a
   portfolio-scale project. `Player.images` now stores `{ url, publicId }`
   objects instead of plain URL strings, so deletion can target the exact
   asset instead of trying to parse it back out of a URL.

## Dependency upgrades: Mongoose v6 → v9, Jimp v0.22 → v1.6
Upgraded to resolve a critical NoSQL injection / prototype pollution
vulnerability in Mongoose (and a moderate one in Jimp's `file-type`
dependency). Required rewriting several deprecated patterns along the
way: callback-style `findOneAndUpdate`, `findByIdAndRemove`, legacy
connection options (`useNewUrlParser`, `useUnifiedTopology`,
`useCreateIndex`, `useFindAndModify`), and Jimp's changed API for
reading, resizing, and encoding images.

## Repository structure: monorepo with sparse-checkout
`client` and `server` live in a single repository, cloned locally with
`git sparse-checkout` limited to those two directories (plus `docs` for
README assets). This keeps the working copy focused without splitting
frontend and backend into separate repositories.

## Deployment: Render (backend) + Netlify (frontend)
Split deployment using two free tiers rather than a single combined
host. CORS is locked to the deployed frontend URL via an environment
variable (`CLIENT_URL`) rather than left open to any origin.

## Network access (MongoDB Atlas): Render's outbound IP ranges, not 0.0.0.0/0
Render's free tier doesn't offer a static outbound IP, so allowing
"anywhere" is a common approach for cloud deployments — but Render
publishes the specific outbound ranges its services use, which were
allow-listed instead of opening access to the entire internet. Slightly
more restrictive than the common default, at no extra cost.

## Internationalization: i18next
The original project was built for a Norwegian audience; i18next was
kept (rather than removed) so the app supports both English and
Norwegian, since the generic "collection showcase" concept isn't
tied to one country or language.