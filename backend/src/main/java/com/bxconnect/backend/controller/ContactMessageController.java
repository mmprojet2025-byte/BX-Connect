package com.bxconnect.backend.controller;

import com.bxconnect.backend.entity.ContactMessage;
import com.bxconnect.backend.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactMessageController {

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    @PostMapping
    public ContactMessage envoyerMessage(@RequestBody ContactMessage contactMessage) {
        contactMessage.setDateEnvoi(LocalDateTime.now());
        return contactMessageRepository.save(contactMessage);
    }
}