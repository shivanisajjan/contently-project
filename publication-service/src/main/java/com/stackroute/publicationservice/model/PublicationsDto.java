package com.stackroute.publicationservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Component
public class PublicationsDto {

    String title;
    String description;
    String  authorName;
    String  editorName; // list of userId of editors
    String designerName; // list of userId of designer
    String typeName;
    List<String> genres;
    double price;
    String publishedAt;
    int noOfPurchases;
    double rating;

}
