# Harmony Bridge Care — Website

Static, multi-page website for Harmony Bridge Care, Inc. It has no build step: upload the folder to any web host (Netlify, Vercel, cPanel, GoDaddy, etc.).

## Pages
| File | Page |
|---|---|
| `index.html` | Home |
| `about.html` | Mission, vision, core values, goals, standards, journey |
| `services.html` | Group Home, Personal Supports, Nursing, Transportation, added services |
| `team.html` | Leadership, governance and org chart, staff training |
| `admissions.html` | Eligibility, process, referral form, resources, FAQ |
| `careers.html` | Open roles and the online application with resume upload |
| `get-involved.html` | Giving, volunteering, sponsorship, 2027 Gala |
| `contact.html` | Contact details, hours, contact form, map |
| `404.html` | Not-found page |

Brand colors (from the logo): Deep Green `#06533B`, Leaf Green `#79A338`, Light Leaf `#B5C757`. All styling is in `assets/css/styles.css`.

## Before going live
1. **Connect the forms.** Every form posts to `https://formspree.io/f/YOUR_FORM_ID`. Create a free Formspree form (or use your host's form handler) and replace `YOUR_FORM_ID` in each HTML file. Until you do, forms show a thank-you message but **don't send anything**. The careers form uploads a resume file, which needs a plan that accepts file uploads.
2. **Replace the stock photos** (from Unsplash, free for commercial use) with real photos of your home and team once you have them. Real photos build more trust.
3. **Social links.** The Facebook, Instagram, and LinkedIn icons in the footer point to `#`. Add your profile URLs.
4. **Downloadable resources** (Admissions page) currently open an email request. When the PDFs are ready, put them in `assets/docs/` and update the links.
5. Check that wording about DDA approval and OHCQ licensing (About and FAQ) matches your current status, and update it once you are licensed.
