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
    List<String>  editorName; // list of userId of editors
    List<String> designerName; // list of userId of designer
    String typeName;
    List<String> genres;
    double price;
    String publishedAt;
    int noOfPurchases;
    double rating;

}
