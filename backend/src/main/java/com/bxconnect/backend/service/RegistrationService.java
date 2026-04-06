package com.bxconnect.backend.service;

import com.bxconnect.backend.entity.Activity;
import com.bxconnect.backend.entity.Registration;
import com.bxconnect.backend.entity.User;
import com.bxconnect.backend.repository.RegistrationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RegistrationService {

    private final RegistrationRepository registrationRepository;

    public RegistrationService(RegistrationRepository registrationRepository) {
        this.registrationRepository = registrationRepository;
    }

    public List<Registration> getAllRegistrations() {
        return registrationRepository.findAll();
    }

    public Optional<Registration> getRegistrationById(Long id) {
        return registrationRepository.findById(id);
    }

    public Registration saveRegistration(Registration registration) {
        return registrationRepository.save(registration);
    }

    public void deleteRegistration(Long id) {
        registrationRepository.deleteById(id);
    }

    public boolean existsByUserAndActivity(User user, Activity activity) {
        return registrationRepository.existsByUserAndActivity(user, activity);
    }
}
