export const fetchContacts = async () => {
    const response = await fetch('https://randomuser.me/api/?nat=gb&results=50')

    // `{results}` destructures the object returned from `response.json()` which allows us to just
    // grab the object key called "results" from that object which is all we care about.
    const {results} = await response.json();
    
    console.log(results);
    return results.map(processContact);
}

const processContact = contact => ({
    name: `${contact.name.first} ${contact.name.last}`,
    phone: contact.phone
})

/**
 * authServer must be running for this to work properly.
 */
export const login = async (username, password) => {
    const response = await fetch('http://localhost:8000', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username, // Using this syntax rather than `username: username` is possible because the key's name is the same as the object name.
            password
        })
    })

    console.log("authResult", response)

    if (response.ok) return true;

    const errorMessage = await response.text()
    throw new Error(errorMessage)
};