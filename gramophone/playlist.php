<?php
class Playlist{
	//array with song ids
	private $playlist_id = null;
	
	//song counter
	private $n = 0;
	
	//current song
	private $c_index = null;
	
	// constructor
	public function __construct() {
		$this->playlist_id = array();
		$this->c_index = 0;
	}
	
	public function insertSong($a){
		$this->n = array_push($this->playlist_id, $a);
	}
	
	public function getNextByIndex($b){
		return $this->playlist_id[(($b+1)%$this->n)];
	}
	
	public function getPrevByIndex($c){
		return $this->playlist_id[(($c-1)%$this->n)];
	}
	
	public function getCount(){
		return $this->n;
	}
	
	public function getCurrentByIndex($d){
		$temp = $this->playlist_id[$d];
		return $temp;
	}
	
	public function getCurrentIndex(){
		return $this->c_index;
	}
	
	public function setCurrentIndex($a){
		$this->c_index = $a;
	}
	
	public function getPreviousIndex(){
		$res = (($this->c_index)-1+$this->n)%($this->n);
		return $res;
	}
	
	public function getNextIndex(){
		return (($this->c_index)+1)%$this->n;
	}
	
}
?>