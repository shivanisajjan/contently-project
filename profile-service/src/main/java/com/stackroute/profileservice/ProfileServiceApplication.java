package com.stackroute.profileservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@SpringBootApplication
@EnableEurekaClient
public class ProfileServiceApplication {

    public static void main(String[] args) {
//        Date date1 = new Date();
//        DateFormat dateFormat1 = new SimpleDateFormat("yyyy-mm-dd hh:mm:ss");
//        String endDate = dateFormat1.format(date1);
//       date1 = dateFormat1.parse(endDate);
//		System.out.println("date1:"+date1);


//		Date date = new Date();
//		DateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd hh:mm:ss");
//		String endDate1 = "2019-42-19 01:42:24";
//		date = dateFormat.parse(endDate1);
//		System.out.println("date:"+date);
//		long diff = date1.getTime() - date.getTime();
//		System.out.println("diff:"+diff);
//       long diffDays = diff / (24 * 60 * 60 * 1000);
//       System.out.println(diffDays);
//      long diffMinutes = diff / (60 * 1000) % 60;
//     System.out.println(diffMinutes);
//		long diffSeconds = diff / 1000 ;
//		System.out.println(diffSeconds);
        SpringApplication.run(ProfileServiceApplication.class, args);
    }

}
