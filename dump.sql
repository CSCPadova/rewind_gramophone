-- --------------------------------------------------------
--
-- Struttura della tabella `phi_gram`
--
CREATE TABLE 'phi_gram' (
  'id_vinyl' INTEGER  PRIMARY KEY AUTOINCREMENT,
  'path_vinyl' varchar(50) NOT NULL,
  'titolo' varchar(50) NOT NULL,
  'artista' varchar(50) NOT NULL,
  'data' year(4) NOT NULL,
  'grammofono' varchar(50) NOT NULL,
  'velocita' float NOT NULL,
  'dim_peso' varchar(50) NOT NULL,
  'puntina' varchar(50) NOT NULL,
  'equalizzazione' varchar(10) NOT NULL,
  'tipo_copia' varchar(20) NOT NULL
);
--
-- Dump dei dati per la tabella `phi_gram`
--
INSERT INTO 'phi_gram' ('path_vinyl', 'titolo', 'artista', 'data', 'grammofono', 'velocita', 'dim_peso', 'puntina', 'equalizzazione', 'tipo_copia') VALUES
('db/audio/gram/1.wav', 'Nofrio e la finta americana', 'Giovanni De Rosalia', 1919, 'giradischi', 76.6, '3.5 mil - 4 g', 'Tronco - ellittica', 'flat', 'copia conservativa'),
('db/audio/gram/2.flac', 'Chi campa deritto campa aflitto', 'Eduardo Migliaccio', 1928, 'giradischi', 78.26, '3.5 mil - 4 g', 'Tronco - ellittica', 'flat', 'copia conservativa'),
('db/audio/gram/3.wav', 'Fronne \\''e limone', 'Pasquale Abete', 1921, 'giradischi', 80, '3.5 mil - 4 g', 'Tronco - ellittica', 'flat', 'copia conservativa'),
('db/audio/gram/4.flac', 'Povero \\''nnucente', 'Michele Scialpi', 1921, 'giradischi', 80, '3.5 mil - 4 g', 'Tronco - ellittica', 'flat', 'copia conservativa');
-- --------------------------------------------------------