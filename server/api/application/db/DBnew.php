<?php
class DB {
    private $pdo;

    function __construct() {
        $host = DB_HOST;
        $port = DB_PORT;
        $user = DB_USER;      
        $pass = DB_PASS;          
        $db = DB_NAME;
        $charset = DB_CHARSET;  
        $connect = "mysql:host=$host;port=$port;dbname=$db;charset=$charset";
        $this->pdo = new PDO($connect, $user, $pass);
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function __destruct() {
        $this->pdo = null;
    }

    private function execute($sql, $params = []) {
        $sth = $this->pdo->prepare($sql);
        return $sth->execute($params);
    }

    private function query($sql, $params = []) {
        $sth = $this->pdo->prepare($sql);
        $sth->execute($params);
        return $sth->fetch(PDO::FETCH_OBJ);
    }

    private function queryAll($sql, $params = []) {
        $sth = $this->pdo->prepare($sql);
        $sth->execute($params);
        return $sth->fetchAll(PDO::FETCH_ASSOC);
    }

    // user
    public function getUserByLogin($login) {
        return $this->query("SELECT * FROM users WHERE login=?", [$login]);
    }

    public function getUserByToken($token) {
        return $this->query("SELECT * FROM users WHERE token=?", [$token]);
    }

    public function getUserById($id) {
        return $this->query("SELECT * FROM users WHERE id = ?", [$id]);
    }

    public function updateToken($userId, $token) {
        $this->execute("UPDATE users SET token=? WHERE id=?", [$token, $userId]);
    }

    public function registration($login, $password, $nickname) {
        $this->execute("INSERT INTO users (login, password, nickname) VALUES (?, ?, ?)", [$login, $password, $nickname]);
    }

    public function getRatingTable() {
        return $this->queryAll("
            SELECT 
                u.nickname,
                c.rating
            FROM characters c
            JOIN users u ON c.user_id = u.id
            WHERE c.rating > 0
            ORDER BY c.rating DESC
            LIMIT 20
        ");
    }

    public function getUserSelectedClassId($userId) {
        $character = $this->getCharacterByUserId($userId);
        if (!$character) return null;
        
        $result = $this->query(
            "SELECT class_id FROM characters_classes WHERE character_id = ? AND selected = 1",
            [$character->id]
        );
        
        return $result ? $result->class_id : null;
    }

    public function getUserPurchasedItemsWithQuantity($characterId) {
        $results = $this->queryAll(
            "SELECT item_id as itemId, quantity FROM character_items WHERE character_id = ?",
            [$characterId]
        );
        
        $items = [];
        foreach ($results as $row) {
            $items[] = [
                'itemId' => (int)$row['itemId'],
                'quantity' => (int)$row['quantity']
            ];
        }
        
        return $items;
    }

    public function getCharacterByUserId($userId) {
        return $this->query("SELECT * FROM characters WHERE user_id = ?", [$userId]);
    }

    public function createCharacter($userId) {
        return $this->execute(
            "INSERT INTO characters (user_id, hp, defense, money) VALUES (?, 100, 0, 1000)",
            [$userId]
        );
    }

    public function addUserPersonClass($userId, $classId) {
        $character = $this->getCharacterByUserId($userId);
        if (!$character) return false;
        return $this->execute(
            "INSERT INTO characters_classes (character_id, class_id, selected) VALUES (?, ?, 0)",
            [$character->id, $classId]
        );
    }

    public function setUserSelectedPersonClass($userId, $classId) {
        $character = $this->getCharacterByUserId($userId);
        if (!$character) return false;
        return $this->execute(
            "UPDATE characters_classes SET selected = 1 WHERE character_id = ? AND class_id = ?",
            [$character->id, $classId]
        );
    }

    public function getUserTypeInRoom($userId) {
        $character = $this->getCharacterByUserId($userId);
        if (!$character) return false;
        return $this->query("SELECT type, room_id as roomId FROM room_members WHERE character_id=?", [$character->id]);
    }

    // test
    public function deleteUser($userId) {
        return $this->execute("DELETE FROM users WHERE id=?", [$userId]);
    }

    public function deleteAllCharacterClasses($characterId) {
        return $this->execute("DELETE FROM characters_classes WHERE character_id = ?", [$characterId]);
    }
}
