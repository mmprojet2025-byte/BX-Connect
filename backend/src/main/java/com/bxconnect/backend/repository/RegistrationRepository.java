package com.bxconnect.backend.repository;

import com.bxconnect.backend.entity.Registration;
import com.bxconnect.backend.entity.User;
import com.bxconnect.backend.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    List<Registration> findByUser(User user);
    List<Registration> findByActivity(Activity activity);
}