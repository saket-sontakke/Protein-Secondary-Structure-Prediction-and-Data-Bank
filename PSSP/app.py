# import tensorflow as tf
# from flask import Flask, request, jsonify
# from tensorflow.keras.models import load_model  # type: ignore
# import numpy as np
# from tensorflow.keras.preprocessing.sequence import pad_sequences # type: ignore
# import sys
# sys.stdout.reconfigure(encoding='utf-8')
# from flask_cors import CORS 

# import keras
# print(keras.__version__)

# # Initialize Flask app
# app = Flask(__name__)

# # Enable CORS for all routes
# CORS(app)

# # Define the custom metric function
# def masked_accuracy(y_true, y_pred):
#     mask = tf.math.not_equal(y_true, 0)  # Assuming padding values are 0
#     correct_preds = tf.math.equal(tf.argmax(y_true, axis=-1), tf.argmax(y_pred, axis=-1))
#     masked_correct_preds = tf.boolean_mask(correct_preds, mask)
#     return tf.reduce_mean(tf.cast(masked_correct_preds, tf.float32))

# # Load the model with custom objects
# model = load_model("pssp_model.keras", custom_objects={"masked_accuracy": masked_accuracy})

# # Define reverse mapping for secondary structure prediction
# ss_rev_dict = {1: 'C', 2: 'H', 3: 'E'}

# # Function to encode amino acid sequences
# aa_dict = {aa: idx for idx, aa in enumerate('ACDEFGHIKLMNPQRSTVWY', 1)}

# def encode_sequence(seq, mapping):
#     return [mapping.get(char, 0) for char in seq]  # Get 0 if the amino acid is unknown

# # Function to decode the predicted sequence back to secondary structure
# def decode_prediction(predictions):
#     decoded = [ss_rev_dict.get(np.argmax(pred), '-') for pred in predictions]
#     return ''.join(decoded)

# @app.route('/')
# def home():
#     return "Welcome to the Protein Secondary Structure Prediction API. Use /predict to get predictions."

# # Route for secondary structure prediction
# @app.route('/predict', methods=['POST'])
# def predict():
#     # Get the input data (amino acid sequence)
#     data = request.get_json(force=True)
#     sequence = data.get('sequence')

#     if not sequence:
#         return jsonify({'error': 'No amino acid sequence provided'}), 400

#     # Encode and pad the input sequence
#     encoded_input = encode_sequence(sequence, aa_dict)
#     padded_input = pad_sequences([encoded_input], maxlen=model.input_shape[1], padding='post')

#     # Make prediction
#     predictions = model.predict(padded_input)

#     # Decode the predicted secondary structure
#     trimmed_predictions = predictions[0][:len(sequence)]  # Trim to original sequence length
#     predicted_ss = decode_prediction(trimmed_predictions)

#     # Return the predicted secondary structure
#     return jsonify({'sequence': sequence, 'predicted_ss': predicted_ss})

# if __name__ == '__main__':
#     app.run(debug=True)








import tensorflow as tf
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.layers import LSTM
from tensorflow.keras.utils import CustomObjectScope
import numpy as np
from tensorflow.keras.preprocessing.sequence import pad_sequences
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Custom LSTM class to handle legacy parameters
class CompatibleLSTM(LSTM):
    def __init__(self, *args, **kwargs):
        # Remove unsupported 'time_major' argument
        kwargs.pop('time_major', None)
        super().__init__(*args, **kwargs)

def masked_categorical_crossentropy(y_true, y_pred):
    loss = tf.keras.losses.categorical_crossentropy(y_true, y_pred)
    mask = tf.cast(tf.not_equal(tf.argmax(y_true, axis=-1), 0), tf.float32)
    return tf.reduce_sum(loss * mask) / tf.maximum(tf.reduce_sum(mask), 1)

def masked_accuracy(y_true, y_pred):
    y_true_class = tf.argmax(y_true, axis=-1)
    y_pred_class = tf.argmax(y_pred, axis=-1)
    mask = tf.cast(tf.not_equal(y_true_class, 0), tf.float32)
    matches = tf.cast(tf.equal(y_true_class, y_pred_class), tf.float32) * mask
    return tf.reduce_sum(matches) / tf.maximum(tf.reduce_sum(mask), 1)

# Load model with custom compatibility layer
with CustomObjectScope({
    'LSTM': CompatibleLSTM,
    'masked_accuracy': masked_accuracy,
    'masked_categorical_crossentropy': masked_categorical_crossentropy
}):
    model = load_model("best_model_kernel_5.h5")

print(f"Model input shape: {model.input_shape}")  # Verify (None, 512)

# Rest of the code remains unchanged...
ss_rev_dict = {1: 'C', 2: 'H', 3: 'E'}
aa_dict = {aa: idx for idx, aa in enumerate('ACDEFGHIKLMNPQRSTVWY', 1)}

def encode_sequence(seq, mapping):
    return [mapping.get(char, 0) for char in seq]

def decode_prediction(predictions):
    return ''.join([ss_rev_dict.get(np.argmax(pred), '-') for pred in predictions])

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    sequence = data.get('sequence', '')
    
    if len(sequence) > 512:
        return jsonify({'error': 'Sequence exceeds 512 characters'}), 400
    
    encoded = encode_sequence(sequence, aa_dict)
    padded = pad_sequences([encoded], maxlen=model.input_shape[1], padding='post')
    
    pred = model.predict(padded)
    decoded = decode_prediction(pred[0][:len(sequence)])
    
    return jsonify({'sequence': sequence, 'predicted_ss': decoded})

if __name__ == '__main__':
    app.run(port=5000)