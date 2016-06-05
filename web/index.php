<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';
require_once './person.php';

interface Dao {
    public function select();
    //public function selectOne($id);
    //public function insert($object);
}

class HelperDao implements Dao {
    function __construct() {
        $this->host = "ec2-54-243-203-143.compute-1.amazonaws.com";
        $this->db = "dei6cvjl0ekm7s";
        $this->user = "wskvnrlsywglmk";
        $this->password = "qHjkBDEnqsU9rAAN1Zji94V608";
    }

    function connect() {
        return new PDO("pgsql:dbname=$this->db;host=$this->host", $this->user, $this->password);
    }

    function select() {
        $helperList = array();
        try {
            $conn = $this->connect();
            //$statement = $conn->prepare("select id from some_table where name = :name");
            $statement = $conn->prepare("select * from helper");
            //$statement->execute(array(':name' => "Jimbo"));
            $statement->execute();

            foreach ($statement->fetchAll() as $row) {
                $helperList[] = new person(
                $row["name"],
                $row["surname"],
                $row["email"],
                $row["nation"],
                $row["country"],
                $row["faculty"]);
            }
        } //catch(PDOException $e)
        finally {
            $conn=null;
        }
        return $helperList;
    }
}

$app = new \Slim\App;
$container = $app->getContainer();
$container['view'] = new \Slim\Views\PhpRenderer("./");

$app->get('/hello/{name}', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');
    $response->getBody()->write("Hello, $name");

    return $response;
});

$app->get('/api/testJson/filter/{value}', function (Request $request, Response $response) {
    $name = $request->getAttribute('value');

    $var = new person("gino", "pini", "pini@email", "Italia", "Parma", "biologia");
    $peopleArray = array();
    $peopleArray[] = $var;
    $peopleArray[] = $var;
    $response->getBody()->write(json_encode($peopleArray));

    return $response;
});

$app->get('/api/testJson/filter', function (Request $request, Response $response) {
    $helperDao = new HelperDao;
    $helperList = $helperDao->select();
    $response->getBody()->write(json_encode($helperList));

    return $response;
});

$app->get('/api/test', function (Request $request, Response $response) {
    $helperDao = new HelperDao;
    $result = $helperDao->select();
    $response->getBody()->write(json_encode($result));

    return $response;
});

$app->get('/', function (Request $request, Response $response) {
    //$this->logger->addInfo("Ticket list");
    //$mapper = new TicketMapper($this->db);
    //$tickets = $mapper->getTickets();
    $response = $this->view->render($response, "index.html");
    return $response;
});

$app->run();
