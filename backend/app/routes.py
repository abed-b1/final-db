from flask import Blueprint, jsonify, request
from .models import db, Movie, Genre, Person, MovieGenre, MoviePerson, Series, Episode

# Create the blueprint
main_bp = Blueprint('main', __name__)

# -------------------- Home Route --------------------
@main_bp.route('/', methods=['GET'])
def home():
    """Welcome route for the IMDb Clone API."""
    return jsonify({"message": "Welcome to the IMDb Clone API!"}), 200

# -------------------- Movies Routes --------------------
@main_bp.route('/movies', methods=['GET'])
def get_movies():
    """Get all movies."""
    try:
        movies = Movie.query.all()
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
        return jsonify({"error": "Failed to fetch movies", "message": str(e)}), 500

@main_bp.route('/movies/<int:movie_id>', methods=['GET'])
def get_movie(movie_id):
    """Get a single movie by ID."""
    try:
        movie = Movie.query.get(movie_id)
        if not movie:
            return jsonify({"error": "Movie not found"}), 404

        genres = [{"id": genre.id, "name": genre.name} for genre in movie.genres]
        people = [{"id": mp.person.id, "name": mp.person.name, "role": mp.role} for mp in movie.movie_people]

        return jsonify({
            "id": movie.id,
            "title": movie.title,
            "year": movie.year,
            "length": movie.length,
            "rating": movie.rating,
            "votes": movie.votes,
            "is_adult": movie.is_adult,
            "genres": genres,
            "people": people
        }), 200
    except Exception as e:
        return jsonify({"error": "Failed to fetch movie", "message": str(e)}), 500

@main_bp.route('/movies', methods=['POST'])
def add_movie():
    """Add a new movie."""
    try:
        data = request.json
        required_fields = ['title', 'year']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400

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
        return jsonify({"message": "Movie added successfully!", "movie_id": new_movie.id}), 201
    except Exception as e:
        return jsonify({"error": "Failed to add movie", "message": str(e)}), 500

@main_bp.route('/movies/<int:movie_id>', methods=['DELETE'])
def delete_movie(movie_id):
    """Delete a movie by ID."""
    try:
        movie = Movie.query.get(movie_id)
        if not movie:
            return jsonify({"error": "Movie not found"}), 404
        db.session.delete(movie)
        db.session.commit()
        return jsonify({"message": "Movie deleted successfully!"}), 200
    except Exception as e:
        return jsonify({"error": "Failed to delete movie", "message": str(e)}), 500

# -------------------- Genres Routes --------------------
@main_bp.route('/genres', methods=['GET'])
def get_genres():
    """Get all genres."""
    try:
        genres = Genre.query.all()
        return jsonify([{"id": genre.id, "name": genre.name} for genre in genres]), 200
    except Exception as e:
        return jsonify({"error": "Failed to fetch genres", "message": str(e)}), 500

@main_bp.route('/genres', methods=['POST'])
def add_genre():
    """Add a new genre."""
    try:
        data = request.json
        if 'name' not in data:
            return jsonify({"error": "Missing required field: name"}), 400

        new_genre = Genre(name=data['name'])
        db.session.add(new_genre)
        db.session.commit()
        return jsonify({"message": "Genre added successfully!", "genre_id": new_genre.id}), 201
    except Exception as e:
        return jsonify({"error": "Failed to add genre", "message": str(e)}), 500

# -------------------- People Routes --------------------
@main_bp.route('/people/<int:person_id>', methods=['GET'])
def get_person(person_id):
    """Get details of a person by ID."""
    try:
        person = Person.query.get(person_id)
        if not person:
            return jsonify({"error": "Person not found"}), 404

        return jsonify({
            "id": person.id,
            "name": person.name,
            "birth_year": person.birth_year,
            "death_year": person.death_year,
            "role": person.role
        }), 200
    except Exception as e:
        return jsonify({"error": "Failed to fetch person", "message": str(e)}), 500

@main_bp.route('/people', methods=['GET'])
def get_people():
    """Get a list of all people."""
    try:
        all_people = Person.query.all()
        return jsonify([{
            "id": person.id,
            "name": person.name,
            "birth_year": person.birth_year,
            "death_year": person.death_year,
            "role": person.role
        } for person in all_people]), 200
    except Exception as e:
        return jsonify({"error": "Failed to fetch people", "message": str(e)}), 500

# -------------------- Series Routes --------------------
@main_bp.route('/series', methods=['GET'])
def get_series():
    """Get all series."""
    try:
        all_series = Series.query.all()
        return jsonify([{
            "id": series.id,
            "title": series.title,
            "start_year": series.start_year,
            "end_year": series.end_year,
            "rating": series.rating,
            "votes": series.votes,
            "description": series.description,
            "image_url": series.image_url
        } for series in all_series]), 200
    except Exception as e:
        return jsonify({"error": "Failed to fetch series", "message": str(e)}), 500

# -------------------- Search Functionality --------------------
@main_bp.route('/search', methods=['GET'])
def search():
    """Search for movies, series, or people."""
    try:
        query = request.args.get('query', '')
        if not query:
            return jsonify({"error": "Query parameter is required"}), 400

        # Search movies, series, and people by title or name
        movies = Movie.query.filter(Movie.title.ilike(f"%{query}%")).all()
        series = Series.query.filter(Series.title.ilike(f"%{query}%")).all()
        people = Person.query.filter(Person.name.ilike(f"%{query}%")).all()

        return jsonify({
            "movies": [{"id": m.id, "title": m.title} for m in movies],
            "series": [{"id": s.id, "title": s.title} for s in series],
            "people": [{"id": p.id, "name": p.name} for p in people]
        }), 200
    except Exception as e:
        return jsonify({"error": "Failed to perform search", "message": str(e)}), 500
