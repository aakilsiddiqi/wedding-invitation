import csv
import html
import json
import os
import sys
import urllib.parse
import webbrowser
from pathlib import Path

# Configuration
BASE_URL = "https://wedding-invitation-groom-bride.vercel.app/"  # Replace with your deployed Vercel domain
CSV_FILE = "guests.csv"
OUTPUT_FILE = "invites.html"
DEFAULT_COUNTRY_CODE = "91"  # Prefixed to bare 10-digit numbers
# Couple and family names come from the site's own config so both stay in sync
WEDDING_FILE = Path(__file__).resolve().parent.parent / "src" / "data" / "wedding.json"

# Customized Invitation Message Templates, keyed by (Religion, InviteType)
# {first} is the inviting side's name, so a groom-side invite leads with the groom
MESSAGE_TEMPLATES = {
    ("Muslim", "With Family"): """Assalamu Alaikum {name},

With the blessings of Allah SWT, we cordially invite you and your family to celebrate the wedding ceremony of {first} and {second}. 

We would be honored to have your presence and prayers on this special day. 

Please click the link below to open your personalized interactive royal invitation card:
{url}

Barakallahu Feekum,
{hosts}
""",
    ("Muslim", "Normal"): """Assalamu Alaikum {name},

With the blessings of Allah SWT, we cordially invite you to celebrate the wedding ceremony of {first} and {second}. 

We would be honored to have your presence and prayers on this special day. 

Please click the link below to open your personalized interactive royal invitation card:
{url}

Barakallahu Feekum,
{hosts}
""",
    ("Hindu", "With Family"): """Namaste {name},

It is with great joy that we invite you and your family to celebrate the wedding ceremony of {first} and {second}. 

We would be honored to have your presence and blessings on this special day. 

Please click the link below to open your personalized interactive royal invitation card:
{url}

Warm regards,
{hosts}
""",
    ("Hindu", "Normal"): """Namaste {name},

It is with great joy that we invite you to celebrate the wedding ceremony of {first} and {second}. 

We would be honored to have your presence and blessings on this special day. 

Please click the link below to open your personalized interactive royal invitation card:
{url}

Warm regards,
{hosts}
""",
}

# Accepted CSV spellings, normalized to the keys used above
RELIGIONS = {"muslim": "Muslim", "islam": "Muslim", "hindu": "Hindu"}
INVITE_TYPES = {"with family": "With Family", "family": "With Family", "normal": "Normal", "single": "Normal"}


def load_names(path):
    """Read couple + host names from the site config so messages follow wedding.json."""
    try:
        with open(path, mode="r", encoding="utf-8") as file:
            wedding = json.load(file)
    except FileNotFoundError:
        raise ValueError(f"Wedding config not found: {path}")
    except json.JSONDecodeError as error:
        raise ValueError(f"Wedding config is not valid JSON ({path}): {error}")

    missing = [k for k in ("brideName", "groomName") if not (wedding.get(k) or "").strip()]
    if missing:
        raise ValueError(f"Wedding config is missing {', '.join(missing)}: {path}")

    bride, groom = wedding["brideName"].strip(), wedding["groomName"].strip()
    bride_family = (wedding.get("brideFamily") or "").strip()
    groom_family = (wedding.get("groomFamily") or "").strip()
    # same rule as the site: the inviting side reads first, missing key keeps bride-first
    groom_first = (wedding.get("inviteSide") or "bride").strip().lower() == "groom"

    return {
        "first": groom if groom_first else bride,
        "second": bride if groom_first else groom,
        # signature block is the inviting family first, blanks skipped
        "hosts": "\n".join(f for f in ((groom_family, bride_family) if groom_first else (bride_family, groom_family)) if f),
        "side": "groom's side" if groom_first else "bride's side",
    }


def normalize_phone(raw):
    """Digits only, leading zeros dropped, country code applied to bare local numbers."""
    digits = "".join(ch for ch in raw if ch.isdigit()).lstrip("0")
    if len(digits) == 10:
        digits = DEFAULT_COUNTRY_CODE + digits
    return digits


