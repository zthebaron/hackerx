# Demo 02 — Redesigning a Settings Page That Got Out of Hand

**Setting:** A 2-year-old SaaS product. The settings page started as 6 fields. It now has 47 fields across 9 features, all on one screen. New users abandon onboarding.

**Stack:** React, Tailwind v3 (planning to upgrade to v4), shadcn/ui partially adopted, react-hook-form.

**What this demo shows:** Using progressive disclosure (Prompt 04) on a real, dense, painful page.

---

## Turn 1 — User opens with the focused prompt

> **User:**
>
> ```
> I want this settings page to feel simpler, but I do not want to remove
> functionality. Inspect app/settings/page.tsx. Find sections that should
> become accordion, collapsible panel, tabs, popover, drawer, or advanced
> settings area. Explain which pattern fits each section and why. Then
> implement the best version using accessible components.
> ```

## Turn 2 — Claude inspects and diagnoses

> **Claude:**
>
> I read `app/settings/page.tsx` (487 lines, 47 form fields). Here's what's there:
>
> 1. **Profile** (5 fields) — name, email, avatar, timezone, language.
> 2. **Notifications** (8 fields) — 4 channels × email/push.
> 3. **Billing** (6 fields + a payment method block) — plan, billing email, invoices, etc.
> 4. **Team** (a list, not fields).
> 5. **Integrations** (a list of toggles for 6 services).
> 6. **API keys** (a table of keys + create button).
> 7. **Webhooks** (a table + advanced retry settings).
> 8. **Compliance** (4 fields — data retention, export, etc.).
> 9. **Danger zone** (delete workspace, transfer ownership).
>
> ### The diagnosis
>
> This is 9 *unrelated* sections rendered in one scroll. The user has to scroll past Notifications to get to Billing. The page has no spatial logic.
>
> ## Pattern recommendations
>
> | Section | Pattern | Why |
> |---|---|---|
> | Top-level grouping | **Tabs** (left-side vertical tabs) | 9 sections is too many for an accordion. Tabs let the user jump directly. Vertical tabs scale better than horizontal at this count. |
> | Profile | Inline (always visible) on the Profile tab | Short, frequently edited |
> | Notifications | Inline on its tab + collapsible panel for "Advanced" (per-channel quiet hours) | Most users only set basic preferences |
> | Billing | Inline on its tab; payment method in a **drawer** triggered by "Update payment" | Payment is sensitive, deserves focus |
> | Team | Inline (master-detail: list + drawer for invite/role edit) | Standard team management pattern |
> | Integrations | Inline list of cards; each card opens a **dialog** for connection details | Each integration has 3-8 fields that don't fit inline |
> | API keys | Inline table + **dialog** for "Create key" (which shows the secret once) | Security pattern — show secret once |
> | Webhooks | Inline table + **drawer** with advanced retry settings (an **accordion** inside the drawer) | Retry settings are advanced |
> | Compliance | Inline + **popover** with explainers for each field (legal jargon) | Users need help understanding each option |
> | Danger zone | Bottom of every relevant tab, with a **confirmation dialog** before destructive actions | Standard danger pattern |
>
> ### The structure change
>
> Before: 9 sections × ~5 fields = 47 fields visible immediately. Page scrolls past everything.
>
> After: Vertical tabs surface ~5 fields at a time. The user picks the section they care about. Advanced fields collapse. Sensitive flows (payment, integrations, key creation) move to focused drawers/dialogs.
>
> ### Implementation plan (4 commits)
>
> 1. Refactor `settings/page.tsx` into a layout with vertical tabs (`Tabs` from shadcn/ui).
> 2. Move each section into its own component: `ProfileTab.tsx`, `NotificationsTab.tsx`, etc.
> 3. Add the focused flows: `PaymentMethodDrawer`, `IntegrationDialog`, `CreateKeyDialog`, `WebhookDrawer` with internal accordion.
> 4. Add confirmation dialogs to all destructive actions in danger zones.
>
> ### Verification after implementation
>
> - typecheck + lint pass.
> - Keyboard navigation: Tab cycles tab labels, arrow keys move between tabs (Radix tab default).
> - Esc closes drawers/dialogs, focus returns to the trigger.
> - Tab labels are real headings (`<h2>` inside `<TabsContent>`).
> - Mobile: vertical tabs become a top-level select on screens <768px.
> - Skeleton loaders match the new layout.

## Turn 3 — User confirms

> **User:** Do it.

## Turn 4 — Claude implements (with pushback moment)

> **Claude:** Implementing in 4 commits.
>
> Commit 1 done. Tabs scaffolded; Profile tab content moved.
> Commit 2 done. Notifications, Billing, Team, Integrations, API keys, Webhooks, Compliance, Danger zone tabs moved.
> Commit 3 done. PaymentMethodDrawer, IntegrationDialog, CreateKeyDialog, WebhookDrawer all built using existing shadcn `Sheet` and `Dialog` primitives. The retry settings inside WebhookDrawer use shadcn's `Accordion`.
> Commit 4 done. Confirmation dialogs added to: delete account (Profile), cancel subscription (Billing), remove team member (Team), revoke API key (API keys), delete webhook (Webhooks), delete workspace (Danger zone).
>
> Verifying:
>
> - typecheck: ✅
> - lint: ✅
> - Mobile (<768px): tabs collapse to a Select. Verified at 375px ✅
> - Keyboard: Tab → label list, ArrowDown moves through tabs (Radix default) ✅
> - Drawers trap focus and Esc-close (Radix default) ✅
> - Skeleton loaders match layout ✅
> - **One issue I caught:** the original "Save" button was at the bottom of the page and only saved fields the user had touched. With per-tab UI, "Save" needs to be per-tab. I added a sticky save bar inside each tab. The save logic now scopes to that tab's fields. Touched-tracking still works.
>
> Ready for human review. Suggested next pass: write Storybook stories for each tab covering empty / loading / error / "user has unsaved changes" states.

---

## What this demo illustrates

- **Disclosure isn't a single pattern.** The right answer was 5 different patterns layered: tabs at the top, inline + collapsible panels within, drawers for focused flows, dialogs for destructive actions, popovers for explainers.
- **Behavior changes deserve documentation.** Claude caught the "save scope" issue and adjusted *with* the user, not silently.
- **Reuse paid off.** Tabs, Sheet, Dialog, Accordion, Confirmation — all from shadcn/ui. Zero new primitives.
- **Mobile got a real answer.** Vertical tabs → Select pattern is a deliberate choice, not "responsive shrink."
