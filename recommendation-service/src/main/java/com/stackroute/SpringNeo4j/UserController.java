package com.stackroute.SpringNeo4j;

import com.stackroute.SpringNeo4j.domain.Book;
import com.stackroute.SpringNeo4j.domain.Editor;
import com.stackroute.SpringNeo4j.domain.Illustrator;
import com.stackroute.SpringNeo4j.domain.User;
import com.stackroute.SpringNeo4j.service.BookService;
import com.stackroute.SpringNeo4j.service.EditorService;
import com.stackroute.SpringNeo4j.service.IllustratorService;
import com.stackroute.SpringNeo4j.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("api/v1")
public class UserController {
    public UserController(UserService userService, BookService bookService) {
        this.userService = userService;
        this.bookService = bookService;
    }

    @Autowired
    UserService userService;
    @Autowired
    BookService bookService;
    @Autowired
    EditorService editorService;
    @Autowired
    IllustratorService illustratorService;



    @GetMapping("users")
    public Collection<User> getByName() {return userService.getAll();}

    @GetMapping("books/rec/{name}")
    public Collection<Book> getBookRec(@PathVariable String name){return userService.getBookRec(name);}

    @GetMapping("priceRec/{genre}")
    public int getPriceRec(@PathVariable String genre)
    {
        return userService.getBookPriceRec(genre);
    }

    @GetMapping("books/{id}")
    public Collection<Book> getIdRec(@PathVariable int id)
    {
        return userService.getIdRec(id);
    }

    @PostMapping("user")
    public User saveUser(@RequestBody User user)
    {
        return userService.saveUser(user);
    }


    @PostMapping("book")
    public Book saveBook(@RequestBody Book book)
    {
        return bookService.saveBook(book);
    }

    @PostMapping("editor")
    public Editor saveEditor(@RequestBody Editor editor){return editorService.saveEditor(editor);}


    @GetMapping("books")
    public Collection<Book> getAllBooks()
    {
        return bookService.getAll();
    }

    @GetMapping("editors")
    public Collection<Editor> getAllEditor(){return editorService.getAll();}

    @GetMapping("editor/rec/{genre}")
    public Collection<Editor> getEditorRec(@PathVariable String genre)
    {
        return userService.getEditorRec(genre);

    }
    @PostMapping("illustrator")
    public Illustrator saveIllustrator(@RequestBody Illustrator illustrator)
    {
        return illustratorService.saveIllustrator(illustrator);
    }

    @GetMapping("illustrators")
    public List<Illustrator> getIllustrator()
    {
        return illustratorService.getAll();
    }

}
