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
