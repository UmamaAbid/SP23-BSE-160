// Function to fetch and display all stories
async function getStories() {
    try {
        const response = await fetch("https://usmanlive.com/wp-json/api/stories");
        if (!response.ok) throw new Error('Network response was not ok');
        
        const stories = await response.json();
        let output = '';
        stories.forEach(story => {
            output += `
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${story.title}</h5>
                        <p class="card-text">${story.content}</p>
                        <small class="text-muted">Story ID: ${story.id}</small>
                        <br><br>
                        <button class="btn btn-warning" onclick="loadStory(${story.id})">Update</button>
                        <button class="btn btn-danger" onclick="deleteStory(${story.id})">Delete</button>
                    </div>
                </div>
            </div>`;
        });
        document.getElementById('storyList').innerHTML = output;
    } catch (error) {
        alert('Error fetching stories: ' + error.message);
    }
}

// Function to load a story's details into the form for updating
async function loadStory(storyId) {
    try {
        const response = await fetch(`https://usmanlive.com/wp-json/api/stories/${storyId}`);
        if (!response.ok) throw new Error('Error fetching story');
        
        const story = await response.json();
        document.getElementById('title').value = story.title;
        document.getElementById('content').value = story.content;
        document.getElementById('storyId').value = story.id; // Set the story ID to update

        alert('Story loaded for update');
    } catch (error) {
        alert('Error loading story: ' + error.message);
    }
}

// Function to create a new story
async function createStory() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    try {
        const response = await fetch("https://usmanlive.com/wp-json/api/stories", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        });

        if (!response.ok) throw new Error('Error adding story');
        alert('Story added successfully');
        getStories(); // Refresh stories
        clearForm();
    } catch (error) {
        alert('Error adding story: ' + error.message);
    }
}

// Function to update a story by ID
async function updateStory() {
    const storyId = document.getElementById('storyId').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    try {
        const response = await fetch(`https://usmanlive.com/wp-json/api/stories/${storyId}`, { // Corrected URL
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        });

        if (!response.ok) throw new Error('Error updating story');
        alert('Story updated successfully');
        getStories(); // Refresh stories
        clearForm();
    } catch (error) {
        alert('Error updating story: ' + error.message);
    }
}

// Function to delete a story by ID
async function deleteStory(storyId) {
    try {
        const response = await fetch(`https://usmanlive.com/wp-json/api/stories/${storyId}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Error deleting story');
        alert('Story deleted successfully');
        getStories(); // Refresh stories
    } catch (error) {
        alert('Error deleting story: ' + error.message);
    }
}

// Clear form fields
function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    document.getElementById('storyId').value = '';
}

// Load all stories when the page loads
window.onload = getStories;
