<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';
require './person.php';

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
    $response->getBody()->write(json_encode($peopleArray, JSON_FORCE_OBJECT));

    return $response;
});

$app->get('/api/testJson/filter', function (Request $request, Response $response) {
    //$name = $request->getAttribute('value');

    $var = new person("gino", "pini", "pini@email", "Italia", "Parma", "biologia");
    $var2 = new person("gino", "pini", "pin@email", "Italia", "Parma", "biologia");
    $peopleArray = array();
    $peopleArray[] = $var;
    $peopleArray[] = $var2;
    $response->getBody()->write(json_encode($peopleArray));

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
