import tensorflow as tf
import numpy as np

ds = tf.keras.utils.image_dataset_from_directory(
    'datasets/conjunctiva', batch_size=None, label_mode='binary'
)
print('Class names:', ds.class_names)
labels = np.concatenate([y.numpy() for _, y in ds])
print('Label 0:', ds.class_names[0], '| count:', int(np.sum(labels==0)))
print('Label 1:', ds.class_names[1], '| count:', int(np.sum(labels==1)))