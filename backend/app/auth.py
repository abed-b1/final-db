from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash,check_password_hash
from .models import db, User
import random
import string
from flask_mail import Mail, Message

auth_bp = Blueprint('auth', __name__)
from app import app  # Import your app instance
mail = Mail(app)


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    # Check for required fields
    if not data.get('name') or not data.get('email') or not data.get('password'):
        return jsonify({"error": "All fields are required"}), 400

    # Check if email already exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email already registered"}), 400

    # Create a new user
    hashed_password = generate_password_hash(data['password'], method='scrypt')

    new_user = User(name=data['name'], email=data['email'], password=hashed_password)

    try:      
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User registered successfully!"}), 201
    except Exception as e:
        return jsonify({"error": "Failed to register user", "message": str(e)}), 500
    

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        # Parse JSON data from the request
        data = request.get_json()

        # Validate request data
        if not data or 'email' not in data or 'password' not in data:
            return jsonify({"error": "Email and password are required"}), 400

        # Check if the user exists
        user = User.query.filter_by(email=data['email']).first()
        if not user:
            return jsonify({"error": "Invalid credentials"}), 401

        # Verify the password
        if check_password_hash(user.password, data['password']):
            return jsonify({"message": "Login successful"}), 200

        return jsonify({"error": "Invalid credentials"}), 401

    except Exception as e:
        return jsonify({"error": "An error occurred", "message": str(e)}), 500    
    


# @auth_bp.route('/forgot-password', methods=['POST'])
# def forgot_password():
#     try:
#         # Parse the request data
#         data = request.get_json()
#         email = data.get('email')

#         # Validate email
#         if not email:
#             return jsonify({"error": "Email is required"}), 400

#         # Check if the user exists
#         user = User.query.filter_by(email=email).first()
#         if not user:
#             return jsonify({"error": "No account associated with this email"}), 404

#         # Generate a temporary password (or reset token if using a more advanced system)
#         temp_password = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
#         hashed_password = generate_password_hash(temp_password, method='pbkdf2:sha256')

#         # Update the user's password in the database
#         user.password = hashed_password
#         db.session.commit()

#         # Mock email sending (you can integrate an email service like SendGrid, SMTP, etc.)
#         print(f"Temporary password for {email}: {temp_password}")

#         return jsonify({"message": "A temporary password has been sent to your email"}), 200

#     except Exception as e:
#         return jsonify({"error": "An error occurred", "message": str(e)}), 500


@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({"error": "Email is required"}), 400

    # Check if user exists
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "Email not registered"}), 404

    # Create a mock reset link
    reset_link = f"http://localhost:3000/reset-password?email={email}"

    # Send email
    try:
        msg = Message(
            "Password Reset Request",
            sender="no-reply@imdbclone.com",
            recipients=[email],
        )
        msg.body = f"Click the following link to reset your password: {reset_link}"
        mail.send(msg)
        return jsonify({"message": "Reset link sent to your email!"}), 200
    except Exception as e:
        return jsonify({"error": "Failed to send email", "message": str(e)}), 500
