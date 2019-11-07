package com.stackroute.reccomendation.service;

import com.stackroute.reccomendation.domain.Editor;
import com.stackroute.reccomendation.repository.EditorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class EditorService {
    @Autowired
    EditorRepository editorRepository;

    public EditorService(EditorRepository editorRepository) {
        this.editorRepository = editorRepository;
    }

    public Editor saveEditor(Editor editor)
    {
        return editorRepository.save(editor);

    }

    public Collection<Editor> getAll()
    {

        return (Collection<Editor>) editorRepository.findAll();
    }
}
