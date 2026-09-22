# obsidian-birthdays

Displays birthdays from your People notes on daily, weekly, and monthly notes as a card block
with a table.

## Block syntax

````markdown
```birthdays
period:    day          # "day", "week", or "month" (required)
date:      2026-09-22   # YYYY-MM-DD or "today"; falls back to frontmatter then filename
title:     Birthdays    # overrides the settings default
living:    true         # show only living people; overrides the settings default
showtitle: false        # hide the title bar for this block
```
````

Minimal usage:

````markdown
```birthdays
period: day
```
````

## Settings

| Setting | Default | Description |
| --- | --- | --- |
| Show title | on | Show the title bar by default |
| Default title | `Birthdays` | Title bar text |
| Show living only | off | Hide deceased people by default |
| People folder | `People` | Vault-relative folder to scan for person notes |

## Date resolution

The anchor date (which day/week/month to show) is resolved in this order:

1. `date` block config (`YYYY-MM-DD`, `YYYY-Www`, `YYYY-MM`, or `"today"`)
2. `date` frontmatter of the context note
3. Filename parsed as `YYYY-MM-DD`, `YYYY-Www`, or `YYYY-MM`
4. Error card

## People note frontmatter

Each person note must have `type: person` and a `born` date.

| Field | Format | Description |
| --- | --- | --- |
| `type` | `person` | Required -- identifies the note as a person |
| `born` | `YYYY-MM-DD` | Required -- date of birth |
| `died` | `YYYY-MM-DD` | Optional -- date of death; unparseable values shown as `?` |
| `name` | string | Display name in the table (falls back to note filename) |

People born more than 130 years ago with no death date are excluded when `living: true`.

## Table columns

| Column | Description |
| --- | --- |
| Name | Internal link to the person note |
| Born | `YYYY-MM-DD` |
| Died | `YYYY-MM-DD`, empty if alive, `?` if unknown. Omitted when `living: true` |
| Age | Current age, or `(N)` if deceased. `?` if death date unknown or age > 130 |

## Deploy

```sh
ln -s ~/obsidian/.obsidian/plugins/obsidian-birthdays dist
npm run build
```
