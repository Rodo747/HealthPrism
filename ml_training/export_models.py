import tensorflow as tf
import json, os, struct, numpy as np

def export_tfjs(model, output_dir):
    os.makedirs(output_dir, exist_ok=True)
    weights = []
    weight_data = []
    
    for layer in model.layers:
        for w in layer.weights:
            arr = w.numpy().flatten()
            weights.append({
                "name": w.name,
                "shape": list(w.shape),
                "dtype": str(w.dtype).replace('tf.', ''),
            })
            weight_data.append(arr.astype(np.float32).tobytes())
    
    all_bytes = b''.join(weight_data)
    with open(os.path.join(output_dir, 'group1-shard1of1.bin'), 'wb') as f:
        f.write(all_bytes)
    
    byte_offset = 0
    weight_manifest = []
    for i, (w_info, w_bytes) in enumerate(zip(weights, weight_data)):
        weight_manifest.append({
            "name": w_info["name"],
            "shape": w_info["shape"],
            "dtype": "float32",
        })
        byte_offset += len(w_bytes)
    
    model_json = {
        "format": "graph-model",
        "generatedBy": "manual-export",
        "convertedBy": "manual",
        "modelTopology": json.loads(model.to_json()),
        "weightsManifest": [{
            "paths": ["group1-shard1of1.bin"],
            "weights": weight_manifest
        }]
    }
    
    with open(os.path.join(output_dir, 'model.json'), 'w') as f:
        json.dump(model_json, f)
    
    print(f"Exportado a {output_dir} ({len(all_bytes)/1024/1024:.1f} MB)")

models = [
    ("saved_models/conjunctiva_model.keras", "../frontend/public/models/conjunctiva"),
    ("saved_models/palm_model.keras", "../frontend/public/models/palm"),
    ("saved_models/nails_model.keras", "../frontend/public/models/nails"),
]

for keras_path, output_path in models:
    print(f"Exportando {keras_path}...")
    model = tf.keras.models.load_model(keras_path)
    export_tfjs(model, output_path)

print("\nTodos exportados.")