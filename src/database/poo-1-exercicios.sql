-- Active: 1675103104083@@127.0.0.1@3306
CREATE TABLE videos (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    titulo TEXT NOT NULL,
    duracao INTEGER NOT NULL,
    data_update TEXT DEFAULT (DATETIME()) NOT NULL
);

INSERT INTO videos (id, titulo, duracao, data_update)
VALUES ("v0001", "video01", 120, "2023-01-30 15-25-23");

SELECT * FROM videos;