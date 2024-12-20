from flask import Blueprint, jsonify, request
from .models import Movie, db

# Create the blueprint
main_bp = Blueprint('main', __name__)

# Home route
@main_bp.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Welcome to the IMDb Clone API!"}), 200

# Get all movies
@main_bp.route('/movies', methods=['GET'])
def get_movies():
    try:
        # Query all movies
        movies = Movie.query.all()
        print("Movies fetched:", movies)  # Add this debug log

        # Return the movies as JSON
        return jsonify([{
            "id": movie.id,
            "title": movie.title,
            "year": movie.year,
            "length": movie.length,
            "rating": movie.rating,
            "votes": movie.votes,
            "is_adult": movie.is_adult
        } for movie in movies]), 200
    except Exception as e:
        print("Error in /movies endpoint:", str(e))  # Add this debug log
        return jsonify({"error": "Failed to fetch movies", "message": str(e)}), 500

# Get a single movie by ID
@main_bp.route('/movies/<int:movie_id>', methods=['GET'])
def get_movie(movie_id):
    try:
        # Query a single movie by ID
        movie = Movie.query.get(movie_id)
        if movie is None:
            return jsonify({"error": "Movie not found"}), 404
        return jsonify({
            "id": movie.id,
            "title": movie.title,
            "year": movie.year,
            "length": movie.length,
            "rating": movie.rating,
            "votes": movie.votes,
            "is_adult": movie.is_adult
        }), 200
    except Exception as e:
        return jsonify({"error": "Failed to fetch movie", "message": str(e)}), 500

# Add a new movie
@main_bp.route('/movies', methods=['POST'])
def add_movie():
    try:
        # Get data from the request body
        data = request.json
        new_movie = Movie(
            title=data['title'],
            year=data['year'],
            length=data.get('length'),
            rating=data.get('rating'),
            votes=data.get('votes'),
            is_adult=data.get('is_adult', False)
        )
        db.session.add(new_movie)
        db.session.commit()
        return jsonify({"message": "Movie added successfully!"}), 201
    except Exception as e:
        return jsonify({"error": "Failed to add movie", "message": str(e)}), 500

# Delete a movie by ID
@main_bp.route('/movies/<int:movie_id>', methods=['DELETE'])
def delete_movie(movie_id):
    try:
        # Query the movie to delete
        movie = Movie.query.get(movie_id)
        if movie is None:
            return jsonify({"error": "Movie not found"}), 404
        db.session.delete(movie)
        db.session.commit()
        return jsonify({"message": "Movie deleted successfully!"}), 200
    except Exception as e:
        return jsonify({"error": "Failed to delete movie", "message": str(e)}), 500
