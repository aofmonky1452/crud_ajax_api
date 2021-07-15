<?php
    require_once('./dbconfig.php');

    if($_SERVER['REQUEST_METHOD'] == "POST") {
        try {
            $name = $_POST['name'];
            $type = $_POST['type'];

            $items_arr = array();
            $items_arr['result'] = array();

            for($i=0; $i<2; $i++) {
                if($i == 1) {
                    $val = $val . "?";
                } else {
                    $val = $val . "?,";
                }
            }

            $query = "INSERT INTO TBL_MOVIELIST (`name`, `type`) VALUES (". $val .")";
            $stmt = $db->prepare($query);
            if($stmt->execute([
                $name, $type
            ])) {
                $items = array(
                    "msg" => "success",
                    "code" => 200
                );
                array_push($items_arr['result'], $items);
                echo json_encode($items_arr);
                http_response_code(200);
            }
        }
        catch(PDOException $e) {
            echo $e->getMessage();
        }
    }
    else {
        http_response_code(405);
    }
?>