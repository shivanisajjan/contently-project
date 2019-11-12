package com.stackroute.reccomendation.domain;

import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;

@NodeEntity
public class Book {

    public Book() {
    }

    public int getIdd() {
        return idd;
    }

    public void setIdd(int idd) {
        this.idd = idd;
    }

    public Book(Long bookId, String bookName, String bookRating, double price,int idd,int timesPurchased,String description) {
        this.bookId = bookId;
        this.bookName = bookName;
        this.bookRating = bookRating;
        this.bookPrice = price;
        this.idd = idd;
        this.timesPurchased=timesPurchased;
        this.description=description;
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

    public int getTimesPurchased() {
        return timesPurchased;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Id@GeneratedValue
    private Long bookId;

    public void setTimesPurchased(int timesPurchased) {
        this.timesPurchased = timesPurchased;
    }

    int idd;
    private String bookName;
    private String bookRating;
    private double bookPrice;
    private int timesPurchased;
    private String description;




}
