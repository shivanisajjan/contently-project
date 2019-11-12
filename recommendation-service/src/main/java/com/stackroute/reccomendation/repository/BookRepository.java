package com.stackroute.reccomendation.repository;

import com.stackroute.reccomendation.domain.Book;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface BookRepository extends Neo4jRepository<Book,Long> {




}
