import pandas as pd
import os
import re

file_path = r"C:\Users\andra\Downloads\Luaran Penelitian.xlsx"
xl = pd.ExcelFile(file_path)

def slugify(text):
    text = str(text).lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def clean_members(text):
    if pd.isna(text): return ""
    lines = str(text).split('\n')
    members = []
    for line in lines:
        cleaned = re.sub(r'^\d+\.\s*', '', line).strip()
        if cleaned: members.append(cleaned)
    return ", ".join(members)

def map_div(d, title):
    d_str = str(d).lower() + " " + str(title).lower()
    if 'game' in d_str or 'cisandung' in d_str or 'chess' in d_str or 'divide' in d_str or 'rookie' in d_str: return 'Game Tech'
    if 'big data' in d_str: return 'Big Data'
    if 'gis' in d_str or 'map' in d_str or 'tourism' in d_str: return 'Geographic Information System'
    if 'cyber' in d_str or 'network' in d_str: return 'Cyber Security'
    return 'Practicum'

os.makedirs('app/content/projects', exist_ok=True)
os.makedirs('app/content/research', exist_ok=True)
os.makedirs('app/content/awards', exist_ok=True)

# 1. Projects (HKI)
df_hki = xl.parse('HKI').dropna(subset=['Unnamed: 3'])
df_hki = df_hki[df_hki['Unnamed: 3'] != '[nama proyek]']
for i, row in df_hki.iterrows():
    title = row['Unnamed: 3']
    slug = slugify(title)
    div = map_div(row['Unnamed: 2'], title)
    
    content = f"""---
title: "{title}"
summary: "Intellectual Property Registration / Project."
division: "{div}"
year: "2024"
order: {i}
images: []
featured: true
status: "completed"
links: {{}}
---
{title} was developed by {clean_members(row['Unnamed: 4'])}.
"""
    with open(f"app/content/projects/{slug}.md", "w", encoding='utf-8') as f:
        f.write(content)

# 2. Research (Paper)
df_paper = xl.parse('Paper').dropna(subset=['Unnamed: 3'])
df_paper = df_paper[df_paper['Unnamed: 3'] != '[nama proyek]']
for i, row in df_paper.iterrows():
    title = str(row['Unnamed: 3']).strip()
    slug = slugify(title)
    venue = row['Unnamed: 5'] if not pd.isna(row['Unnamed: 5']) else "Conference/Journal"
    
    content = f"""---
title: "{title}"
authors: "{clean_members(row['Unnamed: 4'])}"
venue: "{venue}"
year: "2024"
order: {i}
images: []
links: {{}}
---
Research paper by {clean_members(row['Unnamed: 4'])}.
"""
    with open(f"app/content/research/{slug}.md", "w", encoding='utf-8') as f:
        f.write(content)

# 3. Awards (Lomba)
df_lomba = xl.parse('Lomba').dropna(subset=['Unnamed: 3'])
df_lomba = df_lomba[df_lomba['Unnamed: 3'] != '[nama proyek]']
for i, row in df_lomba.iterrows():
    title = str(row['Unnamed: 3']).strip().replace('\n', ' ')
    slug = slugify(title)
    award = str(row['Unnamed: 5']).strip() if not pd.isna(row['Unnamed: 5']) else "Participant"
    members = str(row['Unnamed: 4']).strip() if not pd.isna(row['Unnamed: 4']) else ""
    
    content = f"""---
title: "{title}"
award: "{award}"
members: "{members}"
year: "2024"
order: {i}
---
Awarded to {clean_members(members)}.
"""
    with open(f"app/content/awards/{slug}.md", "w", encoding='utf-8') as f:
        f.write(content)

print("Markdown files generated successfully.")
