# Demo 04 — Mobile-First Rebuild

**Setting:** A field-technician dispatch tool. Dispatchers use it on a desktop in the office. Technicians in the field have to use the same interface from a phone in their truck. The mobile experience is awful — sidebar collapses to a hamburger, the data table requires horizontal scroll, the "complete job" button is below the fold.

**Stack:** React, Tailwind v4, shadcn/ui, custom data table.

**What this demo shows:** Refusing to "make it responsive" and instead designing mobile-first.

---

## Turn 1 — User asks the wrong way

> **User:** The mobile view is broken. Make it responsive.

## Turn 2 — Claude reframes

> **Claude:** I'm going to push back on "make it responsive."
>
> Looking at `app/jobs/page.tsx`, the layout is desktop-first: sidebar nav + 12-column data table + "Complete Job" button at the bottom of a long detail page. "Responsive" would shrink that. But shrinking is the wrong move — the field tech's task is *not* the dispatcher's task.
>
> ### Two users, two layouts
>
> | Dispatcher (desktop) | Technician (mobile) |
> |---|---|
> | Sees 50 jobs at once | Sees the next 1-3 jobs |
> | Assigns and re-routes | Completes one job at a time |
> | Edits any field | Marks status, adds photos, adds notes |
> | Wants density | Wants speed and clarity |
>
> Trying to satisfy both with one layout is why mobile is broken.
>
> ### Three directions
>
> ### Direction 1 — Mobile-first single layout (Risky)
> - Rebuild the page mobile-first. Desktop becomes a wider mobile.
> - Pros: One layout, simpler.
> - Cons: Dispatchers will hate it. They lose density. Don't do this.
>
> ### Direction 2 — Two layouts behind a viewport switch (Recommended)
> - Detect viewport. Desktop gets the dispatch layout (sidebar + table). Mobile gets the technician layout (today's jobs as cards, big "Complete" button, swipe-to-update).
> - Pros: Each user gets the right tool.
> - Cons: Two layouts to maintain. Some logic is shared (the underlying data, validation).
>
> ### Direction 3 — Two routes for two roles (Highest ceiling)
> - `/dispatch` for dispatchers, `/jobs` for technicians. Sign-in role determines default route.
> - Pros: Each layout is unconstrained. Different navigation, different actions, different empty states.
> - Cons: 2x routes, 2x components, requires role-based redirect on sign-in.
>
> ### Recommendation
>
> Direction 2 first. Direction 3 is the answer in 6 months when the layouts diverge enough that maintaining a viewport switch hurts. For now, viewport switch is faster to ship and iterate on.
>
> ### One question
>
> Are technicians signing in to the same auth? If yes, we can detect role and ship direction 3 cheaply. If they share accounts with dispatchers, direction 2 is forced.

## Turn 3 — User picks

> **User:** Same auth, different role. Let's do direction 2 now and revisit direction 3 if it pays off. Plan it.

## Turn 4 — Claude plans the mobile-first layout

> **Claude:**
>
> ### The technician layout
>
> Designed mobile-first.
>
> **Top of screen:**
> - Page title: "Today's Jobs"
> - Day selector (yesterday / today / tomorrow) as a small segmented control
> - Job count badge ("3 remaining")
>
> **Middle (the work):**
> - List of jobs as cards, ordered by scheduled time
> - Each card shows: time, address, customer name, status badge
> - Tap a card → full-screen detail view with: address with directions link, customer details, job description, photo upload, notes, "Complete Job" sticky bottom button
> - Swipe right on a job card → mark complete (with undo toast)
> - Pull-to-refresh
>
> **Bottom:**
> - Bottom navigation: Today / Week / Profile
>
> **No sidebar. No data table. No filters drawer (technicians don't filter — they do today's work).**
>
> ### The detail view (mobile)
>
> The full-screen detail view has three priorities:
>
> 1. The "Complete Job" button is **always visible** as a sticky bottom bar.
> 2. Photos and notes are **inline expandable**, not behind a separate page.
> 3. The directions link **opens the native maps app**, not a web embed.
>
> ### Touch target sizing
>
> - All interactive elements ≥ 44x44.
> - Status badge is **read-only on the card**, but tap-to-change in detail view.
> - "Complete" button is the largest control on the screen.
>
> ### What the desktop dispatcher keeps
>
> Unchanged. Sidebar + data table + filter bar continue to work. The viewport switch happens at 768px.
>
> ### Files
>
> **New:**
> - `components/jobs/mobile/JobsList.tsx`
> - `components/jobs/mobile/JobCard.tsx`
> - `components/jobs/mobile/JobDetail.tsx` (full-screen detail)
> - `components/jobs/mobile/CompleteJobBar.tsx` (sticky bottom)
> - `components/jobs/mobile/BottomNav.tsx`
> - `components/jobs/mobile/DaySelector.tsx`
> - `hooks/useViewport.ts` (decides desktop vs. mobile)
>
> **Modified:**
> - `app/jobs/page.tsx` — switches layouts on `useViewport()`
>
> **Reused:**
> - `components/ui/badge.tsx` for status
> - `components/ui/button.tsx` for actions (with new `size="lg"` for mobile)
> - `components/ui/sheet.tsx` for filter drawer (kept on desktop only)
>
> ### Verification
>
> - typecheck + lint
> - Test viewport: 375px (iPhone), 414px (iPhone Plus), 768px (boundary), 1024px (desktop)
> - Touch targets: every interactive element ≥ 44x44 on mobile
> - "Complete" button always visible (no scrolling required)
> - Maps link opens native maps app (`maps://` on iOS, `geo:` intent on Android)
> - Pull-to-refresh works
> - Swipe-to-complete with undo toast (5s window)
> - Keyboard nav still works on desktop layout
> - Screen reader on mobile: status badges announced, swipe action announced as button alternative ("Complete" button always available)
>
> ### One question
>
> Should swipe-to-complete also work on desktop, or is that mobile-only? My instinct: desktop dispatchers don't need it (they have direct row actions); only ship swipe on mobile.

## Turn 5 — User confirms

> **User:** Swipe is mobile-only. Build it.

## Turn 6 — Claude implements

> **Claude:** Implementing in 5 commits.
>
> Commit 1: `useViewport` hook + `app/jobs/page.tsx` switch.
> Commit 2: Mobile `JobsList` + `JobCard` + `DaySelector`.
> Commit 3: Mobile `JobDetail` full-screen with sticky `CompleteJobBar`.
> Commit 4: Swipe-to-complete with undo toast.
> Commit 5: `BottomNav` + pull-to-refresh.
>
> Verifying:
>
> - typecheck: ✅
> - lint: ✅
> - 375px / 414px / 768px / 1024px: layout switches correctly at 768px ✅
> - Touch targets: minimum 44x44 verified across mobile components ✅
> - "Complete Job" button always above the fold (sticky) ✅
> - Maps link uses `maps://` schema, falls back to Google Maps URL on Android ✅
> - Pull-to-refresh: 200ms delay before triggering, calls existing query ✅
> - Swipe-to-complete: 80% threshold + animation, undo toast for 5s ✅
> - Screen reader: swipe is announced as alternative to a button. The "Complete" button in the card detail is always accessible. ✅
> - Desktop layout untouched: regression-tested by visiting `/jobs` at 1280px ✅
>
> One thing I left for you:
>
> The mobile layout assumes the user's role. If a dispatcher logs in on a phone, they get the technician layout. That's probably wrong — dispatchers on phones probably want a slightly-trimmed dispatcher layout. I left a `// TODO` in `useViewport` that flags this and recommends adding a "role-aware" fallback in a follow-up.

---

## What this demo illustrates

- **"Make it responsive" was the wrong frame.** Two user roles needed two layouts.
- **Mobile-first means designing the mobile workflow from scratch.** Not shrinking. Not stacking. Designing for the actual mobile task.
- **Two layouts, one shared backend.** Viewport switch keeps maintenance reasonable while letting each layout breathe.
- **Native platform integration.** Maps link uses platform schemes. That's a small detail with huge UX impact.
- **Honest residual.** The "dispatcher on phone" gap was flagged, not hidden.
