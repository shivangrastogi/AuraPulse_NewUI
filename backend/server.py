from flask import Flask, jsonify, request
from flask_cors import CORS
import cv2
from keras.models import model_from_json
import numpy as np
import base64
import os  # For file operations

app = Flask(__name__)
CORS(app)  # Allows requests from React

# Load the model architecture and weights
json_file = open("emotiondetector.json", "r")
model_json = json_file.read()
json_file.close()
model = model_from_json(model_json)
model.load_weights("emotiondetector.h5")

# Load Haar Cascade for face detection
haar_file = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
face_cascade = cv2.CascadeClassifier(haar_file)

# Emotion labels
labels = {0: 'angry', 1: 'disgust', 2: 'fear', 3: 'happy', 4: 'neutral', 5: 'sad', 6: 'surprise'}

# Songs folder paths



# song_paths = {
#     "happy": "../Aurapulse-p1/songs/angry",
#     # Add paths for other moods as needed
# }

# Function to preprocess input image
def extract_features(image):
    feature = np.array(image)
    feature = feature.reshape(1, 48, 48, 1)
    return feature / 255.0

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello from Flask!", "items": ["Item1", "Item2", "Item3"]})

@app.route('/api/recognize', methods=['POST'])
def recognize_emotion():
    try:
        # Read image from request
        data = request.json
        image_data = base64.b64decode(data['image'])

        # Convert image to OpenCV format
        nparr = np.frombuffer(image_data, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Convert to grayscale for prediction
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)

        predictions = []
        for (x, y, w, h) in faces:
            face_image = gray[y:y+h, x:x+w]
            face_image = cv2.resize(face_image, (48, 48))
            img = extract_features(face_image)
            pred = model.predict(img)
            prediction_label = labels[pred.argmax()]
            predictions.append(prediction_label)

        if predictions:
            mood = predictions[0]
            # Get the list of songs for the detected mood
            song_list = get_songs_for_mood(mood)
            return jsonify({"mood": mood, "songs": song_list})
        else:
            return jsonify({"mood": "No face detected", "songs": []})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to process image"})

@app.route('/api/songs/<mood>', methods=['GET'])
def get_songs_by_mood(mood):
    # Return the list of songs for a given mood
    song_list = get_songs_for_mood(mood)
    return jsonify({"mood": mood, "songs": song_list})

def get_songs_for_mood(mood):
    """
    Fetches the list of songs for a specific mood from the corresponding directory.
    """
    song_list = []
    try:
        # Get the folder path for the mood
        folder_path = song_paths.get(mood, "")
        if folder_path and os.path.exists(folder_path):
            # List all files in the directory
            for file in os.listdir(folder_path):
                if file.endswith((".mp3", ".wav")):  # Filter only audio files
                    song_list.append({"name": file, "path": os.path.join(folder_path, file)})
        else:
            print(f"No directory found for mood: {mood}")
    except Exception as e:
        print(f"Error fetching songs for mood {mood}: {e}")
    return song_list

if __name__ == '__main__':
    app.run(debug=True, port=5000)



# from flask import Flask, jsonify, request
# from flask_cors import CORS
# import cv2
# from keras.models import model_from_json
# import numpy as np
# import base64

# app = Flask(__name__)
# CORS(app)  # Allows requests from React

# # Load the model architecture and weights
# json_file = open("emotiondetector.json", "r")
# model_json = json_file.read()
# json_file.close()
# model = model_from_json(model_json)
# model.load_weights("emotiondetector.h5")

# # Load Haar Cascade for face detection
# haar_file = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
# face_cascade = cv2.CascadeClassifier(haar_file)

# # Emotion labels
# labels = {0: 'angry', 1: 'disgust', 2: 'fear', 3: 'happy', 4: 'neutral', 5: 'sad', 6: 'surprise'}

# # Function to preprocess input image
# def extract_features(image):
#     feature = np.array(image)
#     feature = feature.reshape(1, 48, 48, 1)
#     return feature / 255.0

# @app.route('/api/data', methods=['GET'])
# def get_data():
#     return jsonify({"message": "Hello from Flask!", "items": ["Item1", "Item2", "Item3"]})

# @app.route('/api/recognize', methods=['POST'])
# def recognize_emotion():
#     try:
#         # Read image from request
#         data = request.json
#         image_data = base64.b64decode(data['image'])

#         # Convert image to OpenCV format
#         nparr = np.frombuffer(image_data, np.uint8)
#         image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)


#         # Convert to grayscale for prediction
#         gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
#         faces = face_cascade.detectMultiScale(gray, 1.3, 5)

#         predictions = []
#         for (x, y, w, h) in faces:
#             face_image = gray[y:y+h, x:x+w]
#             face_image = cv2.resize(face_image, (48, 48))
#             img = extract_features(face_image)
#             pred = model.predict(img)
#             prediction_label = labels[pred.argmax()]
#             predictions.append(prediction_label)

#         if predictio ns:
#             return jsonify({"mood": predictions[0]})
#         else:
#             return jsonify({"mood": "No face detected"})

#     except Exception as e:
#         print(f"Error: {e}")
#         return jsonify({"error": "Failed to process image"})

# if __name__ == '__main__':
#     app.run(debug=True, port=5000)
