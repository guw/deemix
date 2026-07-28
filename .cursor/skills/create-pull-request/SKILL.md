---
name: create-pull-request
description: >-
  Create GitHub pull requests against guw/deemix on base branch main-guw, never
  against bambanah/deemix upstream or origin/main. Forbids direct commits to any
  main* branch and Cursor attribution trailers. Use when creating a PR, opening a
  pull request, committing, or running gh pr create / git commit in this repository.
---

# Create pull request (guw/deemix)

## Target repository and base branch

This clone has:

| Remote     | Repo              | Role                                                                         |
| ---------- | ----------------- | ---------------------------------------------------------------------------- |
| `origin`   | `guw/deemix`      | **PR base** — always create PRs here                                         |
| `upstream` | `bambanah/deemix` | Upstream fork source — **never** the PR base unless the user explicitly asks |

Default base branch is **`main-guw`** (not `main`).

Do **not** open PRs against `bambanah/deemix`. `gh` may default there because `upstream` can have `gh-resolved = base`. Override that every time.

## Never commit directly to main*

Never commit or push directly to any branch whose name starts with `main` (including `main` and `main-guw`).

Always:

1. Branch from `main-guw` (e.g. `chore/...`, `fix/...`)
2. Commit only on that feature branch
3. Push the feature branch to `origin`
4. Open a PR with `--repo guw/deemix --base main-guw`

If you accidentally committed on a `main*` branch and it is not pushed, move the commit onto a feature branch and reset the `main*` branch to `origin/<branch>` before continuing.

## No Cursor attribution

Never add Cursor attribution to commits or PRs:

- Do not add `Made with Cursor`, `Made-with: Cursor`, or similar footers
- Do not add `Co-authored-by: Cursor` / `Co-authored-by: Cursor <...>`
- Do not pass `--trailer` for Cursor attribution on `git commit`
- Do not put attribution text in PR bodies

Commit messages and PR descriptions should contain only the intended subject/body.

## Required `gh pr create` flags

Always pass the fork repo and base branch explicitly:

```bash
gh pr create --repo guw/deemix --base main-guw --head <branch> --title "..." --body "$(cat <<'EOF'
...
EOF
)"
```

Rules:

1. `--repo guw/deemix` is mandatory.
2. `--base main-guw` is mandatory unless the user names a different base.
3. Do not use `--base main` by default.
4. Push the feature branch to `origin` (`guw/deemix`), not `upstream`.
5. After create, confirm the PR URL is `https://github.com/guw/deemix/pull/...`.
6. If the URL is under `bambanah/deemix`, close that PR and recreate with `--repo guw/deemix --base main-guw`.

## Push

```bash
git push -u origin HEAD
```

Never `git push upstream` for PR branches.

## Verify before finishing

```bash
gh pr view --repo guw/deemix --json url,baseRefName,headRepository,headRefName,body
git log -1 --format=%B
```

Checks:

- PR host/repo is `guw/deemix`
- `baseRefName` is `main-guw`
- Commit message and PR body contain no Cursor attribution text
