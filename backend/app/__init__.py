import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_mail import Mail

db = SQLAlchemy()
mail = Mail()

def create_app():
    app = Flask(__name__)

    # Set the database URI
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(
        os.path.abspath(os.path.dirname(__file__)), 'imdb.db'
    )
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Configure Flask-Mail
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')  # Use environment variables
    app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
    app.config['MAIL_DEFAULT_SENDER'] = 'no-reply@imdbclone.com'

    # Initialize SQLAlchemy and Mail
    db.init_app(app)
    mail.init_app(app)

    # Configure CORS to allow requests from the frontend
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

    # Register the auth blueprint for user authentication
    from .auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/auth')

    # Register the main blueprint for other routes
    from .routes import main_bp
    app.register_blueprint(main_bp)

    # Create all database tables if they do not exist
    with app.app_context():
        db.create_all()

    return app
