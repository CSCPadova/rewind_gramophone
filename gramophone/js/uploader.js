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