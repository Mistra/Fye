<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once '../vendor/autoload.php';

$app = new \Slim\App;
$container = $app->getContainer();
$container['view'] = new \Slim\Views\PhpRenderer("./");

$app->get('/hello/{name}', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');
    $response->getBody()->write("Hello, $name");

    return $response;
});

$app->get('/api/testJson/filter/{value}', function (Request $request, Response $response) {
    $filter = $request->getAttribute('value');

    $helperDao = new HelperDao;
    $helperList = $helperDao->selectFiltering($filter);
    $response->getBody()->write(json_encode($helperList));

    return $response;
});

$app->get('/api/testJson/filter/', function (Request $request, Response $response) {
    $helperDao = new HelperDao;
    $helperList = $helperDao->select();
    $response->getBody()->write(json_encode($helperList));

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
    $response = $this->view->render($response, "index.html");
    return $response;
});

$app->run();
