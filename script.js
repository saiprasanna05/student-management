function validationform() {
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const age = document.getElementById("age").value;
    const phnumber = document.getElementById("phnumber").value;
    const location = document.getElementById("location").value;
    const mail = document.getElementById("mail").value;

    if (firstname == "" || typeof (firstname) !== "string") {
        alert("Enter valid firstname");
        return false;
    }
    if (lastname == "" || typeof (lastname) !== "string") {
        alert("Enter valid name");
        return false;
    }
    if (age == "" || age < 1 || age.length > 2) {
        alert("Enter valid age");
        return false;

    }

    if (phnumber == "" || phnumber < 1 || phnumber.length < 10 || phnumber.length > 10) {
        alert("Enter valid phnumber");
        return false;
    }
    if (location == "" || typeof (location) !== "string") {
        alert("Enter valid location");
        return false;
    }
    if (mail == "" || !mail.includes("@")) {
        alert("Enter valid mail");
        return false;
    }

    return true;



}

function showData() {
    let studentlist;
    if (localStorage.getItem("studentlist") == null) {
        studentlist = [];
    } else {
        studentlist = JSON.parse(localStorage.getItem("studentlist"));
    }

    let html = "";
    studentlist.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.firstname + "</td>";
        html += "<td>" + element.lastname + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.phnumber + "</td>";
        html += "<td>" + element.location + "</td>";
        html += "<td>" + element.mail + "</td>";
        html += "<td class = 'action'><button onclick='deleteData(" + index + ")' class='btn btn-danger'>Delete</button><button onclick='editData(" + index + ")' class='btn btn-success'>Edit</button><div class = 'mark2'></div></td>";
        html += "</tr>";
        document.querySelector("#datatable tbody").innerHTML = html;
        document.getElementById("arrayLength2").textContent = studentlist.length;

        // search for current students



    })

}



document.onload = showData();


// function to get data

function adddata() {
    if (validationform() == true) {
        const firstname = document.getElementById("firstname").value;
        const lastname = document.getElementById("lastname").value;
        const age = document.getElementById("age").value;
        const phnumber = document.getElementById("phnumber").value;
        const location = document.getElementById("location").value;
        const mail = document.getElementById("mail").value;


        let studentlist;
        if (localStorage.getItem("studentlist") == null) {
            studentlist = [];
        } else {
            studentlist = JSON.parse(localStorage.getItem("studentlist"));
        }


        studentlist.push({
            firstname: firstname,
            lastname: lastname,
            age: age,
            phnumber: phnumber,
            location: location,
            mail: mail

        });

        localStorage.setItem("studentlist", JSON.stringify(studentlist));
        showData();
        console.log(age.length);


        document.getElementById("firstname").value = "";
        document.getElementById("lastname").value = "";
        document.getElementById("age").value = "";
        document.getElementById("phnumber").value = "";
        document.getElementById("location").value = "";
        document.getElementById("mail").value = "";




    }
}

// delete function
let oldstudentarr = [];

function deleteData(index) {

    let studentlist;
    if (localStorage.getItem("studentlist") == null) {
        studentlist = [];
    } else {
        studentlist = JSON.parse(localStorage.getItem("studentlist"));
    }


    let oldstudent = studentlist.splice(index, 1)[0];
    localStorage.setItem("studentlist", JSON.stringify(studentlist));
    showData();
    oldstudentarr.push(oldstudent)
    console.log(oldstudentarr);
    localStorage.setItem("oldstudentarr", JSON.stringify(oldstudentarr));




}


// update function

function editData(index) {
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";


    let studentlist;
    if (localStorage.getItem("studentlist") == null) {
        studentlist = [];
    } else {
        studentlist = JSON.parse(localStorage.getItem("studentlist"));
    }

    document.getElementById("firstname").value = studentlist[index].firstname;
    document.getElementById("lastname").value = studentlist[index].lastname;
    document.getElementById("age").value = studentlist[index].age;
    document.getElementById("phnumber").value = studentlist[index].phnumber;
    document.getElementById("location").value = studentlist[index].location;
    document.getElementById("mail").value = studentlist[index].mail;

    var currentclassContent = document.querySelector(".currentclasscontent");
    var addstudentContent = document.querySelector(".contents");
    var deletedstudentContent = document.querySelector(".oldstudentcontent");
    deletedstudentContent.style.display = "none";


    currentclassContent.style.display = "none";
    addstudentContent.style.display = "block";
    // oldstudentarr.splice(index, 1)[0];

    document.querySelector("#update").onclick = function () {
        if (validationform() == true) {
            studentlist[index].firstname = document.getElementById("firstname").value;
            studentlist[index].lastname = document.getElementById("lastname").value;
            studentlist[index].age = document.getElementById("age").value;
            studentlist[index].phnumber = document.getElementById("phnumber").value;
            studentlist[index].location = document.getElementById("location").value;
            studentlist[index].mail = document.getElementById("mail").value;

            localStorage.setItem("studentlist", JSON.stringify(studentlist));
            showData();

            document.getElementById("firstname").value = "";
            document.getElementById("lastname").value = "";
            document.getElementById("age").value = "";
            document.getElementById("phnumber").value = "";
            document.getElementById("location").value = "";
            document.getElementById("mail").value = "";

            document.getElementById("submit").style.display = "block";
            document.getElementById("update").style.display = "none";

            // update and return to currrent student

            var currentclassContent = document.querySelector(".currentclasscontent");
            var addstudentContent = document.querySelector(".contents");
            var deletedstudentContent = document.querySelector(".oldstudentcontent");
            deletedstudentContent.style.display = "none";

            // firststandardContent.style.display = "block";
            currentclassContent.style.display = "block";
            addstudentContent.style.display = "none";



        }
    }

}

