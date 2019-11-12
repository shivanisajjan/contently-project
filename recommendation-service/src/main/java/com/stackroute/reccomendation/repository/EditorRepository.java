package com.stackroute.reccomendation.repository;

import com.stackroute.reccomendation.domain.Editor;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface EditorRepository extends Neo4jRepository<Editor,Long> {


}
