# Git Workflow Guide

This document explains how to commit and push changes to GitHub for the Financial Tracker project.

## Quick Start

### Option 1: Using the Script (Recommended)

```bash
npm run commit
```

This will:
1. Show you what files have changed
2. Ask for a commit message (or use default)
3. Stage all changes
4. Commit the changes
5. Ask if you want to push to GitHub

You can also provide a commit message directly:
```bash
npm run commit "Your commit message here"
```

### Option 2: Manual Git Commands

```bash
# Stage all changes
git add .

# Commit with a message
git commit -m "Your commit message"

# Push to GitHub
git push origin main
```

## GitHub Actions Workflow

The project includes a CI/CD pipeline (`.github/workflows/ci.yml`) that:
- Automatically runs on every push to `main` branch
- Installs dependencies
- Builds the project
- Verifies the build succeeds

You can view workflow runs in the "Actions" tab on GitHub.

## Repository Information

- **Remote URL**: https://github.com/ravicharavi/mango_hurricane.git
- **Default Branch**: `main`

## Troubleshooting

### Authentication Issues

If you encounter authentication errors when pushing:

1. **Using Personal Access Token**:
   - Create a token at: https://github.com/settings/tokens
   - Use the token as your password when prompted

2. **Using SSH**:
   - Set up SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
   - Change remote URL: `git remote set-url origin git@github.com:ravicharavi/mango_hurricane.git`

### Check Current Status

```bash
# See what files have changed
git status

# See detailed changes
git diff
```

### Undo Last Commit (Before Pushing)

```bash
git reset --soft HEAD~1
```

### View Commit History

```bash
git log --oneline
```
