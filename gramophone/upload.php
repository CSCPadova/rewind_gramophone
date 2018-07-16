
<?php	
	require_once('js/getid3/getid3.php');
	http_response_code(500);
	//request for upload a file on the server
	if(isset($_POST["request"])){
		if($_POST["request"]=="addFile"){
			echo($_POST["request"]);
			$target_dir = "db/audio/gram/";
			$target_file = $target_dir . basename($_FILES["newTrack"]["name"]);
			//echo $target_file;
			$uploadOk = 1;
			//echo $uploadOk;
			$audioFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
			//echo $audioFileType;

			// Check if file already exists
			if (file_exists($target_file)) {
				http_response_code(409);
				//echo "Sorry, file already exists.";
				$uploadOk = 0;
			}

			// Allow certain file formats
			if($audioFileType != "mp3" && $audioFileType != "flac" && $audioFileType != "wav") {
				//echo "Sorry, Only Mp3,flac and Wav files are allowed";
				echo $audioFileType;
				http_response_code(415);
				$uploadOk = 0;
			}
			
			// Check if $uploadOk is set to 0 by an error
			if ($uploadOk == 0) {
				echo "Your file was not uploaded.";
			// if everything is ok, try to upload file
			} else {
				if (move_uploaded_file($_FILES["newTrack"]["tmp_name"], $target_file)) {
					http_response_code(200);
					//check file duration
					$getID3 = new getID3;
					$ThisFileInfo = $getID3->analyze($target_file);
					$sec= $ThisFileInfo['playtime_seconds'];
					//if longer than 200 secondd, delete it and send error
					if ($sec>200){
						http_response_code(451);
						unlink($target_file);
					}
				} else {
					//echo "Sorry, there was an error uploading your file.";
				}
			}
			exit;
		}
		//request for deleting a file from the server
		if($_POST["request"]=="delFile"){
			if(isset($_POST["file"])){
				$file=$_POST["file"];
				$filePath="db/audio/gram/".$file;
				if (file_exists($filePath)){
					unlink($filePath);
					http_response_code(200);
				}
				else {
					echo ("nothing to delete");
					http_response_code(452);
				}
			}
			exit;
		}
		//request for deleting a file from the server
		if($_POST["request"]=="delRow"){
			if(isset($_POST["file"])&& isset($_POST["id"])){
				$id=$_POST["id"];
				$file=$_POST["file"];
				$filePath="db/audio/gram/".$file;
				if (file_exists($filePath)){
					unlink($filePath);
					http_response_code(200);
				}
				try{
						$db = new SQLite3('im.db');
						$sql='delete from phi_gram where id_vinyl='.$id;
						echo ($sql);
						$db->exec($sql);
						http_response_code(200);
				} 
				catch(PDOException $e) {
						http_response_code(453);
						echo $e->getMessage();
				}
			}
			exit;
		}
		
		if($_POST["request"]=="singleTrack"){
			//echo($_POST["request"]);
			$target_dir = "db/audio/gram/";
			$target_file = $target_dir . basename($_FILES["newTrack"]["name"]);
			//echo $target_file;
			$uploadOk = 1;
			//echo $uploadOk;
			$audioFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
			//echo $audioFileType;

			try{
				$db = new SQLite3('im.db');
				$title=$_POST["title"];
				$author=$_POST["author"];
				$year=$_POST["year"];
				$gramophone=$_POST["gramophone"];
				$speed=$_POST["speed"];
				$dim=$_POST["dim"];
				$puntina=$_POST["puntina"];
				$eq=$_POST["eq"];
				$type=$_POST["type"];	
				$title=str_replace("'", "\''", $title);
				$q="select * from phi_gram where path_vinyl='".$target_file."'";
				//echo ($q);
				$results = $db->query($q);
				$r_results = $results->fetchArray();
				$q="select * from phi_gram where titolo='".$title."' and artista='".$author."'";
				//echo ($q);
				$results2 = $db->query($q);
				$r_resultsb = $results2->fetchArray();
				//echo($r_resultsb[0]);
			} 
			catch(PDOException $e) {
				echo $e->getMessage();
			}
			
			if ($r_results) {
				http_response_code(401);
				$uploadOk = 0;
			}
			
			if ($r_resultsb) {
				http_response_code(501);
				$uploadOk = 0;
			}		
			
			// Check if file already exists
			if (file_exists($target_file)) {
				http_response_code(409);
				//echo "Sorry, file already exists.";
				$uploadOk = 0;
			}

			// Allow certain file formats
			if($audioFileType != "mp3" && $audioFileType != "flac" && $audioFileType != "wav") {
				//echo "Sorry, Only Mp3,flac and Wav files are allowed";
				echo $audioFileType;
				http_response_code(415);
				$uploadOk = 0;
			}
			
			// Check if $uploadOk is set to 0 by an error
			if ($uploadOk == 0) {
				echo "Your file was not uploaded.";
			// if everything is ok, try to upload file
			} else {
				if (move_uploaded_file($_FILES["newTrack"]["tmp_name"], $target_file)) {
					http_response_code(200);
					//check file duration
					$getID3 = new getID3;
					$ThisFileInfo = $getID3->analyze($target_file);
					$sec= $ThisFileInfo['playtime_seconds'];
					//if longer than 200 secondd, delete it and send error
					if ($sec>200){
						http_response_code(451);
						unlink($target_file);
					}
					else{
						
						try{
							
							$sql="INSERT INTO 'phi_gram' ('path_vinyl', 'titolo', 'artista', 'data', 'grammofono', 'velocita', 'dim_peso', 'puntina', 'equalizzazione', 'tipo_copia') VALUES ('".$target_file."', '".$title."', '".$author."', ".$year.", '".$gramophone."',".$speed.", '".$dim."', '".$puntina."', '".$eq."', '".$type."')";
							//echo ($sql);
							$db->exec($sql);
							
							$results = $db->query("select id_vinyl from phi_gram where path_vinyl='".$target_file."'");
							$r_results = $results->fetchArray();
							echo($r_results['id_vinyl']);
						} 
						catch(PDOException $e) {
							echo $e->getMessage();
						}
						
					}
				} else {
					//echo "Sorry, there was an error uploading your file.";
				}
			}
			exit;
		}
		if($_POST["request"]=="downloadjson"){
			try{
				$db = new SQLite3('im.db');
				$results = $db->query('select * from phi_gram');
				$tracks=array();

				while ($r_results = $results->fetchArray()) {
					$myObj=new stdClass();
					//$myObj->id_vinyl = $r_results['id_vinyl'];
					$myObj->path_vinyl = stripslashes (basename($r_results['path_vinyl']));
					$myObj->titolo = stripslashes ($r_results['titolo']);
					$myObj->artista = $r_results['artista'];
					$myObj->data = $r_results['data'];
					$myObj->grammofono = $r_results['grammofono'];
					$myObj->velocita = $r_results['velocita'];
					$myObj->dim_peso = $r_results['dim_peso'];
					$myObj->puntina = $r_results['puntina'];
					$myObj->equalizzazione = $r_results['equalizzazione'];
					$myObj->tipo_copia = $r_results['tipo_copia'];
					array_push($tracks,$myObj);	 
				}
					$myJSON = json_encode($tracks, JSON_UNESCAPED_SLASHES|JSON_PRETTY_PRINT);	
					$myfile = fopen("tracklist.json", "w");
					fwrite($myfile, $myJSON);
					fclose($myfile);
					header("Content-Type: application/force-download");
					header("Content-Transfer-Encoding: Binary"); 
					header("Content-disposition: attachment; filename=\"" . "tracklist.json" . "\""); 
					readfile("tracklist.json"); 
					http_response_code(200);
			} 
			catch(PDOException $e) {
				echo $e->getMessage();
			}
			exit;
		}
		if($_POST["request"]=="reset"){
			try{
					$db = new SQLite3('im.db');
					$sql='delete from phi_gram';
					echo ($sql);
					$db->exec($sql);
					$files = glob('db/audio/gram/*'); // get all file names
					foreach($files as $file){ // iterate files
						if(is_file($file))	unlink($file); // delete file
					}
					http_response_code(200);
			} 
			catch(PDOException $e) {
					http_response_code(453);
					echo $e->getMessage();
			}
			exit;
		}
	}
?>
