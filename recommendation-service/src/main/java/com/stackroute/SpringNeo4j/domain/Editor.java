package com.stackroute.SpringNeo4j.domain;

import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;

@NodeEntity
public class Editor {
    @Id@GeneratedValue
    Long id;
    double ratings;
    String name;
    boolean status;

    public Editor() {
    }

    public Editor(Long id, int ratings, String name, boolean status) {

        this.id = id;
        this.ratings = ratings;
        this.name = name;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public double getRatings() {
        return ratings;
    }

    public String getName() {
        return name;
    }

    public boolean isStatus() {
        return status;
    }
}

