package com.stackroute.profileservice.model;

import jdk.jfr.MemoryAddress;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Interest {
    private String name;
    private List<Genre> genre;
}