// drop down functionality
function toggleDropdown() {
    var dropdownContent = document.getElementById("classesDropdown");
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";

}

// function showcurrentclas() {
//     var currentclassContent = document.querySelector(".currentclasscontent");
//     var addstudentContent = document.querySelector(".contents");
//     var firststandardContent = document.querySelector(".firststandard");
//     firststandardContent.style.display = "none";
//     currentclassContent.style.display = "block";
//     addstudentContent.style.display = "none";
//     console.log("yes working")
// }

function showaddstudent() {
    document.getElementById("submit").style.display = "block";
    document.getElementById("update").style.display = "none";
    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("age").value = "";
    document.getElementById("phnumber").value = "";
    document.getElementById("location").value = "";
    document.getElementById("mail").value = "";
    var currentclassContent = document.querySelector(".currentclasscontent");
    var addstudentContent = document.querySelector(".contents");
    var deletedstudentContent = document.querySelector(".oldstudentcontent");
    deletedstudentContent.style.display = "none";


    currentclassContent.style.display = "none";
    addstudentContent.style.display = "block";


}

function showfirststandard() {
    var currentclassContent = document.querySelector(".currentclasscontent");
    var addstudentContent = document.querySelector(".contents");
    var deletedstudentContent = document.querySelector(".oldstudentcontent");
    deletedstudentContent.style.display = "none";

    // firststandardContent.style.display = "block";
    currentclassContent.style.display = "block";
    addstudentContent.style.display = "none";
    document.querySelector(`#datatable tbody tr .mark2`).style.display = "none";
    // document.querySelectorAll(".current ").innerHTML.style.backgroundColor = "black"


}

function showdeleteddata() {

    if (localStorage.getItem("oldstudentarr") == null) {
        oldstudentarr = [];
    } else {
        oldstudentarr = JSON.parse(localStorage.getItem("oldstudentarr"));
    }

    let html = "";
    oldstudentarr.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.firstname + "</td>";
        html += "<td>" + element.lastname + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.phnumber + "</td>";
        html += "<td>" + element.location + "</td>";
        html += "<td>" + element.mail + "</td>";
        html += "<td class = 'action'><button onclick='olddeleteData(" + index + ")' class='btn btn-danger'>Permanent Delete</button><button onclick='addoldData(" + index + ")' class='btn btn-success'>Restore</button><div class = 'mark'></div></td>";
        html += "</tr>";
        document.querySelector("#deleteddatatable tbody").innerHTML = html;

        var currentclassContent = document.querySelector(".currentclasscontent");
        var addstudentContent = document.querySelector(".contents");


        // firststandardContent.style.display = "block";
        currentclassContent.style.display = "none";
        addstudentContent.style.display = "none";
        var deletedstudentContent = document.querySelector(".oldstudentcontent");
        deletedstudentContent.style.display = "block";

        console.log(element.firstname);
        document.getElementById("arrayLength").textContent = oldstudentarr.length;
        ;

        document.querySelector(".oldstudentsearch").addEventListener("click", function () {
            let oldstudentsearch = document.querySelector(".inputcontent2").value;

            // Clear previous highlights
            // document.querySelectorAll("#deleteddatatable tbody tr").forEach(row => {
            //     row.classList.remove("highlighted"); // Remove the highlighted class
            // });

            // // Find and highlight matching row
            // oldstudentarr.forEach((element, index) => {
            //     if (element.phnumber == oldstudentsearch) {
            //         // Add the highlighted class to the matching row
            //         document.querySelector(``).classList.add("highlighted");
            //     }
            // });

            // Loop through oldstudentarr to find matching phone number
            oldstudentarr.forEach((element, index) => {
                if (element.phnumber == oldstudentsearch) {
                    // Highlight the row if it matches the search
                    let searchtable = document.querySelector(`#deleteddatatable tbody tr:nth-child(${index + 1})`)
                    document.querySelector(`#deleteddatatable tbody tr:nth-child(${index + 1}) .mark`).style.display = "block";
                    searchtable.parentNode.insertBefore(searchtable, searchtable.parentNode.firstChild);

                    document.querySelector(".inputcontent2").value = "";


                }
            });
            // document.querySelector(`#deleteddatatable tbody tr:nth-child(${index + 1}) .mark`).style.display = "none";


        })

    })

}

