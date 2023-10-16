package com.nimacode.springbootbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.nimacode.springbootbackend.model.User;
import com.nimacode.springbootbackend.repository.UserRepo;

@SpringBootApplication
public class SpringbootBackendApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(SpringbootBackendApplication.class, args);
	}

	@Autowired
	private UserRepo userRepo;

	@Override
	public void run(String... args) throws Exception {
		this.userRepo.save(new User("Nima", "Kiri", "kirirrir@gmail.com"));
		this.userRepo.save(new User("tom", "Kiri", "1234@gmail.com"));
		this.userRepo.save(new User("mate", "jafari", "4321@gmail.com"));
	}

}
