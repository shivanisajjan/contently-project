package com.stackroute.recommendation.repository;

import com.stackroute.recommendation.domain.Book;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface BookRepository extends Neo4jRepository<Book,Long> {




}
