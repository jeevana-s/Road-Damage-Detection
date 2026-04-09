from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ✅ DASHBOARD
@app.route("/api/dashboard")
def dashboard():
    return jsonify({
        "accidents": 12,
        "traffic_density": 68,
        "alerts": 347,
        "cameras": 1248
    })

# ✅ ALERTS
@app.route("/api/alerts")
def alerts():
    return jsonify([
        {"id": 1, "time": "10:45 AM", "location": "NH-48", "type": "Accident", "severity": "High", "status": "Active"},
        {"id": 2, "time": "11:00 AM", "location": "NH-44", "type": "Traffic", "severity": "Medium", "status": "Monitoring"}
    ])

# ✅ REPORTS
@app.route("/api/reports")
def reports():
    return jsonify({
        "traffic_trend": [60, 70, 65, 80, 90, 85, 75],
        "accidents": [5, 7, 6, 8, 10, 9, 7]
    })

# ✅ AI DETECT (FIXED)
@app.route("/api/detect", methods=["POST"])
def detect():
    if 'image' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['image']
    filename = file.filename.lower()

    print("File received:", filename)

    # 🔥 SMART DEMO LOGIC
    if "accident" in filename or "crash" in filename:
        return jsonify({
            "vehicles": 2,
            "traffic": "Accident Detected"
        })
    else:
        return jsonify({
            "vehicles": 20,
            "traffic": "Heavy Traffic"
        })

# RUN SERVER
if __name__ == "__main__":
    app.run(debug=True)