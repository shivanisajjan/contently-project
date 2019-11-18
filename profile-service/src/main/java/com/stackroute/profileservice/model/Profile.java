package com.stackroute.profileservice.model;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Profile {
    @Id
    private int id;
    private String username;
    private String role;
    private List<Interest> interest;
    private Long ratings;
    private int experience;
    private double cost;
    private List<Chapter> chapterRelease;
}
