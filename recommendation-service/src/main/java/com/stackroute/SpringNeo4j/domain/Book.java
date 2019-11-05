package com.stackroute.SpringNeo4j.domain;

import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;

@NodeEntity
public class Book {

    public Book() {
    }

    public Book(Long bookId, String bookName,  String bookRating, double price) {
        this.bookId = bookId;
        this.bookName = bookName;
        this.bookRating = bookRating;
        this.bookPrice = price;
    }

    public Long getBookId() {
        return bookId;
    }

    public String getBookName() {
        return bookName;
    }

    public String getBookRating() {
        return bookRating;
    }

    public double getBookPrice() {
        return bookPrice;
    }

    @Id@GeneratedValue
    private Long bookId;
    private String bookName;
    private String bookRating;
    private double bookPrice;




}
