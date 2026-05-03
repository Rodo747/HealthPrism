import os, numpy as np, tensorflow as tf
from tensorflow.keras import layers
from tensorflow.keras.applications import MobileNetV2
from sklearn.metrics import classification_report, roc_auc_score, roc_curve

IMG_SIZE   = 160  # más pequeño = más rápido
BATCH_SIZE = 32
DATA_DIR   = "datasets/conjunctiva"
MODEL_OUT  = "saved_models/conjunctiva_model.keras"

os.makedirs("saved_models", exist_ok=True)

train_ds = tf.keras.utils.image_dataset_from_directory(
    DATA_DIR, validation_split=0.2, subset="training",
    seed=42, image_size=(IMG_SIZE, IMG_SIZE), batch_size=None, label_mode="binary",
)
val_ds = tf.keras.utils.image_dataset_from_directory(
    DATA_DIR, validation_split=0.2, subset="validation",
    seed=42, image_size=(IMG_SIZE, IMG_SIZE), batch_size=None, label_mode="binary",
)

labels_train = np.concatenate([y.numpy() for _, y in train_ds])
n_anemic     = int(np.sum(labels_train == 0))
n_non_anemic = int(np.sum(labels_train == 1))
total        = len(labels_train)
print(f"Train: {total} | anemic: {n_anemic} | non_anemic: {n_non_anemic}")

# Oversampling simple — repite non_anemic
ds_anemic     = train_ds.filter(lambda x, y: tf.equal(tf.cast(tf.squeeze(y), tf.int32), 0))
ds_non_anemic = train_ds.filter(lambda x, y: tf.equal(tf.cast(tf.squeeze(y), tf.int32), 1))

repeat_factor = (n_anemic // n_non_anemic) + 1
balanced_ds = tf.data.Dataset.sample_from_datasets(
    [ds_anemic.shuffle(1000).repeat(), ds_non_anemic.repeat(repeat_factor + 2).shuffle(500)],
    weights=[0.5, 0.5], seed=42,
).repeat()

augment = tf.keras.Sequential([
    layers.RandomFlip("horizontal"),
    layers.RandomRotation(0.2),
    layers.RandomBrightness(0.3),
    layers.RandomContrast(0.3),
])

def preprocess_train(x, y):
    x = tf.cast(x, tf.float32) / 255.0
    x = augment(x, training=True)
    return x, y

def preprocess_val(x, y):
    return tf.cast(x, tf.float32) / 255.0, y

AUTOTUNE        = tf.data.AUTOTUNE
steps_per_epoch = (n_anemic * 2) // BATCH_SIZE

train_batched = balanced_ds.map(preprocess_train, num_parallel_calls=AUTOTUNE).batch(BATCH_SIZE).prefetch(AUTOTUNE)
val_batched   = val_ds.map(preprocess_val, num_parallel_calls=AUTOTUNE).batch(BATCH_SIZE).prefetch(AUTOTUNE)

# Modelo simple y rápido
base = MobileNetV2(input_shape=(IMG_SIZE, IMG_SIZE, 3), include_top=False, weights="imagenet")
base.trainable = False

inputs  = tf.keras.Input(shape=(IMG_SIZE, IMG_SIZE, 3))
x       = base(inputs, training=False)
x       = layers.GlobalAveragePooling2D()(x)
x       = layers.BatchNormalization()(x)
x       = layers.Dense(128, activation="relu")(x)
x       = layers.Dropout(0.5)(x)
outputs = layers.Dense(1, activation="sigmoid")(x)
model   = tf.keras.Model(inputs, outputs)

model.compile(
    optimizer=tf.keras.optimizers.Adam(1e-3),
    loss="binary_crossentropy",
    metrics=["accuracy", tf.keras.metrics.AUC(name="auc")],
)

print("\nEntrenando...")
model.fit(
    train_batched,
    validation_data=val_batched,
    epochs=20,
    steps_per_epoch=steps_per_epoch,
    class_weight={0: 1.0, 1: 3.5},
    callbacks=[
        tf.keras.callbacks.EarlyStopping(patience=5, restore_best_weights=True, monitor="val_auc", mode="max"),
        tf.keras.callbacks.ModelCheckpoint(MODEL_OUT, save_best_only=True, monitor="val_auc", mode="max"),
        tf.keras.callbacks.ReduceLROnPlateau(factor=0.5, patience=3, monitor="val_auc", mode="max"),
    ]
)

print("\nEvaluando...")
model = tf.keras.models.load_model(MODEL_OUT)
y_true, y_proba = [], []
for x_batch, y_batch in val_batched:
    y_proba.extend(model.predict(x_batch, verbose=0).flatten())
    y_true.extend(y_batch.numpy().flatten())

y_true  = np.array(y_true)
y_proba = np.array(y_proba)

fpr, tpr, thresholds = roc_curve(y_true, y_proba)
best_t = thresholds[np.argmax(tpr - fpr)]
print(f"Threshold óptimo: {best_t:.3f}")
print(classification_report(y_true, (y_proba > best_t).astype(int), target_names=["anemic", "non_anemic"]))
auc = roc_auc_score(y_true, y_proba)
print(f"AUC: {auc:.4f}")

np.save("saved_models/conjunctiva_threshold.npy", best_t)
print(f"Modelo guardado en {MODEL_OUT}")