def load_guests(csv_path, names):
    """Return (guests, problems). Guests are dicts with name, phone, religion, invite_type, whatsapp_url."""
    guests, problems = [], []

    with open(csv_path, mode="r", encoding="utf-8-sig", newline="") as file:
        reader = csv.DictReader(file)
        fields = [f.strip() for f in (reader.fieldnames or [])]
        required = ["Name", "Phone", "Religion", "InviteType"]
        missing = [f for f in required if f not in fields]
        if missing:
            raise ValueError(f"CSV must contain these columns: {', '.join(required)} (missing: {', '.join(missing)}).")

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

            raw_religion = (row.get("Religion") or "").strip()
            raw_type = (row.get("InviteType") or "").strip()
            religion = RELIGIONS.get(raw_religion.lower())
            invite_type = INVITE_TYPES.get(raw_type.lower())
            if not religion:
                problems.append(f"line {line}: '{name}' has unknown Religion {raw_religion!r} (use Muslim or Hindu)")
                continue
            if not invite_type:
                problems.append(f"line {line}: '{name}' has unknown InviteType {raw_type!r} (use 'With Family' or Normal)")
                continue

            message = MESSAGE_TEMPLATES[(religion, invite_type)].format(
                name=name,
                url=f"{BASE_URL}?guest={urllib.parse.quote(name)}",
                **names,
            )
            guests.append(
                {
                    "name": name,
                    "phone": phone_cleaned,
                    "key": f"{name}|{phone_cleaned}",
                    "religion": religion,
                    "invite_type": invite_type,
                    "message": message,
                    "whatsapp_url": "https://web.whatsapp.com/send"
                    f"?phone={phone_cleaned}&text={urllib.parse.quote(message)}",
                }
            )

    return guests, problems


def build_html(guests):
    rows = "\n".join(
        f'      <li><a class="guest" data-key="{html.escape(g["key"], quote=True)}" '
        f'href="{html.escape(g["whatsapp_url"], quote=True)}">'
        f"{html.escape(g['name'])}</a> <small>{g['phone']}</small> "
        f'<small class="tag">{html.escape(g["religion"])} &middot; {html.escape(g["invite_type"])}</small></li>'
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
  small.tag {{ border: 1px solid #e0d5c0; border-radius: 999px; padding: .05rem .5rem; color: #8a6d3b; }}
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
const keys = new Set(links.map(a => a.dataset.key));
// drop marks from older runs so removed or renamed guests never pad the count
let sent = new Set(JSON.parse(localStorage.getItem(KEY) || "[]").filter(k => keys.has(k)));

function refresh() {{
  links.forEach(a => a.classList.toggle("sent", sent.has(a.dataset.key)));
  document.getElementById("status").textContent = sent.size + " / " + links.length + " sent";
  localStorage.setItem(KEY, JSON.stringify(Array.from(sent)));
}}

// Same-tab navigation: WhatsApp Web sends COOP: same-origin, which severs the
// browsing context group and makes named targets / window handles unusable.
function open(a) {{
  sent.add(a.dataset.key);
  refresh();
  location.href = a.href;
}}

links.forEach(a => a.addEventListener("click", e => {{ e.preventDefault(); open(a); }}));

document.getElementById("next").addEventListener("click", () => {{
  const next = links.find(a => !sent.has(a.dataset.key));
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
        names = load_names(WEDDING_FILE)
        guests, problems = load_guests(CSV_FILE, names)
    except ValueError as error:
        print(f"Error: {error}")
        return

    print(f"Couple (from {WEDDING_FILE.name}): {names['first']} & {names['second']}  [{names['side']} first]")
    print(f"Hosts:  {names['hosts'].replace(chr(10), ' / ') or '(none in wedding.json)'}\n")

    for problem in problems:
        print(f"  skipped - {problem}")

    if not guests:
        print("No valid guests found. Nothing to do.")
        return

    if "--dry-run" in sys.argv:
        print(f"\nDry run - {len(guests)} guest(s), nothing written.\n")
        for guest in guests:
            print(f"  {guest['name']} | {guest['phone']} | {guest['religion']} | {guest['invite_type']}")
        print("\n--- Sample message (%s / %s) ---\n" % (guests[0]["religion"], guests[0]["invite_type"]))
        print(guests[0]["message"])
        return

    output = Path(OUTPUT_FILE).resolve()
    output.write_text(build_html(guests), encoding="utf-8")

    print(f"Prepared {len(guests)} invitations -> {output}")
    print("Opening the control page. Stay logged into WhatsApp Web; one tab is reused.\n")
    webbrowser.open(output.as_uri())


if __name__ == "__main__":
    main()
