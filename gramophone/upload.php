
<?php	
	require_once('js/getid3/getid3.php');
	var_dump(http_response_code(500));
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
				var_dump(http_response_code(409));
				//echo "Sorry, file already exists.";
				$uploadOk = 0;
			}

			// Allow certain file formats
			if($audioFileType != "mp3" && $audioFileType != "flac" && $audioFileType != "wav") {
				//echo "Sorry, Only Mp3,flac and Wav files are allowed";
				echo audioFileType;
				var_dump(http_response_code(415));
				$uploadOk = 0;
			}
			
			// Check if $uploadOk is set to 0 by an error
			if ($uploadOk == 0) {
				echo "Your file was not uploaded.";
			// if everything is ok, try to upload file
			} else {
				if (move_uploaded_file($_FILES["newTrack"]["tmp_name"], $target_file)) {
					var_dump(http_response_code(200));
					//check file duration
					$getID3 = new getID3;
					$ThisFileInfo = $getID3->analyze($target_file);
					$sec= $ThisFileInfo['playtime_seconds'];
					//if longer than 200 secondd, delete it and send error
					if ($sec>200){
						var_dump(http_response_code(451));
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
					var_dump(http_response_code(200));
				}
				else {
					echo ("nothing to delete");
					var_dump(http_response_code(452));
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
					var_dump(http_response_code(200));
				}
				try{
						$db = new SQLite3('im.db');
						$sql='delete from phi_gram where id_vinyl='.$id;
						echo ($sql);
						$db->exec($sql);
						var_dump(http_response_code(200));
				} 
				catch(PDOException $e) {
						var_dump(http_response_code(453));
						echo $e->getMessage();
				}
			}
			exit;
		}
	}
?>
