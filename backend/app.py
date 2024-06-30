from flask import Flask, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import psycopg2
import random
import threading
import time

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize SocketIO with CORS allowed
socketio = SocketIO(app, cors_allowed_origins="*")

# Database connection
conn = psycopg2.connect(
    dbname="ambulance",
    user="postgres",
    password="admin",
    host="localhost"
)
cursor = conn.cursor()

def generate_coordinates():
    latitude = random.uniform(-90, 90)
    longitude = random.uniform(-180, 180)
    return {'latitude': latitude, 'longitude': longitude}

def save_to_db(coordinates):
    cursor.execute("INSERT INTO coordinates (latitude, longitude) VALUES (%s, %s)",
                   (coordinates['latitude'], coordinates['longitude']))
    conn.commit()

def emit_coordinates():
    while True:
        coordinates = generate_coordinates()
        save_to_db(coordinates)
        socketio.emit('new_coordinates', coordinates)
        print(f"Emitted: {coordinates}")
        time.sleep(5)

@app.route('/api/coordinates', methods=['GET'])
def get_latest_coordinates():
    cursor.execute("SELECT latitude, longitude FROM coordinates ORDER BY timestamp DESC limit 1")
    result = cursor.fetchone()
    return jsonify({'latitude': result[0], 'longitude': result[1]})

if __name__ == '__main__':
    threading.Thread(target=emit_coordinates).start()
    socketio.run(app, debug=True, port=5000)
