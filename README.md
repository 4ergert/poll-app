# Poll App

Poll App is a responsive Angular web application for creating, publishing, completing, and reviewing surveys. It provides a focused workflow for collecting feedback: create a survey, share its voting page, and view live aggregated results.

The application uses Supabase as its persistence and real-time synchronization layer. Changes made by one client are reflected in other connected clients without requiring a manual refresh.

## Features

- Create surveys with:
  - a title, category, optional end date, and optional description
  - one or more questions
  - multiple answer options per question
  - optional multiple-choice questions
- Publish surveys and receive an in-app publication confirmation.
- Browse active and past surveys.
- Filter the overview by category.
- Display up to six overview cards at once; scroll within the overview when more are available.
- Highlight surveys that are ending soon.
- Vote on active surveys.
- Keep submitted selections visible while preventing changes after submission.
- Return to the home page after completing a survey.
- Show live vote results backed by Supabase Realtime.
- Display an end date rather than a negative remaining-day count for expired surveys.
- Respect reduced-motion preferences for the hero illustration animation.

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Angular 21 |
| Language | TypeScript 5.9 |
| Styling | SCSS |
| Forms | Angular Reactive Forms |
| Backend / real-time | Supabase (`@supabase/supabase-js`) |
| Routing | Angular Router |
| Package manager | npm 11 |

## Prerequisites

