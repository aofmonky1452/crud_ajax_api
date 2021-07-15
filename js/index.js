var html, data;

$(document).ready(function() {
    render();
});

function render() {
    html = '';

    $.ajax({
        type: "POST",
        dataType: "JSON",
        url: "./api/get_movielist.php",
        data: {},
        success: function(response) {
            console.log("good", response);
            data = response.result;

            for(var i=0; i<data.length; i++) {
                html += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${data[i].name}</td>
                        <td>${data[i].type}</td>
                        <td>
                            <div class="btn-control">
                                <div onclick="open_modal_edit(${i}, ${data[i].id})" class="btn-edit">Edit</div>
                                <div onclick="delete_movielist(${data[i].id})" class="btn-delete">Delete</div>
                            </div>
                        </td>
                    </tr>
                `
            }
            $("#tbody").html(html);
        }, error: function(err) {
            console.log("bad", err);
        }
    })
}


function open_modal_create() {
    $("#modal_create").css("display", "flex");
}
var id_movie;
function open_modal_edit(index, id) {
    $("#modal_edit").css("display", "flex");
    $("#txt_edit_name").val(data[index].name);
    $("#txt_edit_type").val(data[index].type);
    id_movie = id;
}
function close_modal() {
    $(".modal").css("display", "none");
}

function delete_movielist(index) {
    Swal.fire({
        icon: 'warning',
        title: 'Are you sure to delete?',
        showConfirmButton: false,
        showDenyButton: true,
        showCancelButton: true,
        denyButtonText: `Delete`,
    }).then((result) => {
        if (result.isDenied) {
            $.ajax({
                type: "POST",
                dataType: "JSON",
                url: "./api/delete_movielist.php",
                data: {
                    id: index
                }, success: function(response) {
                    console.log("good", response);
                    render();
                }, error: function(err) {
                    console.log("bad", err);
                }
            })
            Swal.fire({
                icon: 'success',
                title: 'Delete success',
                text: 'delete movie list successfully'
            })
        }
    });
}

function validate_save() {
    var status = true;

    var txt_type = $("#txt_create_type");
    if( txt_type.val() == "" ) {
        Swal.fire({
            icon: 'error',
            title: 'Something went wrong!',
            text: 'Please fill type movie'
        })
        txt_type.css("border", "1px solid red");
        status = false;
    }
    else {
        txt_type.css("border", "unset");
        status = true;
    }

    var txt_name = $("#txt_create_name");
    if( txt_name.val() == "" ) {
        Swal.fire({
            icon: 'error',
            title: 'Something went wrong!',
            text: 'Please fill name movie'
        })
        txt_name.css("border", "1px solid red");
        status = false;
    }
    else {
        txt_name.css("border", "unset");
        status = true;
    }

    return status;
}
function save_movielist() {
    if( validate_save() ) {
        console.log("form submit successfully");

        $.ajax({
            type: "POST",
            dataType: "JSON",
            url: "./api/create_movielist.php",
            data: {
                name: $("#txt_create_name").val(),
                type: $("#txt_create_type").val()
            }, success: function(response) {
                console.log("good", response);
                if(response.result[0].code == 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Create success',
                        text: 'Create movie successfully'
                    });
                    $(".modal").css("display", 'none');
                    render();
                }
            }, error: function(err) {
                console.log("bad", err);
            }
        })


    }
}



function validate_edit() {
    var status = true;

    var txt_type = $("#txt_edit_type");
    if( txt_type.val() == "" ) {
        Swal.fire({
            icon: 'error',
            title: 'Something went wrong!',
            text: 'Please fill type movie'
        })
        txt_type.css("border", "1px solid red");
        status = false;
    }
    else {
        txt_type.css("border", "unset");
        status = true;
    }

    var txt_name = $("#txt_edit_name");
    if( txt_name.val() == "" ) {
        Swal.fire({
            icon: 'error',
            title: 'Something went wrong!',
            text: 'Please fill name movie'
        })
        txt_name.css("border", "1px solid red");
        status = false;
    }
    else {
        txt_name.css("border", "unset");
        status = true;
    }

    return status;
}
function update_movielist() {
    if( validate_edit() ) {
        console.log("form submit successfully");
        $.ajax({
            type: "POST",
            dataType: "JSON",
            url: "./api/update_movielist.php",
            data: {
                id: id_movie,
                name: $("#txt_edit_name").val(),
                type: $("#txt_edit_type").val()
            }, success: function(response) {
                console.log("good", response);
                if(response.result[0].code == 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Update success',
                        text: 'update movie list successfully'
                    });
                    $(".modal").css("display", 'none');
                    render();
                }
            }, error: function(err) {
                console.log("bad", err);
            }
        })
    }
}