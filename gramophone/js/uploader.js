var x = document.getElementsByClassName('form-file');
var i;
for (i = 0; i < x.length; i++) {
	x[i].addEventListener('submit', function(event) {
		console.log('inside upload');
		event.preventDefault();
		console.log('after prevent default');
		var id=(this.id).substring(2);
		var form = document.getElementById('fr'+id);
		//console.log(form.id);
		var fileSelect = document.getElementById('in'+id);
		//console.log(fileSelect.id);
		var uploadButton = document.getElementById('bt'+id);
		//console.log(uploadButton.id);
		var targetFile=document.getElementById(id).getAttribute("missing");
		//console.log(targetFile);
		uploadButton.value = 'Uploading...';
		
		var file = fileSelect.files[0];
		var formData = new FormData();
		console.log(file);
		if (typeof file === 'undefined' || !file){
			uploadButton.value = 'Upload Track';
		}
		if (!file.type.match('audio.*')) {
			alert ("The submitted file is not an audio file");
		} else if(targetFile.replace(/^.*[\\\/]/, '')!=file.name){
			alert("the file name doesn't match with " + targetFile.replace(/^.*[\\\/]/, '') );
					
		} else {
			console.log("is a file audio");
			formData.append("request","addFile");
			formData.append('newTrack', file, file.name);
			var xhr = new XMLHttpRequest();
			xhr.open('POST', form.action, true);
			xhr.onload = function () {
				if (xhr.status === 200) {
					// File is uploaded, edit page, update row
					var loaddiv=document.getElementById(id);
					var titlediv=document.getElementById('title'+id);
					titlediv.classList.remove('firstRUp');
					titlediv.classList.add('firstR');
					loaddiv.classList.remove('errorLoader');
					loaddiv.classList.add('trackLoaderButton');
					loaddiv.removeAttribute("missing");
					loaddiv.innerText='Load Disk';
					var str=titlediv.innerText;
					str = str.replace(/\\/g, '');
					str = str.replace(/'/g,"");
					var titolo=str.slice(str.lastIndexOf("-")+2, str.lastIndexOf("(")-1);
					var tab=document.getElementById('data'+id);
					var vel=tab.childNodes[3].innerHTML;
					//alert (vel);
					loaddiv.setAttribute("onclick","gram.loadDisk('"+targetFile+"','"+titolo+"','"+vel+"')");
					var delfile=document.createElement("div");
					delfile.classList.add('delfile');
					delfile.innerText='Delete File';
					delfile.setAttribute("onclick","deletefile('"+id+"','"+file.name+"')");
					delfile.setAttribute("id","df"+id);
					loaddiv.parentNode.insertBefore(delfile, loaddiv);
					var extdiv=form.parentNode.parentNode;
					var uprow=form.parentNode;
					form.parentNode.parentNode.removeChild(uprow);
					extdiv.classList.remove('trackUploadContainer');
					extdiv.classList.add('trackLoaderContainer');
					
				} else if(xhr.status === 415){
					alert('Please insert only allowed input formats');
					uploadButton.value = 'Upload Track';
				} else if(xhr.status === 409){
					alert('File already exists on server');
					uploadButton.value = 'Upload Track';
				}
				else if(xhr.status === 451){
					alert('Max file duration is 3\'.20\"');
					fileSelect.value="";
					uploadButton.value = 'Upload Track';
				}
				else {
					alert('Bad request, please check data');
					uploadButton.value = 'Upload Track';
				}
			};
			xhr.send(formData);
		}		
	});
}
document.getElementById("singleform").addEventListener('submit', function(event) {
		event.preventDefault();
		var title=document.getElementById("singletitle").value;
		var author=document.getElementById("singleauthor").value;
		var year=document.getElementById("singleyear").value;
		var speed=document.getElementById("singlespeed").value;
		var gramophone=document.getElementById("singlegramophone").value;
		var puntina=document.getElementById("singlepuntina").value;
		var dim=document.getElementById("singledim").value;
		var eq=document.getElementById("singleeq").value;
		var type=document.getElementById("singletype").value;
		console.log(title+" - "+author+" - "+year+" - "+speed+" - "+gramophone+" - "+puntina+" - "+dim+" - "+eq+" - "+type);
		if (year>2100 || year<1900){
			alert ("wrong year format");
			return;
		}
		var fileSelect = document.getElementById('singleimport');
		var file = fileSelect.files[0];
		console.log(file);
		if (typeof file === 'undefined' || !file){
			alert ("File not valid");
			return;
		}
		if (!file.type.match('audio.*')) {
			alert ("The selected file is not an audio file");
			return;
		}
		var formData = new FormData();
		formData.append("request","singleTrack");
		formData.append("title",title);
		formData.append("author",author);
		formData.append("year",year);
		formData.append("speed",speed);
		formData.append("gramophone",gramophone);
		formData.append("puntina",puntina);
		formData.append("dim",dim);
		formData.append("eq",eq);
		formData.append("type",type);
		formData.append('newTrack', file, file.name);
		console.log(formData);
		var xhr = new XMLHttpRequest();
		xhr.open('POST', "upload.php", true);
		xhr.onload = function () {
			if (xhr.status === 200) {
				var id=xhr.responseText*1;
				//alert(id);
				addTrackDiv(id,title,author,year,speed,gramophone,dim,puntina,eq,file.name);
			} else if(xhr.status === 415){
				alert('Please insert only allowed input formats');
			} else if(xhr.status === 409){
				alert('File already exists on server');
			} else if(xhr.status === 401){
				alert('File already exists in the database. Please change File Name');
			} else if(xhr.status === 501){
				alert('This track is already present in the database. Please check the current tracklist.');
			}
			else if(xhr.status === 451){
				alert('Max file duration is 3\'.20\"');
				fileSelect.value="";
			}
			else {
				alert('Bad request, please check data');
			}
		};
		xhr.send(formData);
		
});

function addTrackDiv(id,title,author,year,speed,gramophone,dim,puntina,eq,filename){
	console.log("addTrackDiv");
	var container=document.getElementById("songdb");
		var extdiv=document.createElement("div");
		extdiv.classList.add("trackLoaderContainer");
		var firstRow=document.createElement("div");
			firstRow.classList.add("firstRow");
			var firstR=document.createElement("div");
				firstR.classList.add("firstR");
				firstR.setAttribute("id","title"+id);
				firstR.innerText=author+" - "+title+ "("+year+")";
			var delrow=document.createElement("div");
				delrow.classList.add("delrow");
				delrow.setAttribute("id","dr"+id);
				delrow.setAttribute("onclick","deleterow('"+id+"','"+filename+"')");
				//delrow.innerText="Delete All";
			var delfile=document.createElement("div");
				delfile.classList.add("delfile");
				delfile.setAttribute("id","df"+id);
				delfile.setAttribute("onclick","deletefile('"+id+"','"+filename+"')");
				delfile.innerText="Delete File";
			var trackLoaderButton=document.createElement("div");
				trackLoaderButton.classList.add("trackLoaderButton");
				trackLoaderButton.setAttribute("id",id);
				trackLoaderButton.setAttribute("onclick","gram.loadDisk('db/audio/gram/"+filename+"','"+title+"','"+speed+"')");
				trackLoaderButton.innerText="Load Disk";
		firstRow.appendChild(delrow);
		firstRow.appendChild(firstR);
		
		firstRow.appendChild(delfile);
		firstRow.appendChild(trackLoaderButton);
		extdiv.appendChild(firstRow);
			var table=document.createElement("table");
			table.classList.add("dbTable");
				var secondRow=document.createElement("tr");
					secondRow.classList.add("secondRow");
					secondRow.innerHTML=("<td>Grammofono</td><td>Velocita'(rpm)</td><td>Dim. e Peso Puntina</td><td>Tipo Puntina</td><td>Equalizzazione</td>");
				var thirdRow=document.createElement("tr");
					thirdRow.classList.add("thirdRow");
					thirdRow.setAttribute("id","data"+id);
					thirdRow.innerHTML=("<td>"+gramophone+"</td><td>"+speed+"</td><td>"+dim+"</td><td>"+puntina+"</td><td>"+eq+"</td>");
			table.appendChild(secondRow);
			table.appendChild(thirdRow);
		extdiv.appendChild(table);
	container.appendChild(extdiv);
}

document.getElementById("resetdb").addEventListener('click', function(event) {
	
	if(confirm("Are you sure to reset database? Audio files and track information will be lost.")){
	var formData = new FormData();
	formData.append("request","reset");
	var xhr = new XMLHttpRequest();
	xhr.open('POST', "upload.php", true);
	xhr.onload = function () {
			if (xhr.status === 200) {
				document.getElementById("songdb").innerHTML="";
			}
			else if(xhr.status === 453){
				alert('Error in resetting the database');
				fileSelect.value="";
			}
			else {
				alert('Unexpected error');
			}
	}	
	xhr.send(formData);
	}
});

function deletefile(id, filename){
	console.log("inside deletefile "+ filename);
	var formData2 = new FormData();
	formData2.append("request","delFile");
	formData2.append("file",filename);
	var xhr2 = new XMLHttpRequest();
	xhr2.open('POST','upload.php', true);
	xhr2.onload = function () {
		if (xhr2.status === 200) {
			// File is deleted, edit page, update row
			var loaddiv=document.getElementById(id);
			var titlediv=document.getElementById('title'+id);
			titlediv.classList.remove('firstR');
			titlediv.classList.add('firstRUp');
			loaddiv.classList.remove('trackLoaderButton');
			loaddiv.classList.add('errorLoader');
			loaddiv.setAttribute("missing","db/audio/gram/"+filename);
			loaddiv.removeAttribute("onclick");
			loaddiv.innerText=filename+' not found';
			var delfile=document.getElementById('df'+id);
			delfile.parentNode.removeChild(delfile);
			var extdiv=loaddiv.parentNode.parentNode;
			var uprow=document.createElement('div');
			var form=document.createElement('form');
			form.setAttribute("action","upload.php");
			form.setAttribute("class","form-file");
			form.setAttribute("id","fr"+id);
			form.setAttribute("method","post");
			form.setAttribute("enctype","multipart/form-data");
			form.appendChild(document.createTextNode("Select file to upload (mp3,flac,wav):"));
			var input=document.createElement("input");
			input.setAttribute("type","file");
			input.setAttribute("class","input-file");
			input.setAttribute("id","in"+id);
			input.setAttribute("name","newTrack");
			form.appendChild(input);
			var button=document.createElement("input");
			button.setAttribute("type","submit");
			button.setAttribute("class","button-file");
			button.setAttribute("id","bt"+id);
			button.setAttribute("name","submit");
			button.setAttribute("value","Upload Track");
			form.appendChild(button);
			uprow.appendChild(form);
			uprow.setAttribute("class","uploadRow");
			extdiv.classList.remove('trackLoaderContainer');
			extdiv.classList.add('trackUploadContainer');
			extdiv.insertBefore(uprow,titlediv.parentNode.nextSibling);
			form.addEventListener('submit', function(event) {
					console.log('inside upload');
					event.preventDefault();
					console.log('after prevent default');
					var fileSelect = document.getElementById('in'+id);
					var uploadButton = document.getElementById('bt'+id);
					var targetFile=document.getElementById(id).getAttribute("missing");
					uploadButton.value = 'Uploading...';
					
					var file = fileSelect.files[0];
					var formData = new FormData();
					console.log(file);
					if (typeof file === 'undefined' || !file){
						uploadButton.value = 'Upload Track';
					}
					if (!file.type.match('audio.*')) {
						alert ("The submitted file is not an audio file");
					} else if(targetFile.replace(/^.*[\\\/]/, '')!=file.name){
						alert("the file name doesn't match with " + targetFile.replace(/^.*[\\\/]/, '') );
								
					} else {
						console.log("is a file audio");
						formData.append("request","addFile");
						formData.append('newTrack', file, file.name);
						var xhr = new XMLHttpRequest();
						xhr.open('POST', form.action, true);
						xhr.onload = function () {
							if (xhr.status === 200) {
								// File is uploaded, edit page, update row
								var loaddiv=document.getElementById(id);
								var titlediv=document.getElementById('title'+id);
								titlediv.classList.remove('firstRUp');
								titlediv.classList.add('firstR');
								loaddiv.classList.remove('errorLoader');
								loaddiv.classList.add('trackLoaderButton');
								loaddiv.innerText='Load Disk';
								var str=titlediv.innerText;
								str = str.replace(/\\/g, '');
								str = str.replace(/'/g,"");
								var titolo=str.slice(str.lastIndexOf("-")+2, str.lastIndexOf("(")-1);
								var tab=document.getElementById('data'+id);
								var vel=tab.childNodes[3].innerHTML;
								//alert (vel);
								loaddiv.setAttribute("onclick","gram.loadDisk('"+targetFile+"','"+titolo+"','"+vel+"')");
								var delfile=document.createElement("div");
								delfile.classList.add('delfile');
								delfile.innerText='Delete File';
								delfile.setAttribute("onclick","deletefile('"+id+"','"+file.name+"')");
								delfile.setAttribute("id","df"+id);
								loaddiv.parentNode.insertBefore(delfile, loaddiv);
								var extdiv=form.parentNode.parentNode;
								var uprow=form.parentNode;
								form.parentNode.parentNode.removeChild(uprow);
								extdiv.classList.remove('trackUploadContainer');
								extdiv.classList.add('trackLoaderContainer');
								
							} else if(xhr.status === 415){
								alert('Please insert only allowed input formats');
								uploadButton.value = 'Upload Track';
							} else if(xhr.status === 409){
								alert('File already exists on server');
								uploadButton.value = 'Upload Track';
							}
							else if(xhr.status === 451){
								alert('Max file duration is 3\'.20\"');
								fileSelect.value="";
								uploadButton.value = 'Upload Track';
							}
							else {
								alert('Bad request, please check data');
								uploadButton.value = 'Upload Track';
							}
						};
						xhr.send(formData);
					}		
				});
		} else if(xhr2.status === 452){
			alert('There is no file to delete');
		} 
		else {
			alert('Bad request, please check data');
		}
	};
	xhr2.send(formData2);
}

function deleterow(id, filename){
	console.log("inside deleterow "+ id +"  "+filename);
	var formData = new FormData();
	formData.append("request","delRow");
	formData.append("id",id);
	formData.append("file",filename);
	var xhr = new XMLHttpRequest();
	xhr.open('POST','upload.php', true);
	xhr.onload = function () {
		if (xhr.status === 200) {
			// File and metadata are deleted, edit page, delete row
			var extdiv=document.getElementById(id).parentNode.parentNode;
			extdiv.parentNode.removeChild(extdiv);			
		} else if(xhr.status === 453){
			alert('Error in deleting metadata');
		} 
		else {
			alert('Bad request, please check data');
		}
	};
	xhr.send(formData);
}