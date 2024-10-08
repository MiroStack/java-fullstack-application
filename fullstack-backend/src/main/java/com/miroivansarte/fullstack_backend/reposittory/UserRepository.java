package com.miroivansarte.fullstack_backend.reposittory;

import com.miroivansarte.fullstack_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long>{


}
