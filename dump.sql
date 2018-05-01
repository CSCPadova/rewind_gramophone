-- --------------------------------------------------------
--
-- Struttura della tabella `phi_gram`
--
CREATE TABLE `phi_gram` (
  `id_vinyl` int(10) UNSIGNED NOT NULL,
  `path_vinyl` varchar(50) NOT NULL,
  `titolo` varchar(50) NOT NULL,
  `artista` varchar(50) NOT NULL,
  `data` year(4) NOT NULL,
  `grammofono` varchar(50) NOT NULL,
  `velocita` float NOT NULL,
  `dim_peso` varchar(50) NOT NULL,
  `puntina` varchar(50) NOT NULL,
  `equalizzazione` varchar(10) NOT NULL,
  `tipo_copia` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
--
-- Dump dei dati per la tabella `phi_gram`
--
INSERT INTO `phi_gram` (`id_vinyl`, `path_vinyl`, `titolo`, `artista`, `data`, `grammofono`, `velocita`, `dim_peso`, `puntina`, `equalizzazione`, `tipo_copia`) VALUES
(1, 'db/audio/gram/1', 'Nofrio e la finta americana', 'Giovanni De Rosalia', 1919, 'giradischi', 76.6, '3.5 mil - 4 g', 'Tronco - ellittica', 'flat', 'copia conservativa'),
(2, 'db/audio/gram/3', 'Chi campa deritto campa aflitto', 'Eduardo Migliaccio', 1928, 'giradischi', 78.26, '3.5 mil - 4 g', 'Tronco - ellittica', 'flat', 'copia conservativa'),
(3, 'db/audio/gram/4', 'Fronne \\''e limone', 'Pasquale Abete', 1921, 'giradischi', 80, '3.5 mil - 4 g', 'Tronco - ellittica', 'flat', 'copia conservativa'),
(4, 'db/audio/gram/5', 'Povero \\''nnucente', 'Michele Scialpi', 1921, 'giradischi', 80, '3.5 mil - 4 g', 'Tronco - ellittica', 'flat', 'copia conservativa'),
(5, 'db/audio/gram/12', 'Li fimmini cu lu lipstick', 'Leonardo Dia', 1929, 'giradischi', 78.26, '3.5 mil - 4 g', 'Tronco - ellittica', 'flat', 'copia conservativa'),
(6, 'db/audio/gram/16', 'Insegnatemi l\\''inglese', 'Leo Domar', 1928, 'giradischi', 78.26, '3.5 mil - 4 g', 'Tronco - ellittica', 'flat', 'copia conservativa'),
(7, 'db/audio/gram/21', 'Sta terra nun fa pi mia', 'Rosina Gioiosa Trubia', 1928, 'Grammofono', 78.26, ' - ', 'Soft Tone', ' - ', 'Lettura 1');
-- --------------------------------------------------------