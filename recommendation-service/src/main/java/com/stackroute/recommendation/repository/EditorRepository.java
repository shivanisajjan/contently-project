package com.stackroute.recommendation.repository;

import com.stackroute.recommendation.domain.Editor;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface EditorRepository extends Neo4jRepository<Editor,Long> {


}
