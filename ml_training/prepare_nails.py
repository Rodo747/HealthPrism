"""
Prepares nail dataset by cropping nail regions from full hand images
using bounding boxes from metadata.csv, then classifying by Hb level.

WHO threshold: Hb < 120 g/L (= 12.0 g/dL) = anemic
"""
import os
import csv
import ast
from pathlib import Path
from PIL import Image

HB_THRESHOLD  = 120.0  # g/L
PHOTO_DIR     = "datasets/nails/photo"
META_CSV      = "datasets/nails/metadata.csv"
OUT_ANEMIC    = "datasets/nails/anemic"
OUT_NON_ANEMIC= "datasets/nails/non_anemic"
MARGIN        = 10  # extra pixels around each bounding box

os.makedirs(OUT_ANEMIC,     exist_ok=True)
os.makedirs(OUT_NON_ANEMIC, exist_ok=True)

rows = list(csv.DictReader(open(META_CSV)))
print(f"Total patients in CSV: {len(rows)}")

copied = {"anemic": 0, "non_anemic": 0, "skipped": 0}

for row in rows:
    patient_id = row["PATIENT_ID"]
    hb         = float(row["HB_LEVEL_GperL"])
    nail_boxes = ast.literal_eval(row["NAIL_BOUNDING_BOXES"])
    is_anemic  = hb < HB_THRESHOLD

    # Find matching image file
    img_path = None
    for ext in [".jpg", ".jpeg", ".png"]:
        candidate = os.path.join(PHOTO_DIR, f"{patient_id}{ext}")
        if os.path.exists(candidate):
            img_path = candidate
            break

    if not img_path:
        copied["skipped"] += 1
        continue

    try:
        img = Image.open(img_path).convert("RGB")
        w, h = img.size

        # Crop each nail region and save as separate training image
        for i, box in enumerate(nail_boxes):
            x1, y1, x2, y2 = box
            # Add margin and clamp to image bounds
            x1 = max(0, x1 - MARGIN)
            y1 = max(0, y1 - MARGIN)
            x2 = min(w, x2 + MARGIN)
            y2 = min(h, y2 + MARGIN)

            if x2 <= x1 or y2 <= y1:
                continue

            crop = img.crop((x1, y1, x2, y2))
            dst_dir  = OUT_ANEMIC if is_anemic else OUT_NON_ANEMIC
            dst_name = f"p{patient_id}_nail{i}.jpg"
            dst_path = os.path.join(dst_dir, dst_name)

            if not os.path.exists(dst_path):
                crop.save(dst_path, "JPEG", quality=95)

            if is_anemic:
                copied["anemic"] += 1
            else:
                copied["non_anemic"] += 1

    except Exception as e:
        print(f"  Error patient {patient_id}: {e}")
        copied["skipped"] += 1

print(f"Nails total — anemic: {copied['anemic']}, non_anemic: {copied['non_anemic']}, skipped: {copied['skipped']}")
print("Ready to run train_nails.py")
