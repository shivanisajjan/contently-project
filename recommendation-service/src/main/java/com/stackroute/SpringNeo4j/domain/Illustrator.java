package com.stackroute.SpringNeo4j.domain;

import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;

@NodeEntity
public class Illustrator {

    @Id@GeneratedValue
    private Long id;
    private int ratings;
    private String name;
    private boolean status;


    public Illustrator() {
    }


    public Illustrator(int ratings, String name, boolean status) {
        this.ratings = ratings;
        this.name = name;
        this.status = status;
    }

    public int getRatings() {
        return ratings;
    }

    public String getName() {
        return name;
    }

    public boolean isStatus() {
        return status;
    }
}
