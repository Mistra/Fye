<?php

class Person {

    function __construct($name, $surname, $email, $nation, $country, $faculty) {
        $this->name = $name;
        $this->surname = $surname;
        $this->email = $email;
        $this->nation = $nation;
        $this->country = $country;
        $this->faculty = $faculty;
    }

    public $name;
    public $surname;
    public $email;
    public $nation;
    public $country;
    public $faculty;

    function getName() {
        return $this->name;
    }
}
