"""
Prepares datasets for HealthPrism ML training.
- Conjunctiva: reads Hgb from Excel, copies palpebral images
- Palm: classifies by filename prefix (Anemic / Non-Anemic)
"""
import os
import shutil
import openpyxl
from pathlib import Path

HGB_THRESHOLD = 12.0

def parse_hgb(value):
    if value is None:
        return None
    if isinstance(value, (int, float)):
        return float(value)
    try:
        return float(str(value).replace(',', '.'))
    except:
        return None

def process_conjunctiva_region(region_dir, excel_path, out_anemic, out_non_anemic):
    os.makedirs(out_anemic, exist_ok=True)
    os.makedirs(out_non_anemic, exist_ok=True)

    wb = openpyxl.load_workbook(excel_path)
    ws = wb.active
    labels = {}
    for row in ws.iter_rows(min_row=2, values_only=True):
        patient_id = row[0]
        hgb = parse_hgb(row[1])
        if patient_id is not None and hgb is not None:
            labels[int(patient_id)] = hgb

    print(f"\nRegion: {region_dir}")
    print(f"Patients with labels: {len(labels)}")

    copied = {"anemic": 0, "non_anemic": 0, "skipped": 0}

    for patient_id, hgb in labels.items():
        patient_dir = os.path.join(region_dir, str(patient_id))
        if not os.path.exists(patient_dir):
            copied["skipped"] += 1
            continue

        # Prefer palpebral image, fallback to any image
        palpebral = None
        for f in os.listdir(patient_dir):
            if f.endswith("_palpebral.png"):
                palpebral = os.path.join(patient_dir, f)
                break
        if not palpebral:
            for f in os.listdir(patient_dir):
                if f.lower().endswith((".jpg", ".jpeg", ".png")):
                    palpebral = os.path.join(patient_dir, f)
                    break

        if not palpebral:
            copied["skipped"] += 1
            continue

        is_anemic = hgb < HGB_THRESHOLD
        dst_dir   = out_anemic if is_anemic else out_non_anemic
        dst_name  = f"{Path(region_dir).name}_{patient_id}_{Path(palpebral).name}"
        dst_path  = os.path.join(dst_dir, dst_name)

        if not os.path.exists(dst_path):
            shutil.copy2(palpebral, dst_path)

        if is_anemic:
            copied["anemic"] += 1
        else:
            copied["non_anemic"] += 1

    print(f"  Copied anemic:     {copied['anemic']}")
    print(f"  Copied non_anemic: {copied['non_anemic']}")
    print(f"  Skipped:           {copied['skipped']}")
    return copied

# ── Conjunctiva ───────────────────────────────────────────────────────────────
print("=" * 50)
print("Processing conjunctiva dataset...")
print("=" * 50)

conjunctiva_base = os.path.join("datasets", "conjunctiva", "dataset anemia")
out_anemic       = os.path.join("datasets", "conjunctiva", "anemic")
out_non_anemic   = os.path.join("datasets", "conjunctiva", "non_anemic")

total = {"anemic": 0, "non_anemic": 0}
for region in ["India", "Italy"]:
    region_dir = os.path.join(conjunctiva_base, region)
    excel_path = os.path.join(region_dir, f"{region}.xlsx")
    if not os.path.exists(region_dir) or not os.path.exists(excel_path):
        print(f"Skipping {region} — not found")
        continue
    result = process_conjunctiva_region(region_dir, excel_path, out_anemic, out_non_anemic)
    total["anemic"]     += result["anemic"]
    total["non_anemic"] += result["non_anemic"]

print(f"\nConjunctiva total — anemic: {total['anemic']}, non_anemic: {total['non_anemic']}")

# ── Palm ──────────────────────────────────────────────────────────────────────
print("\n" + "=" * 50)
print("Processing palm dataset...")
print("=" * 50)

palm_src        = os.path.join("datasets", "palm", "Palm")
palm_anemic     = os.path.join("datasets", "palm", "anemic")
palm_non_anemic = os.path.join("datasets", "palm", "non_anemic")
os.makedirs(palm_anemic, exist_ok=True)
os.makedirs(palm_non_anemic, exist_ok=True)

palm_copied = {"anemic": 0, "non_anemic": 0, "skipped": 0}

if os.path.exists(palm_src):
    for fname in os.listdir(palm_src):
        if not Path(fname).suffix.lower() in {".jpg", ".jpeg", ".png", ".bmp"}:
            continue
        flower = fname.lower()
        # Filename pattern: AnemicP-XXX.png or Non-AnemicP-XXX.png
        if flower.startswith("non-anemic") or flower.startswith("non_anemic"):
            dst = palm_non_anemic
            key = "non_anemic"
        elif flower.startswith("anemic"):
            dst = palm_anemic
            key = "anemic"
        else:
            palm_copied["skipped"] += 1
            continue

        src      = os.path.join(palm_src, fname)
        dst_path = os.path.join(dst, fname)
        if not os.path.exists(dst_path):
            shutil.copy2(src, dst_path)
        palm_copied[key] += 1
else:
    print(f"Palm source not found: {palm_src}")

print(f"Palm total — anemic: {palm_copied['anemic']}, non_anemic: {palm_copied['non_anemic']}, skipped: {palm_copied['skipped']}")
print("\nDataset preparation complete.")
print("You can now run: python train_conjunctiva.py")
print("Then run:        python train_palm.py")