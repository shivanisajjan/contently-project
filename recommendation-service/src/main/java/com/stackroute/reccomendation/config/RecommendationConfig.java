package com.stackroute.reccomendation.config;

import com.stackroute.reccomendation.domain.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RecommendationConfig {

    @Bean
    public User getUser()
    {
        return new User();
    }
}
