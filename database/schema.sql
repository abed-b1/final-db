from flask import Blueprint, jsonify, request
from .models import db, Movie, Genre, Person, MovieGenre, MoviePerson, Series, Episode

# Create the blueprint
main_bp = Blueprint('main', __name__)

# Home route
@main_bp.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Welcome to the IMDb Clone API!"}), 200


# -------------------- Movies Routes --------------------

# Get all movies
@main_bp.route('/movies', methods=['GET'])
def get_movies():
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


# Get a single movie by ID
@main_bp.route('/movies/<int:movie_id>', methods=['GET'])
def get_movie(movie_id):
    try:
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
        movie = Movie.query.get(movie_id)
        if movie is None:
            return jsonify({"error": "Movie not found"}), 404
        db.session.delete(movie)
        db.session.commit()
        return jsonify({"message": "Movie deleted successfully!"}), 200
    except Exception as e:
        return jsonify({"error": "Failed to delete movie", "message": str(e)}), 500


# -------------------- Genres Routes --------------------

# Get all genres
@main_bp.route('/genres', methods=['GET'])
def get_genres():
    try:
        genres = Genre.query.all()
        return jsonify([{"id": genre.id, "name": genre.name} for genre in genres]), 200
    except Exception as e:
        return jsonify({"error": "Failed to fetch genres", "message": str(e)}), 500


# Add a new genre
@main_bp.route('/genres', methods=['POST'])
def add_genre():
    try:
        data = request.json
        new_genre = Genre(name=data['name'])
        db.session.add(new_genre)
        db.session.commit()
        return jsonify({"message": "Genre added successfully!"}), 201
    except Exception as e:
        return jsonify({"error": "Failed to add genre", "message": str(e)}), 500


# Assign a genre to a movie
@main_bp.route('/movies/<int:movie_id>/genres', methods=['POST'])
def assign_genre_to_movie(movie_id):
    try:
        data = request.json
        genre_id = data['genre_id']
        movie = Movie.query.get(movie_id)
        genre = Genre.query.get(genre_id)
        
        if not movie or not genre:
            return jsonify({"error": "Movie or Genre not found"}), 404

        movie.genres.append(genre)
        db.session.commit()
        return jsonify({"message": "Genre assigned to movie successfully!"}), 200
    except Exception as e:
        return jsonify({"error": "Failed to assign genre", "message": str(e)}), 500


# -------------------- People Routes --------------------

# Get all people
@main_bp.route('/people', methods=['GET'])
def get_people():
    try:
        people = Person.query.all()
        return jsonify([{
            "id": person.id,
            "name": person.name,
            "birth_year": person.birth_year,
            "death_year": person.death_year
        } for person in people]), 200
    except Exception as e:
        return jsonify({"error": "Failed to fetch people", "message": str(e)}), 500


# Add a new person
@main_bp.route('/people', methods=['POST'])
def add_person():
    try:
        data = request.json
        new_person = Person(
            name=data['name'],
            birth_year=data.get('birth_year'),
            death_year=data.get('death_year')
        )
        db.session.add(new_person)
        db.session.commit()
        return jsonify({"message": "Person added successfully!"}), 201
    except Exception as e:
        return jsonify({"error": "Failed to add person", "message": str(e)}), 500


# -------------------- Series and Episodes Routes --------------------

# Get all series
@main_bp.route('/series', methods=['GET'])
def get_series():
    try:
        series_list = Series.query.all()
        return jsonify([{
            "id": series.id,
            "title": series.title,
            "start_year": series.start_year,
            "end_year": series.end_year,
            "rating": series.rating,
            "votes": series.votes
        } for series in series_list]), 200
    except Exception as e:
        return jsonify({"error": "Failed to fetch series", "message": str(e)}), 500


# Add a new series
@main_bp.route('/series', methods=['POST'])
def add_series():
    try:
        data = request.json
        new_series = Series(
            title=data['title'],
            start_year=data['start_year'],
            end_year=data.get('end_year'),
            rating=data.get('rating'),
            votes=data.get('votes')
        )
        db.session.add(new_series)
        db.session.commit()
        return jsonify({"message": "Series added successfully!"}), 201
    except Exception as e:
        return jsonify({"error": "Failed to add series", "message": str(e)}), 500


# Get episodes of a series
@main_bp.route('/series/<int:series_id>/episodes', methods=['GET'])
def get_episodes(series_id):
    try:
        episodes = Episode.query.filter_by(series_id=series_id).all()
        return jsonify([{
            "id": episode.id,
            "title": episode.title,
            "season": episode.season,
            "episode_number": episode.episode_number,
            "length": episode.length,
            "rating": episode.rating,
            "votes": episode.votes
        } for episode in episodes]), 200
    except Exception as e:
        return jsonify({"error": "Failed to fetch episodes", "message": str(e)}), 500


# -------------------- Search Functionality --------------------

# Search for movies, series, or people
@main_bp.route('/search', methods=['GET'])
def search():
    try:
        query = request.args.get('query', '')
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


# -------------------- Debugging --------------------

# Debug route to show the database path
@main_bp.route('/db-path', methods=['GET'])
def db_path():
    return jsonify({"database_path": db.engine.url})
