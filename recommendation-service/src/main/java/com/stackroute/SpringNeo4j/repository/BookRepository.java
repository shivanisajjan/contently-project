package com.stackroute.SpringNeo4j.repository;

import com.stackroute.SpringNeo4j.domain.Book;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface BookRepository extends Neo4jRepository<Book,Long> {




}
