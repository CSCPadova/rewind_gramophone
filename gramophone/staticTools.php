<?php
Class StaticTools{
		
	public static function select_sez($num_sez){
		switch ($num_sez) {
			case 0:
				return "Introduzione";
			case 1:
				return "Musica Ben Calcolata";
			case 2:
				return "Numero e Suono";
			case 3:
				return "Suono e societa'";
			case 4:
				return "Musica e Spazio";
			case 5:
				return "Medea";
			case 6:
				return "Suono e Gestualita'";
			case 7:
				return "Chi Siamo";
			case 8:
				return "Dicono di Noi";
			default:
				return "Error";
		}
	}
	
		public static function select_type($num_type){
			switch ($num_type) {
				case 2:
					return "Archivio Immagini";
				case 3:
					return "Video Bassa Qualita'";
				case 4:
					return "Video Alta Qualita'";
				case 5:
					return "Audio Mp3";
				case 6:
					return "Audio Wav";
				case 7:
					return "Presentazioni";
				case 8:
					return "Software";
				case 9:
					return "Pdf";
				default:
					return "Error";
			}
		}
	
		public static function create_query($t , $s, $c, $off, $r){
			if($r == 0){
				if($c){
					if($t == 10)
						if($s == 10)
							return "select count(*) as 'total' from vds_file where autorizzazione = $r"; 
						else
							return "select count(*) as 'total' from vds_file where sezione = $s AND autorizzazione = $r";
					else
						if($s == 10)
							return "select count(*) as 'total' from vds_file where tipo = $t AND autorizzazione = $r";
						else
							return "select count(*) as 'total' from vds_file where sezione = $s AND tipo = $t AND autorizzazione = $r";		
				}
				else{
					if($t == 10)
						if($s == 10)
						return "select * from vds_file where autorizzazione = $r order  by tipo, sezione, nome limit 10 offset $off";
					else
						return "select * from vds_file where sezione = $s AND autorizzazione = $r order by tipo, nome limit 10 offset $off";
						else
					if($s == 10)
						return "select * from vds_file where tipo = $t AND autorizzazione = $r order by sezione, nome limit 10 offset $off";
					else 
						return "select * from vds_file where sezione = $s AND tipo = $t AND autorizzazione = $r order by nome limit 10 offset $off"; 
				}
			}
			else{
				if($c){
					if($t == 10)
						if($s == 10)
							return "select count(*) as 'total' from vds_file";
						else
							return "select count(*) as 'total' from vds_file where sezione = $s";
					else
						if($s == 10)
							return "select count(*) as 'total' from vds_file where tipo = $t";
						else
							return "select count(*) as 'total' from vds_file where sezione = $s AND tipo = $t";
				}
				else{
					if($t == 10)
						if($s == 10)
							return "select * from vds_file order by tipo, sezione, nome limit 10 offset $off";
						else
							return "select * from vds_file where sezione = $s order by tipo, nome limit 10 offset $off";
					else
						if($s == 10)
							return "select * from vds_file where tipo = $t order by sezione, nome limit 10 offset $off";
						else
							return "select * from vds_file where sezione = $s AND tipo = $t order by nome limit 10 offset $off";
				}
			}
		}
		
		public static function create_download_box($download_path,$download_name,$box_type){
			//include 'download.php';
			if ($box_type == 0)
				//$download_box = "<div class=\"simple-box\"><form><input type=\"button\" value=\"Download\" onClick=\"window.location.href=\"".$download_path."\"></form>&nbsp &nbsp".$download_name."</div>";
				$download_box = "<div class=\"simple-box\"><a href=\"/joomla/search/download.php?dp=".$download_path."\" TARGET = \"_blank\"><img src=\"/joomla/search/icons/download.png\"></img></a>&nbsp &nbsp".$download_name."</div>";
			else
				$download_box = "<div class=\"info-box\"><a href=\"".$download_path."\"><img src=\"/joomla/search/icons/download.png\" target=\"blank\"></img></a>&nbsp &nbsp".$download_name."</div>";
			return $download_box;
		}
		
	public static function RemoveExtension($filename) {
			$file = substr($filename, 0,strrpos($filename,'.'));
			return $file;
	}
	
	public static function removeSlash ($value)
	{
		$value = stripslashes($value);
		return $value;
	}
}

?>