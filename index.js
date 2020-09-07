let doctors = [];

function Doctor(name, availabilities){
        this.username = "Dr " + name;
        this.availabilities = availabilities;
        this.appointments = [];
}

function createDoctor(name, availabilities){
    let d = new Doctor(name, availabilities);
    doctors.push(d);
}


createDoctor("Julian Ayoub", 
[
    " 8:30am",
    " 9:30am",
    " 10:30am"
]
);

createDoctor("Maria Jamal", 
[
    " 11:30am",
    " 12:30pm",
    " 1:30pm"
 ]

);

createDoctor("Sabrina Hameed", 
[
    " 2:30pm",
    " 3:30pm",
    " 4:30pm"
]

);

createDoctor("Omar Jaradat", 
[
    " 5:30pm",
    " 6:30pm",
    " 7:30pm"
]
);

console.log(doctors);

function clearTable() {
    let askBooking = document.getElementById("timeSlot");
    var myTable = document.getElementById("doctorsTable");
    var rowCount = myTable.rows.length;
    for (var x=rowCount-1; x>0; x--) {
    myTable.deleteRow(x);
    }
    displayDoctors();
    askBooking.innerHTML = null;
 
    }

function displayDoctors() { // loops through the doctors array and sets the appropriate data to its spot in the doctors table
   // clearTable();
    let table = document.getElementById("doctorsTable");
    
    for (let i = 0; i<doctors.length; i++){
        console.log(i);
        let row = table.insertRow(i+1);
        let doc = doctors[i];

        for (let j = 0; j < 2; j++){
            var cell1 = row.insertCell(j);
            if (j == 0) cell1.innerHTML = doc.username;
        }
        for (let x = 0; x< doc.availabilities.length; x++){
            if (doc.availabilities[x] !== null)
           cell1.innerHTML += "<button target ='_blank' onClick='bookAppointment("+i+", "+x+")'>"+doc.availabilities[x]+"</button>";
        }
    }
}

function bookAppointment(i, x,){
 let askBooking = document.getElementById("timeSlot");
 console.log(doctors[i].availabilities);

 askBooking.innerHTML = "Would you like to book an appointment for "+doctors[i].availabilities[x]+" with doctor "+doctors[i].username+"? <button onClick='clearTable()'>Confirm</button>";
 doctors[i].availabilities[x] = null;
 
}


function listDoctors() {
    for (let i = 0; i<doctors.length; i++){
    console.log(doctors[i]);
    }
};
