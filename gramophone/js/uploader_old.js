var x = document.getElementsByClassName('form-file');
var i;
for (i = 0; i < x.length; i++) {
	x[i].addEventListener('submit', function(event) {
		console.log('inside upload');
		event.preventDefault();
		console.log('after prevent default');
		var id=(this.id).substring(2);
		var form = document.getElementById('fr'+id);
		console.log(form.id);
		var fileSelect = document.getElementById('in'+id);
		console.log(fileSelect.id);
		var uploadButton = document.getElementById('bt'+id);
		console.log(uploadButton.id);
		var targetFile=document.getElementById(id).getAttribute("missing");
		console.log(targetFile);
		console.log('before uploading text');
		uploadButton.value = 'Uploading...';
		console.log('after uploading text');
		
		var file = fileSelect.files[0];
		var formData = new FormData();
		console.log(file);
		
		if (!file.type.match('audio.*')&& (file.name.split('.').pop())!="ogg") {
			alert ("The submitted file is not an audio file");
		} else if(targetFile.replace(/^.*[\\\/]/, '')!=file.name){
			alert("the file name doesn't match with " + targetFile.replace(/^.*[\\\/]/, '') );
					
		} else{
			console.log("is a file audio");
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
					var extdiv=form.parentNode.parentNode;
					var uprow=form.parentNode;
					form.parentNode.parentNode.removeChild(uprow);
					extdiv.classList.remove('trackUploadContainer');
					extdiv.classList.add('trackLoaderContainer');
					
				} else if(xhr.status === 400){
					alert('Please insert only allowed input formats');
					uploadButton.value = 'Upload Track';
				} else if(xhr.status === 409){
					alert('File already exists on server');
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