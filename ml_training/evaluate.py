"""
Quick evaluation script to test a saved model on a folder of images.
Usage: python evaluate.py --model saved_models/conjunctiva_model.keras --dir datasets/conjunctiva/anemic
"""
import argparse
import os
import numpy as np
import tensorflow as tf
from PIL import Image

IMG_SIZE = 224

def load_image(path):
    img = Image.open(path).convert("RGB").resize((IMG_SIZE, IMG_SIZE))
    arr = np.array(img) / 255.0
    return np.expand_dims(arr, 0)

parser = argparse.ArgumentParser()
parser.add_argument("--model", required=True)
parser.add_argument("--dir",   required=True)
args = parser.parse_args()

model = tf.keras.models.load_model(args.model)

exts = {".jpg", ".jpeg", ".png", ".bmp"}
images = [f for f in os.listdir(args.dir) if os.path.splitext(f)[1].lower() in exts]

if not images:
    print("No images found.")
    exit()

scores = []
for fname in images:
    path = os.path.join(args.dir, fname)
    try:
        x = load_image(path)
        score = float(model.predict(x, verbose=0)[0][0])
        scores.append(score)
        label = "ANEMIC" if score > 0.5 else "NORMAL"
        print(f"{fname:<40} score={score:.3f}  {label}")
    except Exception as e:
        print(f"{fname} — error: {e}")

if scores:
    print(f"\nMean score: {np.mean(scores):.3f}")
    print(f"Predicted anemic: {sum(1 for s in scores if s>0.5)}/{len(scores)}")
