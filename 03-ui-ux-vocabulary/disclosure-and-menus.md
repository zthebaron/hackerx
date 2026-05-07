# Disclosure and Menus

How you hide complexity without removing functionality.

The single most common dashboard mistake: showing every field, every action, every option, all at once. The fix is *progressive disclosure* — pick the right pattern for each situation.

## Accordion

Stacked headings that expand to reveal content.

- **Use when:** Multiple sections of related content, only some of which the user needs at once. Settings pages, FAQs, advanced options.
- **Don't use when:** Sections are short and always relevant — just show them.
- **Accessibility:** Headings should be real `<h2>`/`<h3>` with `aria-expanded` and `aria-controls`. Per WAI-ARIA APG.
- **Prompt:** "Use an accordion to group advanced settings. Allow multiple sections open at once. Persist the open state."

## Collapsible panel

A single section that can show/hide. Like an accordion of one.

- **Use when:** One section needs to be hidden by default.
- **Use case:** A filter sidebar that collapses; a "what's new" panel that the user can dismiss.
- **Prompt:** "Make this filter area collapsible with a clear toggle. Default to expanded on desktop, collapsed on mobile."

## Dropdown menu

A button that opens a list of actions or options.

- **Use when:** Multiple actions on a single trigger ("More" menus, row actions, account menus).
- **Don't use when:** Only one or two actions — show them inline.
- **Don't use when:** The actions are mutually exclusive view modes — use a segmented control or tabs.
- **Variants:** With submenus, with grouped sections, with checkboxes/radios for state.
- **Prompt:** "Add a dropdown menu for row actions: Edit, Duplicate, Archive, Delete. Use a destructive style for Delete and require confirmation."

## Context menu

A right-click menu, item-specific.

- **Use when:** Power-user app, table rows, kanban cards. Desktop-class workflows.
- **Don't use when:** Touch-first or mobile-first app.
- **Important:** Don't make context menu the *only* way to access an action — duplicate it as a row action button or keyboard shortcut.
- **Prompt:** "Add a context menu for table rows with Edit, Duplicate, Archive. Mirror the same actions as the row's dropdown menu."

## Popover

A small temporary panel anchored to a trigger.

- **Use when:** A small piece of contextual content or a focused mini-form.
- **Use cases:** Quick filter, color picker, profile preview, micro-form.
- **Don't use when:** Content is long enough to feel like a page — use a drawer.
- **Prompt:** "Use a popover for the quick filter. Anchor to the filter button. Close on outside click and on Esc."

## Tooltip

A tiny text label that appears on hover or focus.

- **Use when:** A control's purpose isn't obvious from its label or icon.
- **Don't use when:** The information is essential — make it visible by default.
- **Don't use when:** The user is on touch — tooltips don't trigger reliably.
- **Accessibility:** Use `aria-describedby`, not `title`. Show on focus as well as hover.
- **Prompt:** "Add tooltips for icon-only buttons. Show on hover and on focus. Use aria-describedby."

## Hover card

A larger preview that appears on hover, showing rich content.

- **Use when:** Previewing user info, link destinations, or items without forcing navigation.
- **Use cases:** GitHub-style user previews, link previews, item previews in lists.
- **Don't use when:** Touch-first.
- **Prompt:** "Show a hover card with user details when hovering over a username link."

---

## The pattern decision tree

Asking yourself:

- "Is this a button trigger with multiple actions?" → **dropdown menu**
- "Is this groups of content the user might or might not want?" → **accordion**
- "Is this one panel that should hide by default?" → **collapsible panel**
- "Is this a small contextual mini-form?" → **popover**
- "Is this a label for an unclear control?" → **tooltip**
- "Is this a rich preview without navigation?" → **hover card**
- "Is this right-click on an item?" → **context menu**
- "Is this a temporary side panel for details?" → **drawer / sheet** (see [navigation-patterns.md](navigation-patterns.md))
