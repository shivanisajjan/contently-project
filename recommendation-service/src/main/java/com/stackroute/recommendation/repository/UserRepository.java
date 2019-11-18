package com.stackroute.recommendation.repository;

import com.stackroute.recommendation.domain.Book;
import com.stackroute.recommendation.domain.User;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

public interface UserRepository extends Neo4jRepository<User, Long> {



    @Query("match (g:Genre),(a:User{name:{username}})-[:bought]->(v:Book)<-[:bought]-(b:User)-[:bought]->(k:Book) where (v)-[:has_genre]->(g)<-[:has_genre]-(k) return distinct k")
    Collection<Book> bookReccomendation(@Param("username") String name);                // book recommendation




    @Query("match(u:User),(uu:User),(b:Book),(g:Gender),(a:AgeGroup) where u.name= {username} and (u)-[:has_gender]->(g)<-[:has_gender]-(uu) and  (u)-[:has_agegroup]->(a)<-[:has_agegroup]-(uu) and (uu)-[:bought]->(b) return b")
    Collection<Book> getRecAccProfile(@Param("username") String username); //working


    @Query("match(u:User),(r:Role{name:'e'}),(s:Status{name:'f'}) where (u)-[:has_status]->(s) and (u)-[:has_role]->(r) return u")
    Collection<User> getEditorRec(@Param("genre") String genre);   //editor recc

    @Query("match(u:User),(r:Role{name:'i'}),(s:Status{name:'f'}) where (u)-[:has_status]->(s) and (u)-[:has_role]->(r) return u")
    Collection<User> getIllustratorRec(@Param("genre") String genre);   //illustrator recc

    @Query("match(u:User{name:{author}})\n"+"match(e:User{name:{editor}})\n"+"match(d:User{name:{designer}})\n"+"match (g:genre{name:{genre}})\n"+"match (t:Type{name:{type}})\n"+"create(b:Book{bookName:{title},bookId:{bookId},bookPrice:{price},nop:{nop}})\n"+"create (u)-[:has_wrote]->(b)\n"+"create (e)-[:has_edited]->(b)\n"+"create (d)-[:has_designed]->(b)\n"+"create (b)-[:has_genre]->(g)\n"+"create (b)-[:has_type]->(t)")
    void savePublication(@Param("title") String title,@Param("author") String author,@Param("bookId") int bookId,@Param("editor") String editor,@Param("designer") String designer,@Param("nop") int nop,@Param("price") double price,@Param("genre") String genre,@Param("type") String type);

    @Query("match (u:User{name:{username}}),(b:Book{bookId:{bookId}})\n"+"set b.nop=b.nop+1\n"+
            "create (u)-[:bought]->(b)")
    void savePurchasing(@Param("bookId") int bookId,@Param("username") String username);

    @Query("match(b:Book) Return b" +
            "Order by b.created_at desc" +
            ",b.nop desc  Limit 15  ")
    Collection<Book> getTrending();


    @Query("match(u:User{name: {username} }),(b:Book),(c:Book),(a:User) where (u)-[:bought]->(b)<-[:has_authored]-(a)-[:has_authored]->(c) return c")
    Collection<Book> getRecAccAuth(@Param("username") String username);

    @Query("match(g:Genre{name:{genre}})<-[:has_genre]-(b:Book)<-[r:bought]-(u:User) Return u  Order by r.created_at desc  Limit 1000")
    List<User> getPriceRec(@Param("genre") String genre);

    @Query("LOAD CSV WITH HEADERS FROM \"file:///users.csv\" AS csvLine\n" +
            "MERGE (g:Gender {name: csvLine.gender})\n" +
            "MERGE (n:Nationality {name: csvLine.nationality})\n"+
            "MERGE (a:AgeGroup {name: csvLine.agegroup})\n" +
            "MERGE (s:Status {name: csvLine.status})\n" +
            "MERGE (r:Role {name: csvLine.role})\n" +
            "CREATE (u:User {idd: toInteger(csvLine.id), name: csvLine.name})\n" +
            "CREATE (u)-[:has_gender]->(g)\n"+
            "CREATE (u)-[:has_status]->(s)\n"+
            "CREATE (u)-[:has_role]->(r)\n"+
            "CREATE (u)-[:has_nationality]->(n)\n"+
            "CREATE (u)-[:has_agegroup]->(a)")
    void dop();

    @Query("LOAD CSV WITH HEADERS FROM \"file:///books.csv\" AS csvLine\n" +
            "            MERGE (g:Genre {name: csvLine.genre})\n" +
            "            MERGE (t:Type {name: csvLine.type})\n" +
            "            MERGE (u:User {name: csvLine.author}) \n" +
            "            CREATE (b:Book {idd: toInteger(csvLine.id), bookName: csvLine.name, timesPurchased: toInteger(csvLine.noofpurchases) , description: csvLine.description })\n" +
            "            CREATE (b)-[:has_genre]->(g)\n" +
            "            CREATE (u)-[:has_authored]->(b)\n" +
            "            CREATE (b)-[:has_type]->(t)")
    void pop();

    @Query("LOAD CSV WITH HEADERS FROM \"file:///bought.csv\" AS csvLine\n" +
            "MATCH (u:User {idd: toInteger(csvLine.uid)}),(b:Book {idd: toInteger(csvLine.mid)})\n" +
            "CREATE (u)-[:bought]->(b)")
    void bob();



}