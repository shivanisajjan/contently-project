package com.stackroute.reccomendation.repository;

import com.stackroute.reccomendation.domain.Book;
import com.stackroute.reccomendation.domain.Editor;
import com.stackroute.reccomendation.domain.User;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.repository.query.Param;

import java.util.Collection;

public interface UserRepository extends Neo4jRepository<User, Long> {


    @Query("match(a:User{name: {namep} }) return a")
    Collection<User> findbyname(@Param("namep") String namea);

    @Query("match (g:Genre),(a:User{name:{username}})-[:bought]->(v:Book)<-[:bought]-(b:User)-[:bought]->(k:Book) where (v)-[:has_genre]->(g)<-[:has_genre]-(k) return distinct k")
    Collection<Book> bookReccomendation(@Param("username") String name);                //main book recommendation



    @Query("match(u:User),(b:Book),(g:Gender),(a:AgeGroup) where g.name={gender} and a.name={agegroup} and (u)-[:has_gender]->(g) and (u)-[:bought]->(b) return b")
    Collection<Book> getRecAccProfile(@Param("agegroup") String agegroup,@Param("gender") String gender);



    @Query("MATCH (n:genre{name:{genre}}) return (n.likes * n.pop)")
    int getBookPriceRec(@Param("genre") String genre);



    @Query("match(e:Editor),(g:genre{name:{genre}}),(e)-[w:workson]->(g) where e.status=false return e order by e.rating")
    Collection<Editor> getEditorRec(@Param("genre") String genre);   //editor recc

    @Query("match(a:users),(b:users),(v:Book),(k:Book) where id(a)={id} and (a)-[:bought]->(v)<-[:bought]-(b)-[:bought]->(k) and v.bookGenre = k.bookGenre return distinct k")
    Collection<Book> getIdRec(@Param("id") int id);

//    @Query("LOAD CSV WITH HEADERS FROM \"file:///temp.csv\" AS csvLine\n" +
//            "CREATE (u:User {id: toInteger(csvLine.id), name: csvLine.name})")
//    void dop();

    @Query("LOAD CSV WITH HEADERS FROM \"file:///users.csv\" AS csvLine\n" +
            "MERGE (g:Gender {name: csvLine.gender})\n" +"MERGE (n:Nationality {name: csvLine.nationality})\n"+"MERGE (a:AgeGroup {name: csvLine.agegroup})\n" +
            "CREATE (u:User {idd: toInteger(csvLine.id), name: csvLine.name})\n" +
            "CREATE (u)-[:has_gender]->(g)\n"+"CREATE (u)-[:has_nationality]->(n)\n"+"CREATE (u)-[:has_agegroup]->(a)")
    void dop();

    @Query("LOAD CSV WITH HEADERS FROM \"file:///books.csv\" AS csvLine\n" +
            "MERGE (g:Genre {name: csvLine.genre})\n" +"MERGE (t:Type {name: csvLine.type})\n"+
            "CREATE (b:Book {idd: toInteger(csvLine.id), bookName: csvLine.name})\n" +
            "CREATE (b)-[:has_genre]->(g)\n"+"CREATE (b)-[:has_type]->(t)")
    void pop();

    @Query("LOAD CSV WITH HEADERS FROM \"file:///bought.csv\" AS csvLine\n" +
            "MATCH (u:User {idd: toInteger(csvLine.uid)}),(b:Book {idd: toInteger(csvLine.mid)})\n" +
            "CREATE (u)-[:bought]->(b)")
    void bob();



}
