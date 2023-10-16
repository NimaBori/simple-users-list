package com.nimacode.springbootbackend.controller;

import java.net.URI;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.nimacode.springbootbackend.model.User;
import com.nimacode.springbootbackend.repository.UserRepo;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("api/")
public class UserController {

    @Autowired // inject user repository
    private UserRepo userRepo;

    // get users
    @GetMapping("users")
    public List<User> getUsers() {
        return userRepo.findAll();
    }

    // get user
    @GetMapping("users/{id}")
    public Optional<User> retrieveUser(@PathVariable Long id) {
        Optional<User> user = userRepo.findById(id);

        if (user.isEmpty()) {
            throw new UserNotFoundException("id: " + id);
        }
        return user;
    }

    // delete user
    @DeleteMapping("users/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepo.deleteById(id);
    }

    // put request - update user
    @PutMapping("update/{id}")
    public User updateUser(@PathVariable("id") Long id,
            @RequestBody Map<String, String> body) {

        User current = userRepo.findById(id).get();
        current.setFirstName(body.get("firstName"));
        current.setLastName(body.get("lastName"));
        current.setEmail(body.get("email"));
        userRepo.save(current);
        return current;

    }

    // post request -> user
    @PostMapping("users")
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        User savedUser = userRepo.save(user);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedUser.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

}
