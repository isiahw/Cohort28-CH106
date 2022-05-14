const iconImportant = "iImportnat fas fa-star";
const iconNonImportant = "iImportant far fa-star";
var important = false;
var panelVisible = true;

function toggleImportance() {
    if(important) {
        // from imp to not imp
    $("#iImportant").removeClass(iconNonImportant).addClass(iconImportant);
    important = false;
    } else {
        // non imp to imp
        $("#iImportant").removeClass(iconNonImportant).addClass(iconImportant)
        important = true;
    }
}

function togglePanel() {
    if(panelVIsible) {
        $("#form").hide();
        panelVisible = false;
    } else {
        $("#form").show();
        panelVisible = true;
    }

}

function saveTask() {
    let title = $("#txtTitle").val();
    let desc = $("#txtDesc").val();
    let dueDate = $("#selDate").val();
    let location = $("#selLocation").val();
    let invites = $("#selInvites").val();
    let color = $("#selColor").val();
    let frequency = $("#selFrequency").val(); 
    let status = $("#selStatus").val();


    // create an object
    let task = new Task(important,title, desc, dueDate, location, invite, color,frequency,status);
    console.log(task);
    displayTask(task);
 }

 function getStatusText(status) {
    switch (status) {
        case "1":
            return "pending";
        case "2":
            return "In progress";
        case "3":
            return "Paused";
        case "4":
            return "completed";
        case "5":
            return "Abandoned";
        
            default:
                return "other";
    }
}

function getFreqencyText(val) {
    awitch(val) {
        case "0";
            return "one Time";
        case "1";
            return "one time";
        case "2";
            return "Weekly";
        case "0";
            return "";
    }
}

    function displayTask(task) {
        let syntax = `<div class="task-item">
        <div class="info-1">
            <h5>${task.title}</h5>
            <p>${task.description}</p>
        </div>

        <div class="info-2">
            <label>${task.dueDate}</label>
            <label>${task.location}</label>
        </div>

        <div class="info-3">
            <p>${task.invites}</p>
        </div>

        <div class=info-2>
            <label>${getStatusText(task.status)}</label>
            <label>${getFrequencyText(task.frequency)}</labels>

    </div>`;
    

    $.ajax({
        type: "post",
        url: "https://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(task),
        contentType: "application/json",
        success: function(res) {
            console.log("Task saved", res);
            displayTask(task);
            clearForm();
    },

        error: function(errorDetails) {
            console.error("Save failed", errorDetails);

        }
    });
     
}

function clarForm() {

}


    
    
    function fetchTasks() {
        $.ajax({
            type: "Get",
            url: "https://fsdiapi.azurewebsites.net/api/tasks",
            success: function(res) {
                let data = JSON.parse(res); // (decode) from string toobj


                /**
                 * create a total var
                 * 
                 * travel the array
                 * if the tasks is yours, increase the total by 1
                 */

                for (let i =0; i < data.length; i++) {
                    let task = data[i];

                    // if the name attribute of task object is equal to your name,
                    if(task.name == "Raymond W.") {
                        //total = total + 1;
                        total += 1;
                        displayTask(task);
                    }
                }

                // set the text to the heading
                $("#headCount").text("You have " + total + " tasks")
                console.log(res);

            },
        })
    };
}


}

function clearAllTasks() {
    // ajax DELETE req
    // /api/tasks/clear/<name>
    $.ajax({
        type: "delete",
        url: "https://fsdiapi.azurewebsites.net/api/tasks/clear/Raymond",
    })
}

function init() {
    console.log("Task manager page");

    // assign events
    $("#iImportant").click(toggleImportance);
    $("#btnTogglePanel").click(togglePanel);
    $("#btnSave").click(saveTask);
    

    // load data
    fetchTasks();
}

window.onload = init;

// DELETE reg
// /api/products/clear/<ame>
