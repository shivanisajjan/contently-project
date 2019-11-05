package com.stackroute.SpringNeo4j.domain;


import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;

import java.util.List;

@NodeEntity
public class User {
    public User() {
    }

    public User(Long id, String name, String nationality, String ageGroup, String gender) {
        this.id = id;
        this.name = name;
        this.nationality = nationality;
        this.ageGroup = ageGroup;
        this.gender = gender;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getNationality() {
        return nationality;
    }

    public String getAgeGroup() {
        return ageGroup;
    }

    public String getGender() {
        return gender;
    }

    @Id@GeneratedValue
    private Long id;
    private String name;
    private String nationality;
    private String ageGroup;
    private String gender;
    /*
    a,b,c,d,e

    */




}
