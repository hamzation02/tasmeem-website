# TASMEEM WOODWORKS Website

A simple static website: HTML, CSS and JavaScript only. No paid tools, no database, no API keys.

## Folder structure

```
tasmeem/
├── index.html      page content
├── style.css       design and colours
├── script.js       menu, WhatsApp links, form (contact details in CONFIG at the top)
├── README.md       this guide
└── images/         logo, favicon, site photos, stock/sample images
```

## 1. Preview on your computer or phone

- **Computer:** unzip the folder and double-click `index.html`.
- **Phone:** send the whole folder (as a zip) to the phone, unzip it, and open `index.html` in Chrome. Or deploy it (step 2) and open the link.

## 2. Free deployment (GitHub Pages or Cloudflare Pages)

Free plans and terms change, so check the provider's current pricing and custom-domain rules before you rely on them.

**GitHub Pages**
1. Create a free account at github.com and a new public repository (for example `tasmeem-website`).
2. Upload all files and the `images` folder so `index.html` is at the top level.
3. Go to Settings → Pages. Under "Build and deployment", choose "Deploy from a branch", branch `main`, folder `/ (root)`, then Save.
4. After a minute your site appears at the address GitHub shows.

**Cloudflare Pages:** create a free account, choose Workers & Pages → Pages → "Upload assets", and upload the folder. Follow the on-screen steps.

## 3. Connect tasmeemwoodworks.com (Hostinger domain)

A domain and hosting are separate services. You already own the domain; the free host serves the website.

> **Warning:** changing DNS records or nameservers can break email or other services on the domain. Before changing anything, write down your existing records. If you use email on this domain, do not change nameservers unless you understand the effect.

1. In GitHub Pages (Settings → Pages → Custom domain) or in Cloudflare Pages (Custom domains), enter `tasmeemwoodworks.com`.
2. The provider will show the **exact DNS records** to add. Use only those values. I have not listed any because they must come from the provider.
3. In Hostinger: hPanel → Domains → your domain → DNS / Nameservers → DNS Records. Add the records the provider gave you. Remove only conflicting old website records (for example an old parking-page A record).
4. Wait for DNS to update (minutes to 48 hours) and turn on "Enforce HTTPS" when it becomes available.
5. If you use Cloudflare Pages with a domain not on Cloudflare, the provider may ask you to change nameservers or add a CNAME. Follow its current instructions.

## 4. Replace before publishing

- [ ] Office address and business hours in `index.html` (search for `[ADD`).
- [ ] Confirm the phone, WhatsApp number and email (`CONFIG` in `script.js`; phone/email also appear in `index.html`).
- [ ] **Check the four "Site photo" images are genuinely yours**; they were supplied for this project. Edit captions if needed.
- [ ] Replace the "Illustrative" stock/sample images (doors, cabinets, wardrobes, furniture, hero background) with photos of your own completed work, then remove the "illustrative" labels.
- [ ] Change `https://tasmeemwoodworks.com/` in `index.html` (canonical and Open Graph tags) if your final address differs.
- [ ] Check the social links open the correct profiles.
- [ ] Optional: replace `images/favicon.png`.

**Replacing a photo:** put your image in `images/` (JPG, ideally under 200 KB, about 1200 px wide), then change the `src`, `alt` text and caption of that `<img>` in `index.html`.

## 5. The quote form: what it can and cannot do

A static page has no server, so **it cannot deliver form submissions to the business by itself**. As built, the form validates the fields and then shows two links, "Send on WhatsApp" and "Send by email", which open your WhatsApp or email app with the details filled in. The customer must press Send. Nothing is stored or sent automatically.

To receive submissions directly, connect an external service later, such as:
- **Formspree**, **Web3Forms** or **Getform** (free tiers exist; check current limits). You paste the form endpoint they give you into the `<form>` tag and update `script.js` to post to it.
- A small **secure backend** of your own (for example a serverless function that emails you).

Features that need an external service or backend: automatic form delivery to your inbox, spam protection (CAPTCHA), stored enquiries, and email confirmations to customers.

## Notes

- No logins, payments, reviews, statistics, licences or awards are included, because none were supplied.
- Brand colours: gold `#D4AF37`, walnut `#4A2818`, timber `#8B5E3C`, cream `#FAF7F0` (top of `style.css`).

> Note: in this upload-friendly version all images sit in the main folder, not in an images folder. Replace photos by uploading a file with the same name.

