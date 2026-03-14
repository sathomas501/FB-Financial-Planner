---
layout: post
title: "Your Retirement Plan, Anywhere: How We Built Cross-Device Sync Without Compromising Privacy"
date: 2026-03-14
author: Steve
categories:
  - product
  - privacy
tags:
  - cloud-sync
  - data-privacy
  - encryption
  - desktop-app
  - web-app
  - end-to-end-encryption
description: "Fatboy now syncs your retirement plan between the desktop app and web browser — encrypted in your browser before it ever leaves your device. Here's exactly how it works and why we built it this way."
excerpt: "Typing your salary, accounts, pension, and Social Security numbers twice is a bad user experience. We fixed it. Your plan now moves between desktop and browser — encrypted client-side, so we never see your financial data."
---

One of the most common requests we've received since launching the web app is simple: *I already entered everything in the desktop. Why do I have to type it all again?*

That's a fair complaint. Re-entering your salary, account balances, pension details, Social Security estimates, and spending targets is tedious — and it's the kind of friction that stops people from using a tool they paid for.

We fixed it. Starting today, Fatboy supports bidirectional sync between the desktop app and the web browser, with optional encrypted cloud backup. Here's what that means, how it works technically, and — importantly — what it means for your privacy.

---

## What Changed

There are now three ways to move your plan between devices:

**1. Export / Import as JSON (free, always local)**

Every version of Fatboy — free trial and Pro — can now export your entire plan as a portable JSON file and import it back. This works in both directions: export from the desktop, import on the web. Export from the web, import on the desktop. The file is human-readable, unencrypted, and stays entirely on your machine. You control it. If you use OneDrive, Dropbox, or any synced folder, this is a zero-friction solution.

**2. Encrypted Cloud Sync (Pro)**

Pro license holders can now use a one-click Save to Cloud / Load from Cloud feature in both the desktop app (File menu) and the web app (home screen). Your plan is encrypted in your browser — or on your desktop — *before it ever leaves your device*. What reaches our server is ciphertext we cannot read. More on this below.

**3. Desktop ↔ Web field translation**

The desktop app and web app don't use identical internal field names or data structures — the desktop is a richer, more detailed model that was built first. When you import a desktop save file into the web app, or load a cloud save onto the desktop, the apps automatically translate between formats. Account types are mapped, pension amounts are converted between annual and monthly representations, tax fields are restructured, and rate percentages are converted to decimals. You don't see any of this — it just works.

---

## The Privacy Problem We Had to Solve First

Before building cloud sync, we had to confront a real tension.

Our core pitch is that your financial data stays on your device. We mean it. The web app runs Python locally in your browser via Pyodide — your retirement projections are computed client-side, not on a server. The desktop app is fully offline. The only network call either app makes is validating your license key.

If we added cloud sync the way most apps do it — POST your data to a database, retrieve it on another device — we would be storing your income, account balances, Social Security estimates, and spending targets on our servers. Even if we promised never to look at it, that promise means nothing if we're breached, compelled, or simply make a mistake.

We didn't want to make that promise. We wanted to make it technically impossible.

---

## How the Encryption Works

The solution is client-side encryption using your license key as the encryption key material.

Here's the exact sequence when you click "Save to Cloud":

**Step 1: Key derivation**

Your license key (e.g., `FATBOY-PRO-XXXX-XXXX-XXXX`) is used as the password input to PBKDF2 — Password-Based Key Derivation Function 2 — with a randomly generated 16-byte salt, 100,000 iterations, and SHA-256 as the hash function. This produces a 256-bit AES key. The 100,000 iteration count is the current OWASP recommendation; it means brute-forcing the key requires meaningful computational work even if someone obtains the encrypted data.

**Step 2: Encryption**

