package com.miroivansarte.fullstack_backend.controller;

import com.miroivansarte.fullstack_backend.model.User;
import com.miroivansarte.fullstack_backend.reposittory.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173/")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @PostMapping("/user")
    User newUser(@RequestBody User newUser){
        return userRepository.save(newUser);
    }

    @GetMapping("/users")
    List<User> getAllUsers(){
        return userRepository.findAll();
    }
    @GetMapping("user/{id}")
    User getUserById(@PathVariable Long id){
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User with id " + id + " not found"));

    }
   @PutMapping("user/{id}")
    User updateUser(@PathVariable Long id, @RequestBody User updatedUser){
        return userRepository.findById(id)
                .map(
                        user -> {
                            user.setName(updatedUser.getName());
                            user.setEmail(updatedUser.getEmail());
                            user.setUsername(updatedUser.getUsername());
                            return userRepository.save(user);
                        }
                ).orElseThrow(() -> new RuntimeException("User with id " + id + " not found"));
   }

   @DeleteMapping("/user/{id}")
    String deleteUser(@PathVariable Long id){
        if(!userRepository.existsById(id)){
            throw new RuntimeException("User with id " + id + " not found");
        }
        userRepository.deleteById(id);
        return "User with id " + id + " deleted";
   }
}
