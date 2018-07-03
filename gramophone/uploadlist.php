<html>
<head>
	<title>Upload report</title>
	<link rel="stylesheet" href="./css/uploadlist.css">
</head>
<body>
	<div class="title"><h1>Upload Report</h1></div>
	<div class="content">
	<?php
		$db = new SQLite3('im.db');
		if(isset($_POST['request'])&&$_POST['request']=="loadjson"){
			//echo($_POST['request']);
			$file=basename($_FILES["jsonimport"]["name"]);
			//echo($file);
			$isjsonok=1;
			$ext=strtolower(pathinfo($file,PATHINFO_EXTENSION));
			if($ext != "json"){
				echo("The submitted file is not a valid json file");
				$isjsonok=0;
			}
			
			if ($isjsonok && move_uploaded_file($_FILES["jsonimport"]["tmp_name"], $file)) {
				$jsonstring=file_get_contents($file, true);
				//echo($jsonstring);
				$tracks=@json_decode($jsonstring);
				if(json_last_error() != JSON_ERROR_NONE){
					if(json_last_error() ==4){
						echo("Syntax error in json file");
					}
					else{
						echo("error occurred decoding json file");
					}
					$isjsonok=0;
				}
			}
			if($isjsonok){
				?>
				<table id="contenttable">
					<tr><th>Filename</th><th>Title</th><th>Author</th><th>Year</th><th>Gramophone</th><th>Speed</th><th>Stylus Dim. and Weight</th><th>Stylus Type</th><th>EQ</th><th>Copy Type</th><th>Uploaded</th></tr>
				
				<?php
				//var_dump($tracks);
				foreach($tracks as $relid => $track){
					$upload=1;
					?><tr><?php
					if(!empty($track->path_vinyl)){
						$target_file="db/audio/gram/".$track->path_vinyl;
						
						$q="select * from phi_gram where path_vinyl='".$target_file."'";
						//echo ($q);
						$results = $db->query($q);
						$r_results = $results->fetchArray();
						if($r_results){
							$upload=0;
							echo("<td class='warn'>".$track->path_vinyl.":already in db</td>");
						}

						$audioFileType=strtolower(pathinfo($track->path_vinyl,PATHINFO_EXTENSION));
						if($audioFileType != "mp3" && $audioFileType != "flac" && $audioFileType != "wav") {
							$upload=0;
							echo("<td class='warn'>".$track->path_vinyl.":wrong format</td>");
						}

						if (file_exists($target_file)) {
							$upload=0;
							echo("<td class='warn'>".$track->path_vinyl.":duplicate</td>");
						}
						if($upload) echo("<td>".$track->path_vinyl."</td>");
					}
					else{
						echo("<td class='missing'> Missing property</td>");
						$upload=0;
					}
					if(!empty($track->titolo)){
						$title=$track->titolo;
						echo("<td>".$title."</td>");
					}
					else{
						echo("<td class='missing'> Missing property</td>");
						$upload=0;
					}
					if(!empty($track->artista)){
						$author=$track->artista;
						echo("<td>".$author."</td>");
					}
					else{
						echo("<td class='missing'> Missing property</td>");
						$upload=0;
					}
					if (!empty($track->titolo)&&!empty($track->artista)){
						$q="select * from phi_gram where titolo='".$title."' and artista='".$author."'";
						//echo ($q);
						$results2 = $db->query($q);
						$r_resultsb = $results2->fetchArray();
						if($r_resultsb){
							$upload=0;
						}
					}
					if(!empty($track->data)){
						$year=$track->data;
						echo("<td>".$year."</td>");
					}
					else{
						echo("<td class='missing'> Missing property</td>");
						$upload=0;
					}
					if(!empty($track->grammofono)){
						$gramophone=$track->grammofono;
						echo("<td>".$gramophone."</td>");
					}
					else{
						echo("<td class='missing'> Missing property</td>");
						$upload=0;
					}
					if(!empty($track->velocita)){
						$speed=$track->velocita;
						echo("<td>".$speed."</td>");
					}
					else{
						echo("<td class='missing'> Missing property</td>");
						$upload=0;
					}
					if(!empty($track->dim_peso)){
						$dim=$track->dim_peso;
						echo("<td>".$dim."</td>");
					}
					else{
						echo("<td class='missing'> Missing property</td>");
						$upload=0;
					}
					if(!empty($track->puntina)){
						$puntina=$track->puntina;
						echo("<td>".$puntina."</td>");
					}
					else{
						echo("<td class='missing'> Missing property</td>");
						$upload=0;
					}
					if(!empty($track->equalizzazione)){
						$eq=$track->equalizzazione;
						echo("<td>".$eq."</td>");
					}
					else{
						echo("<td class='missing'> Missing property</td>");
						$upload=0;
					}
					if(!empty($track->tipo_copia)){
						$type=$track->tipo_copia;
						echo("<td>".$type."</td>");
					}
					else{
						echo("<td class='missing'> Missing property</td>");
						$upload=0;
					}
					if($upload){
						try{
							$sql="INSERT INTO 'phi_gram' ('path_vinyl', 'titolo', 'artista', 'data', 'grammofono', 'velocita', 'dim_peso', 'puntina', 'equalizzazione', 'tipo_copia') VALUES ('".$target_file."', '".$title."', '".$author."', ".$year.", '".$gramophone."',".$speed.", '".$dim."', '".$puntina."', '".$eq."', '".$type."')";
							//echo ($sql);
							$db->exec($sql);
							
							$results = $db->query("select id_vinyl from phi_gram where path_vinyl='".$target_file."'");
							$r_results = $results->fetchArray();
							echo("<td> Yes</td>");
						} 
						catch(PDOException $e) {
							echo $e->getMessage();
							echo("<td> No</td>");
						}
					}
					else{
						echo("<td> No</td>");
					}
				}?></tr><?php
				
			}
		}
		else{
			//header("Location: gramoplayer.php");
		}
		exit;
	?>
	</div>
</body>
</html>