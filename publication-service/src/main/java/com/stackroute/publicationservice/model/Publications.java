package com.stackroute.publicationservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document
public class Publications {


    @Id
    int id;
    String title;
    String description;
    String  authorName;
    List<String>  editorName; // list of userId of editors
    List<String> designerName; // list of userId of designer
    String typeName;
    List<String> genres;
//    List<String> targetedAudience;
    String  createdAt;
    double price;
    String gitUrl;
    String publishedAt;
    int noOfViews;
    int noOfPurchases;
    double rating;
    List<Comment> comments;
}
