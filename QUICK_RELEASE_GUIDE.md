# Quick Release Guide

Fast reference for publishing new releases.

## Pre-Release Checklist

- [ ] Version number updated in code
- [ ] All tests passing
- [ ] Installer built and tested
- [ ] Release notes written
- [ ] Assets named correctly:
  - Installer: `*Setup*NSIS.exe`
  - Portable: `*Portable*.zip`

## Release Process

### Method 1: GitHub Web UI (Easiest)

1. Go to your **private repo** → Releases → "Draft a new release"
2. Click "Choose a tag" → Type `v3.2.0` → "Create new tag"
3. Title: `Fatboy Financial Planner - Basic v3.2.0`
4. Description: Add release notes
5. Drag and drop your installer file
6. Click "Publish release"
7. Done! Automation handles the rest.

### Method 2: GitHub CLI (Fastest)

```bash
gh release create v3.2.0 \
  --title "Fatboy Financial Planner - Basic v3.2.0" \
  --notes "
  ## What's New
  - Feature 1
  - Feature 2

  ## Bug Fixes
  - Fix 1
  - Fix 2
  " \
  path/to/Fatboy.Financial.Planner.-.Basic.v3.2.0_Setup_NSIS.exe
```

## What Happens Automatically

1. ✅ Release created in private repo
2. ✅ GitHub Actions triggers
3. ✅ Release published to public repo
4. ✅ Website automatic updater picks up new version
5. ✅ Users see the latest version

## Verification (2 minutes)

1. **Check workflow**: Private repo → Actions tab (should show green checkmark)
2. **Check public repo**: https://github.com/sathomas501/FB-Financial-Planner/releases
3. **Check website**: Open https://fatboysoftware.com → Browser console should show new version
4. **Test download**: Click download link, verify correct version downloads

## Common Issues

**Workflow doesn't trigger**
- Make sure you clicked "Publish release" (not "Save draft")

**Wrong version on website**
- Clear browser cache and reload
- Check browser console for errors

**Asset not found**
- Verify filename matches pattern: `*Setup*NSIS.exe`

## Version Numbering

Use semantic versioning: `vMAJOR.MINOR.PATCH`

- `v3.2.0` - New features
- `v3.2.1` - Bug fixes
- `v4.0.0` - Major changes

## Full Documentation

See [RELEASE_AUTOMATION_SETUP.md](RELEASE_AUTOMATION_SETUP.md) for complete setup and troubleshooting.
