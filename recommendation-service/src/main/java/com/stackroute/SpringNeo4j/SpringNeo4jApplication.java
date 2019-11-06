package com.stackroute.SpringNeo4j;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.data.neo4j.repository.config.EnableNeo4jRepositories;

@SpringBootApplication
@EnableEurekaClient
public class SpringNeo4jApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringNeo4jApplication.class, args);
	}

}
