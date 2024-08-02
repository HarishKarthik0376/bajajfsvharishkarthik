async function processAndSendData()
{
    const datainput = document.getElementById('data').value;
    const userId = document.getElementById('user_id').value;
    const email = document.getElementById('email').value;
    const rollNumber = document.getElementById('roll_number').value;
    const url = document.getElementById('url').value;
    const dataarray = datainput.split(',').map(item=>item.trim().replace(/"/g,''));

    const numbers = [];
    const alphabets = [];

    dataarray.forEach(item => {
        if (!isNaN(item)) {
            const number = parseInt(item, 10);
            if (number) {
                numbers.push(item);
            }
        } else if (/^[a-zA-Z]$/.test(item)) {
            alphabets.push(item.toUpperCase());
        }
    });
    const responseData = {
        is_success: true,
        user_id: userId,
        email: email,
        roll_number: rollNumber,
        numbers: numbers,
        alphabets: alphabets
    };
    console.log(responseData);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(responseData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonResponse = await response.json();

        document.getElementById('response').innerText = JSON.stringify(jsonResponse, null, 2);
    } catch (error) {
        document.getElementById('response').innerText = `Error: ${error.message}`;
    }
}