package com.stackroute.recommendation.domain;


import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;

@NodeEntity
public class User {
    public User() {
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", nationality='" + nationality + '\'' +
                ", ageGroup='" + ageGroup + '\'' +
                ", gender='" + gender + '\'' +
                '}';
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public void setIdd(int idd) {
        this.idd = idd;
    }

    public void setAgeGroup(String ageGroup) {
        this.ageGroup = ageGroup;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }



    public User(Long id, String name, String nationality, String ageGroup, String gender,int idd) {
        this.id = id;
        this.name = name;
        this.nationality = nationality;
        this.ageGroup = ageGroup;
        this.gender = gender;
        this.idd = idd;
    }

    public Long getId() {
        return id;
    }

    public int getIdd() {
        return idd;
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
    int idd;
    private String name;
    private String nationality;
    private String ageGroup;
    private String gender;
    /*
    a,b,c,d,e

    */




}
