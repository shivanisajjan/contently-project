package com.stackroute.reccomendation.domain;


import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class UserDto {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String dob;
    private String role = "reader/author";
    private String email;
    private Long phoneNumber;
    private String gender;
    private String nationality;
    private String addressLine1;
    private String addressLine2;
    private String addressLine3;

}