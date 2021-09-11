// This is the same as the async/await function below
fetch('https://randomuser.me/api/?nat=gb')
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(err => console.error(err));

// This is the same as the fetch/thens above
async function fetchUsers() {
    try {
        const response = await fetch('https://randomuser.me/api/?nat=gb')
        const result = await response.json()
        console.log(result)
    } catch (err) {
        console.error(err)
    }
}


// For the actual React app code for this lesson, see:
// C:\Users\Kat\source\cs50-react-lecture-notes\06-Navigation\my-code\App.js
// C:\Users\Kat\source\cs50-react-lecture-notes\06-Navigation\my-code\utils\api.js