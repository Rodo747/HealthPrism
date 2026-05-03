"""
Removes corrupt or unreadable images from the dataset folders.
Run this before training.
"""
import os
from pathlib import Path
from PIL import Image

FOLDERS = [
    "datasets/conjunctiva/anemic",
    "datasets/conjunctiva/non_anemic",
    "datasets/palm/anemic",
    "datasets/palm/non_anemic",
]

VALID_EXTS = {".jpg", ".jpeg", ".png", ".bmp"}
total_removed = 0

for folder in FOLDERS:
    if not os.path.exists(folder):
        print(f"Skipping {folder} — not found")
        continue

    removed = 0
    files = [f for f in os.listdir(folder) if Path(f).suffix.lower() in VALID_EXTS]
    print(f"\nChecking {folder} ({len(files)} files)...")

    for fname in files:
        fpath = os.path.join(folder, fname)
        try:
            with Image.open(fpath) as img:
                img.verify()
        except Exception:
            os.remove(fpath)
            removed += 1
            print(f"  Removed corrupt: {fname}")

    print(f"  Removed {removed} corrupt files. Remaining: {len(files) - removed}")
    total_removed += removed

print(f"\nTotal removed: {total_removed}")
print("Dataset clean. You can now run train_conjunctiva.py")