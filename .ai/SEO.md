---
document: SEO
version: 1.0.0
framework: AI Development Framework
language: en
status: stable
scope: frontend-public-sites
audience:
  - AI Coding Agents
  - Developers
  - Content Owners
dependsOn:
  - .ai/PROJECT-SPEC.md
  - .ai/ARCHITECTURE.md
produces:
  - SEO Requirements
  - Metadata Rules
  - Structured Data Checklist
---

# SEO.md

## 1. Purpose

This document defines SEO requirements for public projects built with the **AI Development Framework (ADF)**.

The goal is for the site to be indexable, understandable by search engines, shareable on social platforms, and technically correct from the first deployment.

## 2. General rules

The agent must implement:

- Complete metadata.
- Clear title and description.
- Canonical URL.
- Open Graph.
- Twitter Card.
- Indexable robots settings.
- Sitemap when applicable.
- Structured JSON-LD.
- Semantic HTML.
- Correct heading hierarchy.
- Useful alternative text.
- Safe external links.

## 3. Minimum metadata

Every public site must define:

- `title`
- `description`
- `keywords` when useful and not spammy.
- `author`
- `canonical`
- `robots`
- Open Graph metadata.
- Twitter Card metadata.
- Main language.
- Language alternatives when present.

## 4. Astro

For Astro, the agent must implement metadata in the layout or in a dedicated component.

It must create a clear strategy for:

- Base title.
- Per-page title if multiple pages exist.
- Per-page description.
- Open Graph image.
- Canonical URL.
- Dynamic `html lang` when i18n exists.

## 5. JSON-LD

The agent must implement JSON-LD when applicable.

For a personal portfolio, use:

- `Person`
- `WebSite`
- `ItemList` for projects.
- `CreativeWork` or `SoftwareApplication` for projects when appropriate.

It must include `sameAs` for:

- LinkedIn.
- GitHub.
- X/Twitter.
- Personal website.

Do not invent final URLs. Use placeholders when values are unknown.

## 6. Open Graph image

There must be a documented path for the OG image.

Recommended:

```txt
public/og-image.png
```

Recommended size:

```txt
1200x630
```

The file can be a placeholder at first, but it must be referenced consistently.

## 7. Sitemap and robots

For public sites, the agent must create or configure:

```txt
sitemap.xml
robots.txt
```

The site must allow indexing unless `PROJECT-SPEC.md` says otherwise.

Default rule:

```txt
index: true
follow: true
```

## 8. i18n and SEO

If the project supports more than one language:

- The `<html lang>` attribute must reflect the active language.
- Metadata should be translated when possible.
- Alternates/hreflang should be configured if the project uses separate language URLs.
- If language changes only through client state, document the SEO limitation and consider language routes in a future phase.

## 9. Content

The agent must avoid:

- Lorem ipsum.
- Generic low-value copy.
- Ambiguous titles.
- Duplicated descriptions.
- Keyword stuffing.
- Hidden content only for search engines.

Content must be clear for humans first and useful for search engines second.

## 10. SEO checklist

- [ ] Clear title exists.
- [ ] Clear description exists.
- [ ] Canonical exists.
- [ ] Open Graph metadata exists.
- [ ] Twitter Card metadata exists.
- [ ] Valid JSON-LD exists.
- [ ] `robots.txt` or equivalent configuration exists.
- [ ] `sitemap.xml` or equivalent configuration exists.
- [ ] There is one single `h1` per page.
- [ ] Heading hierarchy is correct.
- [ ] Images have useful `alt` text.
- [ ] External links are safe.
- [ ] There is no unnecessary duplicated content.
- [ ] No final URLs were invented.
