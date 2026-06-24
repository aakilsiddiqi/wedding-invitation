import csv
import urllib.parse
import webbrowser
import time
import os

# Configuration
BASE_URL = "https://yourweddinginvitation.vercel.app/"  # Replace with your deployed Vercel domain
CSV_FILE = "guests.csv"
DELAY_SECONDS = 6  # Delay between opening tabs to avoid overloading or getting rate-limited

# Customized Invitation Message Template
MESSAGE_TEMPLATE = """Assalamu Alaikum {name},

With the blessings of Allah SWT, we cordially invite you and your family to celebrate the wedding ceremony of Ayesha and Zayd. 

We would be honored to have your presence and prayers on this special day. 

Please click the link below to open your personalized interactive royal invitation card:
{url}

Barakallahu Feekum,
Fazlur Rahman & Shakeel Ahmed Siddiqua
"""

def main():
    if not os.path.exists(CSV_FILE):
        print(f"Error: {CSV_FILE} not found. Please create it first.")
        return

    print("=" * 60)
    print("      LUXURY WEDDING INVITATION - WHATSAPP BULK DELIVERY      ")
    print("=" * 60)
    print(f"Reading guest list from: {CSV_FILE}")
    print(f"Base URL: {BASE_URL}")
    print(f"Waiting delay: {DELAY_SECONDS} seconds per message\n")

    input("Press ENTER to start opening WhatsApp Web tabs...")

    success_count = 0
    with open(CSV_FILE, mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        
        # Validate columns
        if not reader.fieldnames or 'Name' not in reader.fieldnames or 'Phone' not in reader.fieldnames:
            print("Error: CSV must contain 'Name' and 'Phone' columns.")
            return

        for index, row in enumerate(reader, 1):
            name = row['Name'].strip()
            phone = row['Phone'].strip()

            if not name or not phone:
                continue

            # Format phone number (remove spaces, dashes, make sure it has country code)
            phone_cleaned = "".join(filter(str.isdigit, phone))
            if not phone_cleaned.startswith(('91', '1', '44', '971')):  # Example validation, modify as needed
                # Auto-prepend country code (e.g. 91 for India) if needed, or print warning
                pass

            # Create personalized invitation link
            personalized_url = f"{BASE_URL}?guest={urllib.parse.quote(name)}"
            
            # Format invitation text
            message = MESSAGE_TEMPLATE.format(name=name, url=personalized_url)
            encoded_message = urllib.parse.quote(message)
            
            # Generate WhatsApp Web link
            whatsapp_web_url = f"https://web.whatsapp.com/send?phone={phone_cleaned}&text={encoded_message}"
            
            print(f"[{index}] Opening WhatsApp for {name} ({phone_cleaned})...")
            
            # Open browser tab
            webbrowser.open(whatsapp_web_url)
            success_count += 1
            
            # Rate limit buffer
            time.sleep(DELAY_SECONDS)

    print("\n" + "=" * 60)
    print(f"Bulk Process Completed! Successfully initiated {success_count} invitation links.")
    print("Note: Make sure you are logged into WhatsApp Web in your default browser.")
    print("=" * 60)

if __name__ == "__main__":
    main()
