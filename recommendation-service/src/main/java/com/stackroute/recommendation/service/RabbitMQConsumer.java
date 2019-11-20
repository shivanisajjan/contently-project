package com.stackroute.recommendation.service;

import com.stackroute.recommendation.domain.*;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.List;


@Service
public class RabbitMQConsumer {

    @Autowired
    UserService userService;
    @Autowired
    User user;

    public RabbitMQConsumer() {

    }

    public RabbitMQConsumer(UserService userService, User user) {
        this.userService = userService;
        this.user = user;
    }

    @RabbitListener(queues = "registry_queue")
    public void recievedMessage(UserDto userDto) {

        user.setName(userDto.getUsername());
        user.setCost(0);
        user.setExp(0);
        userService.saveUser(this.user);

        if(userService.getGender(userDto.getGender()).isEmpty())
        {
            userService.createGender(userDto.getGender());
        }

        if(userDto.getGender().equals("M"))
            userService.setGender("male",userDto.getUsername());

        if(userDto.getGender().equals("F"))
            userService.setGender("female",userDto.getUsername());



        if(userService.getAgeGroup("a").isEmpty())
            userService.createAgeGroup("a");

        if(userService.getAgeGroup("k").isEmpty())
            userService.createAgeGroup("k");

        if(userService.getAgeGroup("t").isEmpty())
            userService.createAgeGroup("t");

        if(userService.getAgeGroup("ao").isEmpty())
            userService.createAgeGroup("o");

        userService.setAgeGroup("a",userDto.getUsername());
        if(userDto.getDob()!=null)
        {



            int dobYear=0;
            String temp[]=userDto.getDob().split("/");
            dobYear=Integer.parseInt(temp[temp.length-1]);
            int year = Calendar.getInstance().get(Calendar.YEAR);//agegroup -10-k  -20-t  -30-a 40-o
            int decideValue=year-dobYear;
            if(decideValue<15)
                userService.setAgeGroup("k",userDto.getUsername());
            else
            if(decideValue<25)
                userService.setAgeGroup("t",userDto.getUsername());
            else
            if(decideValue<45)
                userService.setAgeGroup("a",userDto.getUsername());
            else
                userService.setAgeGroup("o",userDto.getUsername());

        }



        if(userService.getRole(userDto.getRole()).isEmpty())
        {
            userService.createRole(userDto.getRole());
        }



        if(userDto.getRole().equals("designer"))
            userService.createDesigner(userDto.getUsername());
        else
            userService.createEditor(userDto.getUsername());

    }


    @RabbitListener(queues = "profile_queue")
    public void recievedMessage1(String message) {

        String temp[]=message.split("pop");
        String username= temp[1];
        String genres=temp[0];
        int experience=Integer.parseInt((temp[2]));
        double cost=Double.parseDouble((temp[3]));





        String temp2[]=genres.split("/");
        for(int i=0;i<temp2.length;i++) {
            if((userService.getGenre(temp2[i])).isEmpty())
            {
                userService.saveThisGenre(temp2[i]);
            }

        }

        for(int i=0;i<temp2.length;i++) {
            userService.saveGenre(temp2[i], username);



        }

        userService.saveExpCost(experience,cost,username);


    }

    @RabbitListener(queues = "publication_queue")
    public void recievedMessage2(PublicationsDto publicationsDto) {




        if(userService.getType(publicationsDto.getTypeName()).isEmpty())
        {
            userService.createType(publicationsDto.getTypeName());

        }


        userService.savePublication(publicationsDto.getTitle(),publicationsDto.getAuthorName(),publicationsDto.getId(),publicationsDto.getEditorName(),publicationsDto.getDesignerName(),publicationsDto.getNoOfPurchases(),publicationsDto.getPrice(),publicationsDto.getTypeName());

        for(int i=0;i<publicationsDto.getGenres().size();i++)
        {
            System.out.println("genre="+publicationsDto.getGenres().get(i));
            if((userService.getGenre(publicationsDto.getGenres().get(i)).isEmpty()))
            {
                userService.saveThisGenre(publicationsDto.getGenres().get(i));
            }
            userService.saveBookGenre(publicationsDto.getGenres().get(i),publicationsDto.getId());
        }


    }

    @RabbitListener(queues = "purchasing_queue")
    public void recievedMessage3(PurchasingDto purchasingDto) {

        userService.savePurchasing(purchasingDto.getBook_id(),purchasingDto.getUsername());

    }





}