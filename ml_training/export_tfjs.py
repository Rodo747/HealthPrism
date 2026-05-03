"""
Exports trained Keras models to TF.js format using CLI converter.
Avoids numpy compatibility issues with the Python API.
"""
import os
import subprocess
import sys

MODELS = [
    {
        "input":  "saved_models/conjunctiva_model.keras",
        "output": "../frontend/public/models/conjunctiva",
        "name":   "conjunctiva",
    },
    {
        "input":  "saved_models/palm_model.keras",
        "output": "../frontend/public/models/palm",
        "name":   "palm",
    },
    {
        "input":  "saved_models/nails_model.keras",
        "output": "../frontend/public/models/nails",
        "name":   "nails",
    },
]

for m in MODELS:
    if not os.path.exists(m["input"]):
        print(f"Skipping {m['name']} — not found: {m['input']}")
        continue

    print(f"\nExporting {m['name']}...")
    os.makedirs(m["output"], exist_ok=True)

    cmd = [
        sys.executable, "-m", "tensorflowjs.converters.converter",
        "--input_format=keras",
        m["input"],
        m["output"],
    ]

    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode == 0:
        files = os.listdir(m["output"])
        print(f"  Exported to {m['output']}")
        print(f"  Files: {files}")
    else:
        print(f"  Error: {result.stderr}")
        # Fallback: try direct import
        try:
            import tensorflowjs as tfjs
            import tensorflow as tf
            model = tf.keras.models.load_model(m["input"])
            tfjs.converters.save_keras_model(model, m["output"])
            print(f"  Exported via Python API to {m['output']}")
        except Exception as e:
            print(f"  Fallback also failed: {e}")

print("\nExport complete.")
