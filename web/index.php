<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require_once '../vendor/autoload.php';

$app = new \Slim\App;
$container = $app->getContainer();
$container['view'] = new \Slim\Views\PhpRenderer("./");
$container['helperDao'] = new HelperDao;

$app->add(function ($request, $response, $next) {
    $getArray = $request->getQueryParams();
    $token = $getArray['token'];

	$response = $next($request, $response);
    $response = $response->withStatus(401);

	return $response;
});

$app->get('/api/testJson/filter/{value}', function (Request $request, Response $response) {
    $filter = $request->getAttribute('value');
    $helperList = $this->helperDao->selectFiltering($filter);
    $response->getBody()->write(json_encode($helperList));

    return $response;
});

$app->get('/api/testJson/filter[/]', function (Request $request, Response $response) {
    $helperList = $this->helperDao->select();
    $response->getBody()->write(json_encode($helperList));

    return $response;
});

$app->get('/test', function (Request $request, Response $response) {
    $getArray = $request->getQueryParams();
    $token = $getArray['token'];

    $response->getBody()->write($token);
    return $response;
});

$app->get('/', function (Request $request, Response $response) {
    //In this call the middleware are skipped
    $response = $this->view->render($response, "index.html");
    return $response;
});

$app->run();
