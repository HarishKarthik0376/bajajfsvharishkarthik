async function processAndSendData() {
    const datainput = document.getElementById('data').value;
    const userId = document.getElementById('user_id').value;
    const email = document.getElementById('email').value;
    const rollNumber = document.getElementById('roll_number').value;
    const url = document.getElementById('url').value;
    
    try {
        const dataObj = JSON.parse(datainput); 
        const dataarray = dataObj.data;

        const numbers = [];
        const alphabets = [];
        let highestLowercase = null;

        dataarray.forEach(item => {
            if (!isNaN(item)) {
                numbers.push(item);
            } else if (/^[a-zA-Z]$/.test(item)) {
                alphabets.push(item);
                if (item === item.toLowerCase()) {
                    if (!highestLowercase || item > highestLowercase) {
                        highestLowercase = item;
                    }
                }
            }
        });

        const highestLowercaseArray = highestLowercase ? [highestLowercase] : [];

        const responseData = {
            is_success: true,
            user_id: userId,
            email: email,
            roll_number: rollNumber,
            numbers: numbers,
            alphabets: alphabets,
            highest_lowercase_alphabet: highestLowercaseArray
        };

        console.log('Sending Data:', responseData);
        
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

        const selectedOptions = Array.from(document.getElementById('selectOptions').selectedOptions).map(opt => opt.value);

        const filteredResponse = {};
        if (selectedOptions.includes("alphabets")) {
            filteredResponse.alphabets = jsonResponse.alphabets;
        }
        if (selectedOptions.includes("numbers")) {
            filteredResponse.numbers = jsonResponse.numbers;
        }
        if (selectedOptions.includes("highest_lowercase_alphabet")) {
            filteredResponse.highest_lowercase_alphabet = jsonResponse.highest_lowercase_alphabet;
        }

        document.getElementById('response').innerText = JSON.stringify(filteredResponse, null, 2);
    } catch (error) {
        document.getElementById('response').innerText = `Error: Invalid JSON format or API error - ${error.message}`;
    }
}
