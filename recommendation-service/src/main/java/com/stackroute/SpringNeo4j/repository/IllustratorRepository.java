package com.stackroute.SpringNeo4j.repository;

import com.stackroute.SpringNeo4j.domain.Illustrator;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface IllustratorRepository extends Neo4jRepository<Illustrator,Long> {
}
