package com.stackroute.SpringNeo4j.service;

import com.stackroute.SpringNeo4j.domain.Illustrator;
import com.stackroute.SpringNeo4j.repository.IllustratorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class IllustratorService {
    @Autowired
    IllustratorRepository illustratorRepository;

    public IllustratorService() {
    }

    public IllustratorService(IllustratorRepository illustratorRepository) {
        this.illustratorRepository = illustratorRepository;
    }

    public Illustrator saveIllustrator(Illustrator illustrator)
    {
        return illustratorRepository.save(illustrator);
    }

    public List<Illustrator> getAll()
    {
        return (List<Illustrator>) illustratorRepository.findAll();
    }
}
