import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


db = SQLAlchemy()


def create_app():
    app = Flask(__name__)

    # Set the database URI
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(
        os.path.abspath(os.path.dirname(__file__)), 'imdb.db'
    )
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    # Configure CORS to allow requests from the frontend
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

   
    # Register the main blueprint for other routes
    from .routes import main_bp
    app.register_blueprint(main_bp)

    # Create all database tables if they do not exist
    with app.app_context():
        db.create_all()

    return app
