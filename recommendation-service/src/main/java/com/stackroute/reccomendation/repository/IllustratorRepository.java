package com.stackroute.reccomendation.repository;

import com.stackroute.reccomendation.domain.Illustrator;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface IllustratorRepository extends Neo4jRepository<Illustrator,Long> {
}
