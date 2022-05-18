var filter = "None";
var opt = "None";
function jsonParse(text) {
    let json;
    try {
        json = JSON.parse(text);
    } catch (e) {
        return false;
    }
    return json;
}

function get_filtered_by_type(){
    // let ajax = new fetch({
    //     type: 'POST',
    //     url: 'getAllFilesByType.php',
    //     data: $('#select-type').find(':selected').text(),
    //     method: 

    // }

    // We create a request
    var ajax = new XMLHttpRequest();

    // We define a function to be executed then the ready state is changed, so
    // in our case when the request is finished and the response is ready
    ajax.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            // We take our table, in which we will place the data
            let table = document.getElementsByTagName("table")[0];
            let oldTableBody = document.getElementsByTagName("tbody")[0];

            // We create a new ody for the table
            let newTableBody = document.createElement('tbody');
            
            // We take the response and convert it into an array of objects
            let json = jsonParse(this.responseText);
            for(let i = 0; i < json.length; i++){
                // We take the object, insert a new row into the table body
                let document1 = json[i];
                let row = newTableBody.insertRow();
                // Then we parse the objects keys and on each of them, we apply a function,
                // which inserts in the previously added row, a new cell, and appends
                // the text from that attribute of the object to the cell
                Object.keys(document1).forEach(function (k){
                    let text;
                    let cell = row.insertCell();
                    text = document1[k];
                    cell.appendChild(document.createTextNode(text));
                })
            }
            // At the end, we replace the old body table with the new one
            table.appendChild(newTableBody);
            oldTableBody.parentNode.removeChild(oldTableBody);



            // $("#browse-tbody").empty();
            // table.removeChild(table.childNodes[2]);
            // table.replaceChild(newTableBody, oldTableBody);
        }
    }

    // We initialize the request
    ajax.open('POST', 'getAllFilesByType.php', true);
    // We take the choosen type for filter
    let type = document.getElementsByTagName("select")[0].value;
    // We convert the value type to a json string
    let json = JSON.stringify({'type': type});
    // We send the request to the server
    ajax.send(json);

    setPrevious("Type", type);

}


function get_filtered_by_format(){
    // We create a request
    var ajax = new XMLHttpRequest();

    // We define a function to be executed then the ready state is changed, so
    // in our case when the request is finished and the response is ready
    ajax.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            // We take our table, in which we will place the data
            let table = document.getElementsByTagName("table")[0];
            let oldTableBody = document.getElementsByTagName("tbody")[0];

            // We create a new ody for the table
            let newTableBody = document.createElement('tbody');
            
            // We take the response and convert it into an array of objects
            let json = jsonParse(this.responseText);
            for(let i = 0; i < json.length; i++){
                // We take the object, insert a new row into the table body
                let document1 = json[i];
                let row = newTableBody.insertRow();
                // Then we parse the objects keys and on each of them, we apply a function,
                // which inserts in the previously added row, a new cell, and appends
                // the text from that attribute of the object to the cell
                Object.keys(document1).forEach(function (k){
                    let text;
                    let cell = row.insertCell();
                    text = document1[k];
                    cell.appendChild(document.createTextNode(text));
                })
            }
            // At the end, we replace the old body table with the new one
            table.appendChild(newTableBody);
            oldTableBody.parentNode.removeChild(oldTableBody);
        }
    }

    // We initialize the request
    ajax.open('POST', 'getAllFilesByFormat.php', true);
    // We take the choosen type for filter
    let format = document.getElementsByTagName("select")[1].value;
    // We convert the value type to a json string
    let json = JSON.stringify({'format': format});
    // We send the request to the server
    ajax.send(json);

    setPrevious("Format", format);

}

function setPrevious(filt, option){
    document.getElementById("previous-filter").innerHTML = "Previously used: " + filter + " filter: " + opt;
    filter=filt;
    opt = option;

}

// function setTypeAsPrevious(type_){
//     document.getElementById("previous-filter").innerHTML = "Previously used: Type filter: " + type_;
// }

// function setFormatAsPrevious(format_){
//     document.getElementById("previous-filter").innerHTML = "Previously used: Format filter: " + format_;
// }