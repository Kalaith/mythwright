<?php

declare(strict_types=1);

use Illuminate\Database\Capsule\Manager as Capsule;

$capsule = new Capsule;

$requiredEnv = static function (string $name): string {
    if (!array_key_exists($name, $_ENV) || !is_string($_ENV[$name]) || trim($_ENV[$name]) === '') {
        throw new RuntimeException("Missing required environment variable: {$name}");
    }

    return trim($_ENV[$name]);
};

$configuredEnv = static function (string $name): string {
    if (!array_key_exists($name, $_ENV) || !is_string($_ENV[$name])) {
        throw new RuntimeException("Missing required environment variable: {$name}");
    }

    return trim($_ENV[$name]);
};

$driver = strtolower($requiredEnv('DB_DRIVER'));

if ($driver !== 'mysql') {
    throw new RuntimeException('Unsupported DB driver. Writers Studio requires MySQL.');
}

$capsule->addConnection([
    'driver' => 'mysql',
    'host' => $requiredEnv('DB_HOST'),
    'port' => $requiredEnv('DB_PORT'),
    'database' => $requiredEnv('DB_DATABASE'),
    'username' => $requiredEnv('DB_USERNAME'),
    'password' => $configuredEnv('DB_PASSWORD'),
    'charset' => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
    'prefix' => $configuredEnv('DB_PREFIX'),
]);

$capsule->setAsGlobal();
$capsule->setEventDispatcher(new \Illuminate\Events\Dispatcher());
$capsule->bootEloquent();

return $capsule;
