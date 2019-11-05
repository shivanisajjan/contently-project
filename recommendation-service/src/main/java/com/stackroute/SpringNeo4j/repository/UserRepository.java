package com.stackroute.SpringNeo4j.repository;

import com.stackroute.SpringNeo4j.domain.Book;
import com.stackroute.SpringNeo4j.domain.Editor;
import com.stackroute.SpringNeo4j.domain.User;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.repository.query.Param;

import java.util.Collection;

public interface UserRepository extends Neo4jRepository<User, Long> {


    @Query("match(a:users{name: {namep} }) return a")
    Collection<User> findbyname(@Param("namep") String namea);

    @Query("match(a:users{name:{namep}})-[:bought]->(v:Book)<-[:bought]-(b:users)-[:bought]->(k:Book) where v.bookGenre = k.bookGenre return distinct k")
    Collection<Book> bookReccomendation(@Param("namep") String name);                //main book recommendation


    @Query("match(a:users{name:'prakhar'})-[:bought]->(:Book)<-[:bought]-(b:users)-[:bought]->(k:Book) return k")
    Collection<Book> getAll();

    @Query("MATCH (n:genre{name:{genre}}) return (n.likes * n.pop)")
    int getBookPriceRec(@Param("genre") String genre);



    @Query("match(e:Editor),(g:genre{name:{genre}}),(e)-[w:workson]->(g) where e.status=false return e order by e.rating")
    Collection<Editor> getEditorRec(@Param("genre") String genre);   //editor recc

    @Query("match(a:users),(b:users),(v:Book),(k:Book) where id(a)={id} and (a)-[:bought]->(v)<-[:bought]-(b)-[:bought]->(k) and v.bookGenre = k.bookGenre return distinct k")
    Collection<Book> getIdRec(@Param("id") int id);


}
