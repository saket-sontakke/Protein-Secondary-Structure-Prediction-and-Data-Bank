import os
import tensorflow as tf
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.layers import LSTM, GRU, Dense, Dropout, Conv1D, Embedding, Bidirectional
from tensorflow.keras.utils import CustomObjectScope, register_keras_serializable
from tensorflow.keras.preprocessing.sequence import pad_sequences
from flask_cors import CORS
import numpy as np

app = Flask(__name__)

# Get the allowed origin from ENV, or default to '*' (allow all) for safety
frontend_url = os.environ.get('FRONTEND_URL', '*')

CORS(app, resources={r"/*": {"origins": frontend_url}})

# -------------------------
#     FIX: KERAS 3 SUPPORT
# -------------------------

@register_keras_serializable()
class CompatibleLSTM(LSTM):
    def __init__(self, *args, **kwargs):
        kwargs.pop('time_major', None)
        super().__init__(*args, **kwargs)

    @classmethod
    def from_config(cls, config):
        config.pop('time_major', None)
        return super().from_config(config)


@register_keras_serializable()
class CompatibleGRU(GRU):
    def __init__(self, *args, **kwargs):
        kwargs.pop('time_major', None)
        super().__init__(*args, **kwargs)

    @classmethod
    def from_config(cls, config):
        config.pop('time_major', None)
        return super().from_config(config)


# Register standard layers so Keras 3 can find legacy configs
@register_keras_serializable()
class CompatibleDense(Dense): pass

@register_keras_serializable()
class CompatibleDropout(Dropout): pass

@register_keras_serializable()
class CompatibleConv1D(Conv1D): pass

@register_keras_serializable()
class CompatibleEmbedding(Embedding): pass

@register_keras_serializable()
class CompatibleBidirectional(Bidirectional): pass


# -------------------------
#     CUSTOM LOSS & METRICS
# -------------------------
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


# -------------------------
#     LOAD MODEL SAFELY
# -------------------------
with CustomObjectScope({
    'LSTM': CompatibleLSTM,
    'CompatibleLSTM': CompatibleLSTM,
    'GRU': CompatibleGRU,
    'CompatibleGRU': CompatibleGRU,
    'Dense': CompatibleDense,
    'Dropout': CompatibleDropout,
    'Conv1D': CompatibleConv1D,
    'Embedding': CompatibleEmbedding,
    'Bidirectional': CompatibleBidirectional,
    'masked_accuracy': masked_accuracy,
    'masked_categorical_crossentropy': masked_categorical_crossentropy
}):
    model = load_model("best_model_kernel_5.h5", compile=False)

print(f"\nModel Loaded Successfully!")
print(f"Input Shape: {model.input_shape}\n")


# -------------------------
#     ENCODING + DECODING
# -------------------------
ss_rev_dict = {1: 'C', 2: 'H', 3: 'E'}
aa_dict = {aa: idx for idx, aa in enumerate('ACDEFGHIKLMNPQRSTVWY', 1)}

def encode_sequence(seq, mapping):
    return [mapping.get(char, 0) for char in seq]

def decode_prediction(predictions):
    return ''.join([ss_rev_dict.get(np.argmax(pred), '-') for pred in predictions])


# -------------------------
#       HEALTH CHECK
# -------------------------
@app.route('/', methods=['GET'])
def health_check():
    return jsonify({'status': 'Model is ready!', 'model_input': str(model.input_shape)}), 200


# -------------------------
#       API ENDPOINT
# -------------------------
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    sequence = data.get('sequence', '')

    if not sequence:
        return jsonify({'error': 'No sequence provided'}), 400
    
    if len(sequence) > 512:
        return jsonify({'error': 'Sequence exceeds 512 characters'}), 400

    encoded = encode_sequence(sequence, aa_dict)
    padded = pad_sequences([encoded], maxlen=model.input_shape[1], padding='post')

    pred = model.predict(padded)
    decoded = decode_prediction(pred[0][:len(sequence)])

    return jsonify({
        'sequence': sequence,
        'predicted_ss': decoded
    })


# -------------------------
#       RUN SERVER
# -------------------------
if __name__ == '__main__':
    # Use the PORT environment variable if available, otherwise default to 5000
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
