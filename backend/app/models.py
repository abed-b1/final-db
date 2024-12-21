from . import db

# Movie Model
class Movie(db.Model):
    __tablename__ = 'movies'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    length = db.Column(db.Integer)
    rating = db.Column(db.Float)
    votes = db.Column(db.Integer)
    is_adult = db.Column(db.Boolean, default=False)
    genres = db.relationship('Genre', secondary='movie_genres', backref='movies')
    people = db.relationship('Person', secondary='movie_people', backref='movies')


# Genre Model
class Genre(db.Model):
    __tablename__ = 'genres'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)


# Movie and Genre Relationship
class MovieGenre(db.Model):
    __tablename__ = 'movie_genres'
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'), primary_key=True)
    genre_id = db.Column(db.Integer, db.ForeignKey('genres.id'), primary_key=True)


# Person Model (Actor, Director, Writer)
# Person Model (Actor, Director, Writer)
class Person(db.Model):
    __tablename__ = 'people'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    birth_year = db.Column(db.Integer)
    death_year = db.Column(db.Integer)
    role = db.Column(db.String(50), nullable=True)  # Optional field to specify role in the database
    


# Movie-Person Association Table
class MoviePerson(db.Model):
    __tablename__ = 'movie_people'
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'), primary_key=True)
    person_id = db.Column(db.Integer, db.ForeignKey('people.id'), primary_key=True)
    role = db.Column(db.String(50), nullable=False)
    person = db.relationship('Person', backref='movie_roles')  # Corrected relationship to Person



class Series(db.Model):
    __tablename__ = 'series'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    start_year = db.Column(db.Integer)
    end_year = db.Column(db.Integer, nullable=True)
    rating = db.Column(db.Float)
    votes = db.Column(db.Integer)
    description = db.Column(db.Text)  # Make sure this column exists
    image_url = db.Column(db.String(255))  # Make sure this column exists


# Episode Model
class Episode(db.Model):
    __tablename__ = 'episodes'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    season = db.Column(db.Integer, nullable=False)
    episode_number = db.Column(db.Integer, nullable=False)
    series_id = db.Column(db.Integer, db.ForeignKey('series.id'))
    length = db.Column(db.Integer)
    rating = db.Column(db.Float)
    votes = db.Column(db.Integer)


# User Ratings Model
class UserRating(db.Model):
    __tablename__ = 'user_ratings'
    id = db.Column(db.Integer, primary_key=True)
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'), nullable=True)
    series_id = db.Column(db.Integer, db.ForeignKey('series.id'), nullable=True)
    user_id = db.Column(db.Integer, nullable=False)
    rating = db.Column(db.Float, nullable=False)
