<?php

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
        $sql = "select * from helper";
        try {
            $conn = $this->connect();
            $statement = $conn->prepare($sql);
            $statement->execute();

            foreach ($statement->fetchAll() as $row) {
                $helperList[] = new Person(
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

    function selectFiltering($filter) {
        $helperList = array();
        $sql = "select * from helper where " .
        "nation like :nation or " .
        "country like :country or " .
        "faculty like :faculty";
        $filter = "%".$filter."%";
        try {
            $conn = $this->connect();
            $statement = $conn->prepare($sql);
            $statement->bindParam(':nation', $filter, PDO::PARAM_STR);
            $statement->bindParam(':country', $filter, PDO::PARAM_STR);
            $statement->bindParam(':faculty', $filter, PDO::PARAM_STR);
            //$statement->execute(array(':name' => "Jimbo"));
            $statement->execute();

            foreach ($statement->fetchAll() as $row) {
                $helperList[] = new Person(
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

    function insert($helper) {
        $sql = "insert into helper values" .
        "(:email, :name, :surname, :nation, :country, :faculty)";
        try {
            $conn = $this->connect();
            $statement = $conn->prepare($sql);
            $statement->bindParam(':email', $helper->email, PDO::PARAM_STR);
            $statement->bindParam(':name', $helper->name, PDO::PARAM_STR);
            $statement->bindParam(':surname', $helper->surname, PDO::PARAM_STR);
            $statement->bindParam(':nation', $helper->nation, PDO::PARAM_STR);
            $statement->bindParam(':country', $helper->country, PDO::PARAM_STR);
            $statement->bindParam(':faculty', $helper->faculty, PDO::PARAM_STR);
            $statement->execute();
        } finally {
            $conn=null;
        }
    }
}
