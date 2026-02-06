<?php
require_once ('BaseManager.php');
require_once ('db/DB.php');
require_once ('userManager/UserManager.php');

class Application {
    function __construct() {
        $db = new DB();
        $this->user = new UserManager($db);
    }

    public function login($params) {
        if ($params['login'] && $params['passwordHash']) {
            return $this->user->login($params['login'], $params['passwordHash'], $params['rnd']);
        }
        return ['error' => 242];
    }

    public function logout($params) {
        if ($params['token']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->user->logout($params['token']);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    public function registration($params) {
        if ($params['login'] && $params['passwordHash'] && $params['nickname']) {
            return $this->user->registration($params['login'], $params['passwordHash'], $params['nickname']);
        }
        return ['error' => 242];
    }

    public function getUserInfo($params) {
        if ($params['token']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->user->getUserInfo($user->id);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    public function deleteUser($params) {
        if ($params['token']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->user->deleteUser($params['token']);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    public function getRatingTable($params) {
        if ($params['token']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->user->getRatingTable();
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

}
