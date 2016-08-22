package ru.vlad;

import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;

/**
 * Created by Vladislav on 23.08.2016.
 */
public class UserController {

    @RequestMapping("/user")
    public Principal user(Principal user) {
        return user;
    }
}
