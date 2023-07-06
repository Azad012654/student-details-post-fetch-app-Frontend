// console.log("Hello");
document.addEventListener('DOMContentLoaded', function () {


    let btn = document.getElementById('submit');
    let displayData = document.getElementsByClassName('display-container')[0]
    let errormessage = document.getElementsByClassName('error-msg')[0]

    btn.addEventListener('click', async (event) => {
        event.preventDefault();
        console.log("Checking");

        let fname = document.getElementById('fname').value;
        let lname = document.getElementById('lname').value;
        var dob = document.getElementById('dob').value;
        let parents = document.getElementById('parents').value;
        let address = document.getElementById('address').value;
        let city = document.getElementById('city').value;
        let phone = document.getElementById('phone').value;

        const arr = [fname, lname, dob, parents, address, city, phone];

        // Form Validation Code
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === "") {
                errormessage.innerHTML = `<h2>Please fill all the fields </h2>`;
                setTimeout(() => {
                    errormessage.innerHTML = `<h2></h2>`
                }, 2000)
                return false;
            }
        }
        //Form Validation Code Ends Here



        const payload = {
            fname: fname,
            lname: lname,
            dob: dob,
            parentname: parents,
            address: address,
            city: city,
            phone: phone
        }
        displayData.innerHTML = `<h2>Loading.....</h2>`;

        // Fetching Data from Database and calling render function if data fetched successfully !
        try {
            const response = await fetch('https://student-details-post-fetch.onrender.com/create-student', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })


            if (response.ok) {
                const data = await response.json();
                console.log('Data received:', data);

                if (data.dob !== null) {
                    var birthdate = dobConverter(data.dob)
                }
                renderData(data);
            } else {
                throw new Error('Error: ' + response.status);
            }
        } catch (error) {
            console.log(error)
        }

        // Database fetching ends here


        // Trimming Date func to remove time assiciated with the date

        function dobConverter(dateofbirth) {
            const birthdate = dateofbirth.split('T')[0];
            return birthdate;
        }


        //Render function to render our data into the page
        
        function renderData(data) {
            displayData.innerHTML = `
                    <h2> Fetched from Database </h2>
                  <h3>First Name: ${data.fname}</h3>
                  <h3>Last Name: ${data.lname}</h3>
                  <h3>DOB: ${birthdate}</h3>
                  <h3>Parents: ${data.parentname}</h3>
                  <h3>Address: ${data.address}</h3>
                  <h3>City: ${data.city}</h3>
                  <h3>Phone: ${data.phone}</h3>
                `;
        }

    })

})

