import tensorflow as tf
from tensorflow import keras
from flask import Flask, request, jsonify
from flask_cors import CORS
import matplotlib.pyplot as plt
import base64
import re
import numpy as np
from PIL import Image, ImageOps
import io

app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def prediction():
    model = keras.models.load_model("backend/model/my_model.keras")
    
    data = request.get_json()

    # Extract base64 string from data URL
    img_data = re.sub('^data:image/.+;base64,', '', data['image'])
    img_bytes = base64.b64decode(img_data)
    # Load image with alpha (RGBA) first
    image = Image.open(io.BytesIO(img_bytes)).convert("RGBA")

    # Create white background
    background = Image.new("RGBA", image.size, (255, 255, 255, 255))
    image = Image.alpha_composite(background, image)

    # Convert to grayscale
    image = image.convert("L")
    image = ImageOps.invert(image)

    # Resize and preprocess if needed
    image = image.resize((28, 28))
    img_array = np.array(image).astype("float32") / 255.0

    
    img_array = img_array.reshape(1, 28, 28, 1)

    # Get prediction from model
    prediction = model.predict(img_array)
    predicted_class = int(np.argmax(prediction))
    
    return jsonify({ 'prediction': predicted_class })


if __name__ == "__main__":
    app.run(debug=True)



