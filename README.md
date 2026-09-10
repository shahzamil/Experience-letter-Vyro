# Experience Letter Maker (Vyro)

Make Vyro experience letters and email them from your Gmail.

- Fill 5 blanks → the letter preview updates live on your Vyro letterhead.
- **Download PDF** saves the letter.
- **Send via Gmail** emails the PDF to the person automatically.

The blanks: **Title (Mr/Ms/Mrs)**, **Full name**, **Position title**,
**Date started**, **Last date**, **Issue date**. Pronouns (he/she) and the
first name update automatically from the title and full name.

Your letterhead is the file **`letterhead.png`** — keep it in the project.
To change the branding later, just replace that image (same size works best).

---

## 1. Get a Gmail App Password (one time)

You cannot use your normal Gmail password. You need an **App Password**.

1. Turn on **2-Step Verification**: https://myaccount.google.com/security
2. Go to **App passwords**: https://myaccount.google.com/apppasswords
3. Create one (name it "Vyro Letters"). Google gives a **16-character code**.
4. Keep that code for step 3 below.

Tip: use the Gmail/Workspace account you want letters to come *from*
(for example the one on `people@vyro.ai`).

---

## 2. Put the files on GitHub

1. Create a new empty GitHub repo.
2. Upload every file in this folder, keeping the structure:
   ```
   index.html
   letterhead.png
   package.json
   api/send.js
   ```

---

## 3. Deploy on Vercel

1. https://vercel.com → **Add New → Project** → import your repo.
2. Framework preset: **Other** (leave defaults). Click **Deploy**.
3. **Settings → Environment Variables**, add these three:

   | Name                 | Value                                |
   |----------------------|--------------------------------------|
   | `GMAIL_USER`         | your gmail/workspace address         |
   | `GMAIL_APP_PASSWORD` | the 16-char app password (no spaces) |
   | `SENDER_NAME`        | `Vyro People Team`                   |

4. **Deployments → Redeploy** so the variables take effect.

Open your Vercel URL and use the tool.

---

## 4. Change the letter wording

Open `index.html`, search for:

```
>>> EDIT YOUR LETTER TEMPLATE HERE <<<
```

Edit the sentences inside `buildLetter`. The blanks like `${fullName}`,
`${position}`, `${v.start}` fill in from the form. Section ends at
`END OF TEMPLATE`.

---

## Honest limits

- **Use the deployed Vercel site**, not the local file — sending and PDF need it.
- **Sending limits:** normal Gmail ≈ 500/day, Google Workspace ≈ 2,000/day.
- **PDF is image-based.** Looks clean, prints fine, but text inside is not
  selectable/copyable. Selectable text or an editable Word file = a heavier build.
- **Keep the app password secret.** It only lives in Vercel env variables,
  never in the code or GitHub.
- **App passwords need 2-Step Verification on.** If the option is missing, that's why.
