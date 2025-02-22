-- Insert movies
INSERT INTO movies (title, year, length, rating, votes, is_adult)
VALUES 
    ('Inception', 2010, 148, 8.8, 2000000, 0),
    ('The Dark Knight', 2008, 152, 9.0, 2500000, 0);

-- Insert genres
INSERT INTO genres (name)
VALUES 
    ('Action'),
    ('Sci-Fi'),
    ('Drama'),
    ('Thriller');

-- Associate movies with genres
INSERT INTO movie_genres (movie_id, genre_id)
VALUES 
    (1, 2), -- Inception -> Sci-Fi
    (1, 4), -- Inception -> Thriller
    (2, 1), -- The Dark Knight -> Action
    (2, 4); -- The Dark Knight -> Thriller

-- Insert people (actors, directors, writers)
INSERT INTO people (name, birth_year, death_year)
VALUES 
    ('Christopher Nolan', 1970, NULL), -- Director and Writer
    ('Leonardo DiCaprio', 1974, NULL), -- Actor in Inception
    ('Christian Bale', 1974, NULL); -- Actor in The Dark Knight

-- Associate movies with people and their roles
INSERT INTO movie_people (movie_id, person_id, role)
VALUES 
    (1, 1, 'Director'), -- Christopher Nolan -> Director of Inception
    (1, 1, 'Writer'), -- Christopher Nolan -> Writer of Inception
    (1, 2, 'Actor'), -- Leonardo DiCaprio -> Actor in Inception
    (2, 1, 'Director'), -- Christopher Nolan -> Director of The Dark Knight
    (2, 3, 'Actor'); -- Christian Bale -> Actor in The Dark Knight

-- Insert series
INSERT INTO series (title, start_year, end_year, rating, votes)
VALUES 
    ('Breaking Bad', 2008, 2013, 9.5, 2000000),
    ('Stranger Things', 2016, NULL, 8.7, 1500000);

-- Insert episodes for Breaking Bad
INSERT INTO episodes (title, season, episode_number, series_id, length, rating, votes)
VALUES 
    ('Pilot', 1, 1, 1, 58, 9.0, 100000),
    ('Cat\'s in the Bag...', 1, 2, 1, 48, 8.7, 90000),
    ('...And the Bag\'s in the River', 1, 3, 1, 47, 8.8, 87000);

-- Insert episodes for Stranger Things
INSERT INTO episodes (title, season, episode_number, series_id, length, rating, votes)
VALUES 
    ('Chapter One: The Vanishing of Will Byers', 1, 1, 2, 47, 8.5, 140000),
    ('Chapter Two: The Weirdo on Maple Street', 1, 2, 2, 55, 8.6, 130000),
    ('Chapter Three: Holly, Jolly', 1, 3, 2, 51, 8.7, 125000);
