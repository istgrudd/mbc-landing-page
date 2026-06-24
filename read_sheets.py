import pandas as pd
import json

file_path = r"C:\Users\andra\Downloads\Luaran Penelitian.xlsx"
xl = pd.ExcelFile(file_path)
print("Sheet names:", xl.sheet_names)

for sheet in xl.sheet_names:
    df = xl.parse(sheet)
    print(f"\n--- Sheet: {sheet} ---")
    print("Columns:", list(df.columns))
    # drop empty rows based on a heuristic, e.g., if there's a 'Nama' column, drop where it's null
    # But we don't know the columns yet. Let's just print the first 10 rows that have at least 2 non-null values
    valid_rows = df.dropna(thresh=2)
    print("First few valid rows:")
    print(valid_rows.head(10).to_json(orient='records', force_ascii=False, indent=2))
