# Release Automation Setup Guide

This repository uses GitHub Actions to automatically publish releases from your private development repo to the public distribution repo (`sathomas501/FB-Financial-Planner`).

## One-Time Setup

### Step 1: Create a Personal Access Token (PAT)

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Direct link: https://github.com/settings/tokens

2. Click "Generate new token (classic)"

3. Configure the token:
   - **Note**: `Public Repo Release Publisher`
   - **Expiration**: Choose based on your preference (recommend 1 year, then renew)
   - **Scopes**: Check only `repo` (Full control of private repositories)

4. Click "Generate token"

5. **IMPORTANT**: Copy the token immediately (you won't see it again!)

### Step 2: Add Token to Private Repository

1. Go to your **private repository** settings
   - Navigate to Settings → Secrets and variables → Actions

2. Click "New repository secret"

3. Configure the secret:
   - **Name**: `PUBLIC_REPO_TOKEN`
   - **Secret**: Paste the token you copied in Step 1

4. Click "Add secret"

### Step 3: Add Workflow File to Private Repo

If you're reading this in the website repo, you need to copy the workflow to your private repo:

1. Copy `.github/workflows/publish-to-public-repo.yml` to your private repo

2. Commit and push:
   ```bash
   git add .github/workflows/publish-to-public-repo.yml
   git commit -m "Add automated release publishing workflow"
   git push
   ```

## How It Works

### The Workflow

When you publish a release in your **private repository**:

1. GitHub Actions automatically triggers
2. Downloads all release assets from the private repo
3. Creates an identical release in the public repo
4. Uploads all assets to the public repo
5. Your website's automatic updater immediately picks up the new version

### What Gets Published

- Release tag (e.g., `v3.2.0`)
- Release title
- Release notes/description
- All uploaded assets (installers, portable versions, etc.)

## Usage

### Creating a New Release

**Option A: GitHub Web Interface**

1. Go to your private repo → Releases → "Create a new release"
2. Choose tag: `v3.2.0` (or your version)
3. Set release title: `Fatboy Financial Planner - Basic v3.2.0`
4. Write release notes
5. Upload your installer file(s)
6. Click "Publish release"
7. ✅ GitHub Actions automatically publishes to public repo!

**Option B: GitHub CLI**

```bash
# In your private repo
gh release create v3.2.0 \
  --title "Fatboy Financial Planner - Basic v3.2.0" \
  --notes "Release notes here" \
  path/to/installer.exe

# ✅ GitHub Actions automatically publishes to public repo!
```

### Monitoring the Automation

1. After publishing, go to your private repo → Actions
2. You'll see the "Publish Release to Public Repo" workflow running
3. Click it to see real-time progress
4. Green checkmark = success! Your release is live.

### Verification

After the workflow completes:

1. Check the public repo: https://github.com/sathomas501/FB-Financial-Planner/releases
2. Visit your website and check the browser console
3. The automatic updater should show the new version

## Troubleshooting

### Workflow fails with "Resource not accessible by integration"

- Your `PUBLIC_REPO_TOKEN` secret is missing or invalid
- Regenerate the token and update the secret

### Assets don't upload

- Make sure you uploaded assets when creating the release
- Check the workflow logs for specific error messages

### Release exists but version is wrong

- The workflow creates releases with the exact same tag as your private repo
- Make sure your tag follows the pattern: `v3.2.0` (with lowercase 'v')

## File Naming Requirements

Your installer files should match the pattern expected by the website updater:

- **Installer**: Must contain "Setup" and end with "NSIS.exe"
  - Example: `Fatboy.Financial.Planner.-.Basic.v3.2.0_Setup_NSIS.exe`

- **Portable**: Must contain "Portable" and end with ".zip"
  - Example: `Fatboy.Financial.Planner.-.Portable.v3.2.0.zip`

## Security Notes

- The PAT has access to all your repositories - keep it secure
- Only store it as a GitHub secret, never commit it to code
- Rotate the token annually or if compromised
- The workflow only publishes releases, it cannot modify code
