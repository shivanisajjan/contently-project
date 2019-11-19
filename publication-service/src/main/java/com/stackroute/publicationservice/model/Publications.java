package com.stackroute.publicationservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document
public class Publications {


    @Id
    int id;
    @TextIndexed(weight=3)
    String title;
    String description;
    @TextIndexed String  authorName;
    String  editorName; // list of userId of editors
    String designerName; // list of userId of designer
    @TextIndexed String typeName;
    @TextIndexed List<String> genres;
    List<Status> status;
    String  createdAt;
    double price;
    String publishedAt;
    int noOfViews;
    int noOfPurchases;
    double rating;
    List<Comment> comments;
}
