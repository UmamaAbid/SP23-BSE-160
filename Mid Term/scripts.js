function loadDescription(fileName) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', fileName, true);

    xhr.onload = function() {
        if (this.status === 200) {
            const descriptionDiv = document.getElementById(fileName.split('.')[0] + '-description');
            descriptionDiv.innerHTML = this.responseText;
            descriptionDiv.style.display = 'block'; // Show the description after loading
        }
    };

    xhr.onerror = function() {
        console.log('Request error...');
    };

    xhr.send();
}