function olddeleteData(index) {

    let oldstudentarr;
    if (localStorage.getItem("oldstudentarr") == null) {
        studentlist = [];
    } else {
        oldstudentarr = JSON.parse(localStorage.getItem("oldstudentarr"));
    }


    oldstudentarr.splice(index, 1);
    localStorage.setItem("oldstudentarr", JSON.stringify(oldstudentarr));
    showdeleteddata();





}

function search() {
    let studentlist;
    if (localStorage.getItem("studentlist") == null) {
        studentlist = [];
    } else {
        studentlist = JSON.parse(localStorage.getItem("studentlist"));
    }
    let currstudentsearch = document.querySelector(".inputcontent1").value;



    // Loop through oldstudentarr to find matching phone number
    studentlist.forEach((element, index) => {
        if (element.phnumber == currstudentsearch) {
            // Highlight the row if it matches the search
            let searchtable = document.querySelector(`#datatable tbody tr:nth-child(${index + 1})`)
            document.querySelector(`#datatable tbody tr:nth-child(${index + 1}) .mark2`).style.display = "block";
            searchtable.parentNode.insertBefore(searchtable, searchtable.parentNode.firstChild);
            document.querySelector(".inputcontent1").value = "";

            console.log(element.phnumber);
            // document.querySelector(`#datatable tbody tr:nth-child(${index + 1}) .mark2`).style.display = "none";


        }
    });

}

function addoldData(index) {
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";


    let oldstudentarr;
    if (localStorage.getItem("oldstudentarr") == null) {
        oldstudentarr = [];
    } else {
        oldstudentarr = JSON.parse(localStorage.getItem("oldstudentarr"));
    }

    document.getElementById("firstname").value = oldstudentarr[index].firstname;
    document.getElementById("lastname").value = oldstudentarr[index].lastname;
    document.getElementById("age").value = oldstudentarr[index].age;
    document.getElementById("phnumber").value = oldstudentarr[index].phnumber;
    document.getElementById("location").value = oldstudentarr[index].location;
    document.getElementById("mail").value = oldstudentarr[index].mail;

    var currentclassContent = document.querySelector(".currentclasscontent");
    var addstudentContent = document.querySelector(".contents");
    var deletedstudentContent = document.querySelector(".oldstudentcontent");
    deletedstudentContent.style.display = "none";


    currentclassContent.style.display = "none";
    addstudentContent.style.display = "block";
    // oldstudentarr.splice(index, 1)[0];

    // document.querySelector("#update").onclick = function () {
    //     if (validationform() == true) {
    //         studentlist[index].firstname = document.getElementById("firstname").value;
    //         studentlist[index].lastname = document.getElementById("lastname").value;
    //         studentlist[index].age = document.getElementById("age").value;
    //         studentlist[index].phnumber = document.getElementById("phnumber").value;
    //         studentlist[index].location = document.getElementById("location").value;
    //         studentlist[index].mail = document.getElementById("mail").value;

    //         localStorage.setItem("studentlist", JSON.stringify(studentlist));
    //         showData();

    //         document.getElementById("firstname").value = "";
    //         document.getElementById("lastname").value = "";
    //         document.getElementById("age").value = "";
    //         document.getElementById("phnumber").value = "";
    //         document.getElementById("location").value = "";
    //         document.getElementById("mail").value = "";

    //         document.getElementById("submit").style.display = "block";
    //         document.getElementById("update").style.display = "none";

    //         // update and return to currrent student

    //         var currentclassContent = document.querySelector(".currentclasscontent");
    //         var addstudentContent = document.querySelector(".contents");
    //         var deletedstudentContent = document.querySelector(".oldstudentcontent");
    //         deletedstudentContent.style.display = "none";

    //         // firststandardContent.style.display = "block";
    //         currentclassContent.style.display = "block";
    //         addstudentContent.style.display = "none";



    //     }
    // }

}

function logout() {
    window.location.assign("signin.html");
}




function searchStudent() {
    const searchValue = document.querySelector('.inputcontent1').value;
    const rows = document.querySelectorAll('#datatable tbody tr');
    rows.forEach(row => {
        const name = row.cells[3].innerText;
        row.style.display = name.includes(searchValue) ? '' : 'none';
    });
}

function searcholdStudent() {
    const searchValue = document.querySelector('.inputcontent2').value;
    const rows = document.querySelectorAll('#deleteddatatable tbody tr');
    rows.forEach(row => {
        const name = row.cells[0].innerText + row.cells[1].innerText;
        row.style.display = name.includes(searchValue) ? '' : 'none';


    });
}

// new changes

