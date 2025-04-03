import tensorflow as tf
from tensorflow.keras import layers, models

# Create the model
model = models.Sequential([
    layers.Conv2D(32, (3,3), activation='relu', input_shape=(28,28,1)),  # Detects edges
    layers.MaxPooling2D(2,2),  # Reduces image size
    layers.Conv2D(64, (3,3), activation='relu'),  # Detects more complex shapes
    layers.MaxPooling2D(2,2),
    layers.Flatten(),  # Flattens image data
    layers.Dense(128, activation='relu'),  # Fully connected layer
    layers.Dense(2, activation='softmax')  # Output: 2 categories (square/triangle)
])

# Compile the model
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# Display model summary
model.summary()