- [Node.js](https://nodejs.org/) (use an active LTS release)
- npm 11 or later
- A Supabase project with a `Survey_Form` table and Realtime enabled for that table

Verify the installed tool versions:

```bash
node --version
npm --version
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/4ergert/poll-app.git
cd poll-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Supabase

The browser client is initialized in [`src/app/components/shared/services/survices.ts`](src/app/components/shared/services/survices.ts).

The client requires:

- a Supabase project URL
- a **publishable/anon** project key
- a `Survey_Form` table
- Row Level Security (RLS) policies appropriate for the application
- Realtime replication enabled for `Survey_Form`

> [!IMPORTANT]
> Never use a Supabase `service_role` key in browser code. A publishable/anon key is intended for client-side use, but it must be protected by correctly configured RLS policies.

For a production application, move the project URL and publishable key into environment-specific configuration rather than committing deployment-specific values to source control.

### 4. Start the development server

```bash
npm start
```

The Angular development server opens the application automatically. If it does not, visit:

```text
http://localhost:4200/
```

Source changes are rebuilt and reloaded automatically.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm start` | Starts the Angular development server. |
| `npm run build` | Creates an optimized production build in `dist/poll-app/`. |
| `npm run watch` | Creates a development build and watches for changes. |
| `npm test` | Runs the configured Angular test command. |
| `npm run ng -- <command>` | Runs an Angular CLI command. |

Examples:

```bash
# Production build
npm run build

# Development build in watch mode
npm run watch

# Angular CLI help
npm run ng -- help
```

## Application Workflow

### Creating and publishing a survey

1. Select **New survey** on the home page.
2. Enter a survey name and select a category.
3. Optionally set an end date and description.
4. Add one or more questions and their answers.
5. Enable multiple answers for questions where multiple selections are allowed.
6. Select **Publish**.

After Supabase confirms the insert, the form resets and a publish confirmation appears at the Publish button position.

### Completing a survey

1. Open an active survey from the overview.
2. Select answers for each question.
3. Select **Complete survey**.

The submission is persisted before the UI enters its completed state. Once saved:

- selected answers remain visible
- all answer checkboxes are disabled
- the action button changes to **Back to home**
- selecting **Back to home** returns to `/`

### Survey lifecycle

- **Active surveys** remain available through the end of their selected date.
- **Past surveys** are listed separately.
- Expired cards display `Ended on <date>` rather than a negative remaining-day value.
- The **Ending soon** section only includes active surveys.

## Architecture

```text
src/
├── main.ts                                  # Application bootstrap
├── styles.scss                              # Global stylesheet entry point
└── app/
    ├── app.config.ts                        # Angular providers and router setup
    ├── app.routes.ts                        # Home and vote routes
    └── components/
        ├── home/                            # Landing page and survey discovery
        │   ├── hero/                        # Hero copy and visual animation
        │   └── surveys/                     # Overview, filters, and ending-soon list
        ├── create-new-survey/               # Survey creation dialog and form
        ├── vote/                            # Voting page and result presentation
        └── shared/
            ├── button/                      # Reusable button components
            ├── interfaces/                  # Domain types
            ├── models/                      # Form and vote data models
            ├── pipes/                       # Display transformations
            ├── services/                    # Supabase persistence and Realtime
            └── utils/                       # Pure domain utilities
```

### Routes

| Route | Component | Purpose |
| --- | --- | --- |
| `/` | `Home` | Survey discovery and survey creation |
| `/vote/:id` | `Vote` | Vote on and review one survey |
| `**` | redirect | Redirects unknown routes to `/` |

### State and data flow

The root-provided `Survices` service owns the in-memory survey collection as an Angular signal:

1. Components load data through `getSurveys()`.
2. Survey creation and voting write changes to Supabase.
3. The service updates its local signal immediately after successful writes.
4. A Supabase Realtime channel listens to `Survey_Form` changes and keeps connected clients synchronized.
5. Components derive filtered and rendered state with Angular `computed` signals and Reactive Forms.

## Data Model

The application expects survey records conceptually equivalent to the following TypeScript shape:

```ts
interface Survey {
  id?: number;
  name: string;
  date: Date;
  category: string;
  describing: string;
  questions: Array<{
    question: string;
    multipleChoice: boolean;
    answers: string[];
  }>;
  vote?: Vote;
}
```

Votes are stored as aggregated answer selections associated with each survey. See [`src/app/components/shared/interfaces/vote.ts`](src/app/components/shared/interfaces/vote.ts) and [`src/app/components/shared/utils/vote.ts`](src/app/components/shared/utils/vote.ts) for the current representation and merge logic.

## Supabase Setup Notes

The application accesses a table named `Survey_Form` and subscribes to database changes on that table.

Before deploying, ensure the following:

1. The table has columns compatible with the `Survey` shape above.
2. The `vote` column can store the vote structure used by the application (commonly `jsonb`).
3. Realtime replication is enabled for `Survey_Form`.
4. RLS is enabled.
5. Policies explicitly permit only the reads and writes required by the application.

The client currently reads all survey data and writes survey and vote changes directly. Review this approach carefully before using it for sensitive, authenticated, or high-concurrency workloads. Server-side authorization and transactional vote updates may be preferable for production use cases.

## Development Guidelines

### Code style

- Use standalone Angular components.
- Keep component logic in `.ts`, templates in `.html`, and scoped styles in `.scss`.
- Prefer Angular signals for shared reactive state and computed views.
- Use Reactive Forms for survey and vote forms.
- Keep reusable domain logic in `shared/utils`.
- Document meaningful public TypeScript APIs with TSDoc.
- Add code comments only when they explain non-obvious behavior or decisions.

### Adding a feature

1. Identify the appropriate feature folder under `src/app/components/`.
2. Reuse a shared component, model, utility, or service when one already exists.
3. Keep Supabase access inside `Survices` rather than calling the client from templates or unrelated components.
4. Add or update TSDoc for public TypeScript APIs.
5. Run the production build before opening a pull request.

## Validation

Run the production build:

```bash
npm run build
```

The build output is written to:

```text
dist/poll-app/
```

Angular's production configuration includes size budgets. A budget warning does not stop the build, but should be assessed before deployment.

## Accessibility and UX

- Form controls use labels and validation messages.
- Publication feedback is announced with a live region.
- The hero animation disables transitions for users who prefer reduced motion.
- Completed survey inputs are disabled to prevent accidental re-submission changes while preserving the selected answers for review.

## Troubleshooting

### The app cannot connect to Supabase

- Confirm the project URL and publishable key.
- Check the browser network tab for Supabase errors.
- Verify that RLS policies allow the expected operation.
- Confirm the `Survey_Form` table name and column layout.

### Realtime updates do not appear

- Ensure Realtime is enabled for `Survey_Form` in Supabase.
- Verify that the browser can establish a WebSocket connection.
- Check browser console and network logs for policy or connection errors.

### A `__cf_bm` cookie warning appears

Supabase may emit a Cloudflare bot-management cookie warning during a Realtime WebSocket handshake. This warning is generally browser-side and does not by itself indicate that the Realtime connection failed. Verify actual behavior by checking whether records and result updates arrive as expected.

### The production build reports a budget warning

Inspect the generated bundle size and remove or lazy-load non-critical dependencies where appropriate. The warning threshold is configured in [`angular.json`](angular.json).

## Contributing

1. Create a feature branch.
2. Make focused changes that follow the existing Angular and SCSS conventions.
3. Run `npm run build`.
4. Update documentation when behavior, architecture, setup, or scripts change.
5. Open a pull request describing the problem, implementation, and validation performed.

## License

No license file is currently included. Add an explicit license before distributing or accepting external contributions under defined terms.
