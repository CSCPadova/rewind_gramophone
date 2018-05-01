<?php
if(class_exists( 'ConstantVDS') != true){
		include 'constantsContainer.php';
	}	
if(class_exists( 'Playlist') != true){
		include 'playlist.php';
	}	
if(class_exists( 'StaticTools') != true){
		include 'staticTools.php';
	}
	
class Player{
	public function __construct($index, Playlist $p){
		
		$playlist = $p;
		// db connection
		$conn = mysql_connect(ConstantVDS::VDS_DB_URL, ConstantVDS::VDS_DB_USER, ConstantVDS::VDS_DB_PSW);
		if(! $conn){
			echo "Errore di connessione al server";
			exit();
		}
		
		// db selection
		mysql_selectdb(ConstantVDS::VDS_DB_NAME);
		
		// query
		$file_id = $p->getCurrentByIndex($index);
		
		$d_query = "select * from vds_file where id_content = $file_id";
		
		$results = mysql_query($d_query);
		
		$r_result = mysql_fetch_array($results);
		if(!$r_result){
			echo "Nessun risultato";
		}
		
		$filename = StaticTools::removeExtension($r_result['path_c']);
		$link = $r_result['path_c'];
		
		echo "<div  >Autore:  ".$r_result['autore']."</div>";
		echo "<div >Titolo:  ".$r_result['titolo']."</div>";
		echo "<div >Anno:    ".$r_result['anno']."</div><br>";
?>
	
	<div class="info-box">
		<audio controls preload="none">
			<source src = "<?php echo ConstantVDS::VDS_PRE_PATH.$r_result['path_c']; ?>" type="audio/mpeg"></source>
			<source src = "<?php echo ConstantVDS::VDS_PRE_PATH.$filename.".ogg"; ?>" type="audio/ogg"> 
				Il formato audio non e' supportato dal tuo browser</source>
		</audio>
	</div>
	
<?php 	
	}
}
