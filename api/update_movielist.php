<?php
    require_once('./dbconfig.php');

    if($_SERVER['REQUEST_METHOD'] == "POST") {
       
        $id = $_POST['id'];
        $name = $_POST['name'];
        $type = $_POST['type'];

        $query = "UPDATE `TBL_MOVIELIST` SET `name` = '".$name."', `type` = '".$type."' WHERE id = '".$id."' ";
        $stmt = $db->prepare($query);
        $stmt->execute();

        $items_arr = array();
        $items_arr['result'] = array();

        $items = array(
            "msg" => "success",
            "code" => 200
        );
        array_push($items_arr['result'], $items);
        echo json_encode($items_arr);

        http_response_code(200);
    }
    else {
        http_response_code(405);
    }
?>