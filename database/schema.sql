CREATE TABLE movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    year INTEGER NOT NULL,
    length INTEGER,
    rating REAL,
    votes INTEGER,
    is_adult BOOLEAN DEFAULT 0
);
