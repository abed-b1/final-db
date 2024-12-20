from . import db

class Movie(db.Model):
    __tablename__ = 'movies'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    length = db.Column(db.Integer)
    rating = db.Column(db.Float)
    votes = db.Column(db.Integer)
    is_adult = db.Column(db.Boolean, default=False)

class Person(db.Model):
    __tablename__ = 'people'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    birth_year = db.Column(db.Integer)
    death_year = db.Column(db.Integer)

class Genre(db.Model):
    __tablename__ = 'genres'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)

class MovieGenre(db.Model):
    __tablename__ = 'movie_genres'
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'), primary_key=True)
    genre_id = db.Column(db.Integer, db.ForeignKey('genres.id'), primary_key=True)
