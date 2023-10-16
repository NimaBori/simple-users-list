package com.nimacode.springbootbackend.repository;

// import org.hibernate.mapping.List;
import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.nimacode.springbootbackend.model.User;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

}
