package com.stackroute.recommendation.repository;

import com.stackroute.recommendation.domain.Illustrator;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface IllustratorRepository extends Neo4jRepository<Illustrator,Long> {
}
