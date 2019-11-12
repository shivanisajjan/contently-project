package com.stackroute.reccomendation;

import com.stackroute.reccomendation.domain.Book;
import com.stackroute.reccomendation.domain.Editor;
import com.stackroute.reccomendation.domain.Illustrator;
import com.stackroute.reccomendation.domain.User;
import com.stackroute.reccomendation.service.BookService;
import com.stackroute.reccomendation.service.EditorService;
import com.stackroute.reccomendation.service.IllustratorService;
import com.stackroute.reccomendation.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
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

    @GetMapping("books/rec1/{name}")
    public Collection<Book> getBookRec(@PathVariable String name){return userService.bookReccomendation(name);}

    @GetMapping("books/trending")
    public Collection<Book> getTrending(@PathVariable String name){return userService.getTrending();}

    @GetMapping("books/rec2/{name}")
    public Collection<Book> getRecAccProfile(@PathVariable String name){return userService.getRecAccProfile(name);}

    @GetMapping("books/rec3/{name}")
    public Collection<Book> getRecAccAuthor(@PathVariable String name){return userService.getRecAccAuth(name);}

    @GetMapping("editor/{genre}")
    public Collection<User> getEditorRec(@PathVariable String genre){return userService.getEditorRec(genre);}

    @GetMapping("illustrator/{genre}")
    public Collection<User> getillustratorRec(@PathVariable String genre){return userService.getIllustratorRec(genre);}









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


    @GetMapping("books")
    public Collection<Book> getAllBooks()
    {
        return bookService.getAll();
    }

}