Your plan is serialized to JSON, then encrypted with AES-256-GCM (Galois/Counter Mode) using a randomly generated 12-byte initialization vector. AES-256-GCM is an authenticated encryption scheme — it simultaneously encrypts the data and produces a cryptographic tag that detects any tampering. If anyone modifies the stored ciphertext, decryption will fail rather than silently produce corrupted data.

**Step 3: What gets sent to the server**

The server receives a JSON object with four fields:

```json
{
  "v": 1,
  "salt": "<base64-encoded random bytes>",
  "iv": "<base64-encoded random bytes>",
  "ciphertext": "<base64-encoded encrypted data>"
}
```

That's it. The server stores this alongside your license key. It has no ability to reverse it — the encryption key is derived from your license key, which we don't store (we store a salted hash of it for validation, not the key itself).

**Step 4: Loading on another device**

When you click "Load from Cloud" on a different device, the server returns the same four-field envelope. Your browser (or the desktop app) derives the same AES key from your license key and the stored salt, then decrypts locally. If you type the wrong license key, decryption fails — nothing loads.

---

## The Same Code, Both Sides

The web app uses the browser's built-in `SubtleCrypto` API (part of every modern browser). The desktop app uses Python's `cryptography` library. Both implement the identical algorithm: PBKDF2-SHA256 → AES-256-GCM. A blob saved from the desktop can be decrypted by the web app, and vice versa. We tested this explicitly.

This matters because a common failure mode in "cross-platform encrypted sync" products is subtle implementation differences that make files only decryptable by one platform. We avoided that by using the same parameters — key length, salt length, IV length, iteration count — on both sides.

---

## What We Can See vs. What We Can't

To be precise about what this means for your privacy:

| Data | Visible to us? |
|---|---|
| Your license key | No — we store a salted SHA-256 hash for validation only |
| Your plan (income, accounts, spending, SS, etc.) | No — stored as AES-256-GCM ciphertext |
| When you last synced | Yes — a timestamp stored with the encrypted blob |
| Whether a cloud save exists for your license | Yes — we can see a row exists, not what it contains |
| Your email address (if you provided one at purchase) | Yes — Stripe handles this at checkout |

The timestamp and row existence are metadata we need to operate the service. Everything that could identify your financial situation is encrypted before it leaves your device.

---

## What This Means in Practice

If you're a desktop user who has been manually re-entering data in the web app: stop doing that. Export your desktop save file once, import it into the web app, and your plan is there.

If you want seamless sync across devices going forward: use Save to Cloud on one device, Load from Cloud on the other. Your data travels encrypted. We can't read it.

If you'd rather keep everything local: the JSON export/import path works exactly as it always has. Nothing about the local-first architecture changed.

---

## The Technical Footnote on Field Translation

For those curious about the internals: the desktop save format is a flat dictionary of roughly 90 scalar fields plus structured lists for investment accounts, debts, events, and traditional assets. The web app uses a different internal structure — accounts are stored as typed buckets rather than per-account records, pension and spending values use different field names, tax parameters live in a nested object, and rates are stored as decimals rather than percentages.

When a desktop file is imported into the web app (or vice versa), a translation layer maps between the two. Investment accounts are summed into the web's bucket fields (Traditional IRA, 401k, Roth IRA, HSA, taxable, cash). When going the other direction, the web's bucket fields are reconstructed into the desktop's per-account format with sensible defaults for allocation percentages. Some detail is lost in translation — per-account custom allocations don't survive a round-trip through the web's simplified model — but the financially material numbers (balances, contributions, income, spending, SS, pension, debts, tax settings) transfer cleanly in both directions.

If you're moving between apps frequently and want to preserve fine-grained allocation data, the recommended workflow is to do your detailed allocation work in the desktop app and treat the web app as a scenario testing and projection tool.

---

Sync is available now in both apps. The cloud sync feature requires a Pro license — the server-side storage is tied to your license key. Export/import JSON works for everyone, including free trial users.

If you run into any translation issues with a specific desktop save file, reach out. These are complex data structures and edge cases are inevitable.
