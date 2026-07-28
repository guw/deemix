---
name: create-pull-request
description: >-
  Create GitHub pull requests against guw/deemix (the origin fork), never against
  bambanah/deemix upstream. Use when creating a PR, opening a pull request, or
  running gh pr create in this repository.
---

# Create pull request (guw/deemix)

## Target repository

This clone has:

| Remote     | Repo              | Role                                                                         |
| ---------- | ----------------- | ---------------------------------------------------------------------------- |
| `origin`   | `guw/deemix`      | **PR base** — always create PRs here                                         |
| `upstream` | `bambanah/deemix` | Upstream fork source — **never** the PR base unless the user explicitly asks |

Do **not** open PRs against `bambanah/deemix`. `gh` may default there because `upstream` can have `gh-resolved = base`. Override that every time.

## Required `gh pr create` flags

Always pass the fork repo explicitly:

```bash
gh pr create --repo guw/deemix --base main --head <branch> --title "..." --body "$(cat <<'EOF'
...
EOF
)"
```

Rules:

1. `--repo guw/deemix` is mandatory.
2. `--base` must be a branch on `guw/deemix` (usually `main`).
3. Push the feature branch to `origin` (`guw/deemix`), not `upstream`.
4. After create, confirm the PR URL is `https://github.com/guw/deemix/pull/...`.
5. If the URL is under `bambanah/deemix`, close that PR and recreate with `--repo guw/deemix`.

## Push

```bash
git push -u origin HEAD
```

Never `git push upstream` for PR branches.

## Verify before finishing

```bash
gh pr view --repo guw/deemix --json url,baseRepository,headRepository
```

`baseRepository` must be `guw/deemix`.
