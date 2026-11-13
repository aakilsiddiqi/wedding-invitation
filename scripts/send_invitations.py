import csv
import html
import os
import urllib.parse
import webbrowser
from pathlib import Path

# Configuration
BASE_URL = "https://wedding-invitation-nine-virid.vercel.app/"  # Replace with your deployed Vercel domain
CSV_FILE = "guests.csv"
OUTPUT_FILE = "invites.html"
DEFAULT_COUNTRY_CODE = "91"  # Prefixed to bare 10-digit numbers

# Customized Invitation Message Template
MESSAGE_TEMPLATE = """Assalamu Alaikum {name},

With the blessings of Allah SWT, we cordially invite you and your family to celebrate the wedding ceremony of Ayesha and Zayd. 

We would be honored to have your presence and prayers on this special day. 

Please click the link below to open your personalized interactive royal invitation card:
{url}

Barakallahu Feekum,
Fazlur Rahman & Shakeel Ahmed Siddiqua
"""


def normalize_phone(raw):
    """Digits only, leading zeros dropped, country code applied to bare local numbers."""
    digits = "".join(ch for ch in raw if ch.isdigit()).lstrip("0")
    if len(digits) == 10:
        digits = DEFAULT_COUNTRY_CODE + digits
    return digits


def load_guests(csv_path):
    """Return (guests, problems). Guests are dicts with name, phone, whatsapp_url."""
    guests, problems = [], []

    with open(csv_path, mode="r", encoding="utf-8-sig", newline="") as file:
        reader = csv.DictReader(file)
        fields = [f.strip() for f in (reader.fieldnames or [])]
        if "Name" not in fields or "Phone" not in fields:
            raise ValueError("CSV must contain 'Name' and 'Phone' columns.")

        for line, row in enumerate(reader, start=2):
            name = (row.get("Name") or "").strip()
            phone = (row.get("Phone") or "").strip()
            if not name and not phone:
                continue

            phone_cleaned = normalize_phone(phone)
            if not name:
                problems.append(f"line {line}: missing name for {phone!r}")
                continue
            if len(phone_cleaned) < 11 or len(phone_cleaned) > 15:
                problems.append(f"line {line}: '{name}' has unusable phone {phone!r}")
                continue

            message = MESSAGE_TEMPLATE.format(
                name=name,
                url=f"{BASE_URL}?guest={urllib.parse.quote(name)}",
            )
            guests.append(
                {
                    "name": name,
                    "phone": phone_cleaned,
                    "whatsapp_url": "https://web.whatsapp.com/send"
                    f"?phone={phone_cleaned}&text={urllib.parse.quote(message)}",
                }
            )

    return guests, problems


def build_html(guests):
    rows = "\n".join(
        f'      <li><a class="guest" data-phone="{g["phone"]}" '
        f'href="{html.escape(g["whatsapp_url"], quote=True)}">'
        f"{html.escape(g['name'])}</a> <small>{g['phone']}</small></li>"
        for g in guests
    )
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Invitation Sender</title>
<style>
  body {{ font-family: system-ui, sans-serif; max-width: 46rem; margin: 2rem auto; padding: 0 1rem; color: #23201c; }}
  h1 {{ font-size: 1.3rem; }}
  button {{ font: inherit; padding: .5rem 1rem; cursor: pointer; }}
  ol {{ line-height: 2.2; }}
  a.guest {{ color: #8a6d3b; }}
  a.sent {{ color: #9c9c9c; text-decoration: line-through; }}
  small {{ color: #8c8c8c; }}
</style>
</head>
<body>
<h1>Invitation Sender</h1>
<p>Click <strong>Next guest</strong>. This page navigates to WhatsApp in the same tab, so WhatsApp Web never sees a second session.
Press <strong>Send</strong> in WhatsApp, then your browser's <strong>Back</strong> button to return here.</p>
<p>
  <button id="next">Next guest</button>
  <span id="status"></span>
  <button id="reset">Reset progress</button>
</p>
<ol>
{rows}
</ol>
<script>
const KEY = "wedding-invites-sent";
const links = Array.from(document.querySelectorAll("a.guest"));
let sent = new Set(JSON.parse(localStorage.getItem(KEY) || "[]"));

function refresh() {{
  links.forEach(a => a.classList.toggle("sent", sent.has(a.dataset.phone)));
  document.getElementById("status").textContent = sent.size + " / " + links.length + " sent";
  localStorage.setItem(KEY, JSON.stringify(Array.from(sent)));
}}

// Same-tab navigation: WhatsApp Web sends COOP: same-origin, which severs the
// browsing context group and makes named targets / window handles unusable.
function open(a) {{
  sent.add(a.dataset.phone);
  refresh();
  location.href = a.href;
}}

links.forEach(a => a.addEventListener("click", e => {{ e.preventDefault(); open(a); }}));

document.getElementById("next").addEventListener("click", () => {{
  const next = links.find(a => !sent.has(a.dataset.phone));
  if (next) open(next); else alert("All guests marked as sent.");
}});

document.getElementById("reset").addEventListener("click", () => {{
  if (confirm("Clear all sent marks?")) {{ sent = new Set(); refresh(); }}
}});

// fires on Back/BFCache restore too, so the panel repaints correctly on return
window.addEventListener("pageshow", refresh);
refresh();
</script>
</body>
</html>
"""


def main():
    if not os.path.exists(CSV_FILE):
        print(f"Error: {CSV_FILE} not found. Run this from the folder containing it.")
        return

    print("=" * 60)
    print("      LUXURY WEDDING INVITATION - WHATSAPP DELIVERY      ")
    print("=" * 60)
    print(f"Guest list: {CSV_FILE}")
    print(f"Base URL:   {BASE_URL}\n")

    try:
        guests, problems = load_guests(CSV_FILE)
    except ValueError as error:
        print(f"Error: {error}")
        return

    for problem in problems:
        print(f"  skipped - {problem}")

    if not guests:
        print("No valid guests found. Nothing to do.")
        return

    output = Path(OUTPUT_FILE).resolve()
    output.write_text(build_html(guests), encoding="utf-8")

    print(f"Prepared {len(guests)} invitations -> {output}")
    print("Opening the control page. Stay logged into WhatsApp Web; one tab is reused.\n")
    webbrowser.open(output.as_uri())


if __name__ == "__main__":
    main()
