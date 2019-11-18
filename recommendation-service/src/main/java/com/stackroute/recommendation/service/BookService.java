package com.stackroute.recommendation.service;


import com.stackroute.recommendation.domain.Book;
import com.stackroute.recommendation.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class BookService {
    @Autowired
    BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public Collection<Book> getAll()
    {
        return (Collection<Book>) bookRepository.findAll();
    }
    public Book saveBook(Book book)
    {
        bookRepository.save(book);

        return book;

    }


}
